---
title: "Usuários com Nome Completo Vazio no Moodle Aberto (OAuth 2)"
category: "AVA"
service: "AVA"
audience: ["TIC", "Administradores Moodle", "Suporte"]
tags: ["moodle", "oauth2", "auth_oauth2", "auth_suap", "perfil", "moodle-aberto", "lgpd"]
reliability: "prático"
last_review: "2026-10-19"
source: "Diagnóstico de contas criadas via provedores OAuth 2 externos com campos de nome e sobrenome em branco no Moodle Aberto"
---

## Sintoma

Na listagem de usuários ou em relatórios personalizados do Moodle Aberto (instância com login social/externo via **OAuth 2** nativo — `auth_oauth2`, como Google e Microsoft), são identificadas contas ativas cujo **Nome completo** (`firstname` e `lastname`) aparece em branco, enquanto a **Identificação de usuário** (`username`) e o **Endereço de e-mail** (`email`) estão preenchidos com o e-mail externo do usuário (por exemplo, `usuario@exemplo.com` ou `123456@alunos.instituicao.edu.br`).

## Contexto

O problema não ocorre no plugin institucional `auth_suap`, mas na combinação de três fatores do fluxo do plugin nativo **`auth_oauth2`** do Moodle com provedores externos (Google, Microsoft Entra ID / Contas Microsoft):

### 1. Ausência de atributos na origem ou divergência no mapeamento OAuth 2

Durante o login OAuth 2 (`\core\oauth2\client::map_userinfo_to_fields()`), o Moodle consulta o endpoint `userinfo` do provedor externo para mapear os campos de nome e sobrenome:

- **Contas pessoais ou institucionais sem nome desmembrado**: contas pessoais (Outlook, Hotmail, Gmail) ou contas institucionais/setoriais (ex.: `secretaria.pos@instituicao.edu.br`, `<matricula>@alunos.instituicao.edu.br`) podem não possuir os atributos `given_name` e `family_name` preenchidos separadamente no diretório de origem, informando apenas o e-mail ou `displayName`/`name`.
- **Diferença entre o template Microsoft do Moodle e o endpoint OpenID Connect (OIDC)**: no serviço padrão **Microsoft** do Moodle (`\core\oauth2\service\microsoft`), o mapeamento inicial cria as associações `givenname` $\rightarrow$ `firstname` e `familyname` $\rightarrow$ `lastname` (sem *underscore*). Porém, o endpoint OIDC v2.0 da Microsoft (`https://graph.microsoft.com/oidc/userinfo`) retorna os atributos padrão OIDC `given_name` e `family_name` (com *underscore*). Caso o provedor Microsoft utilize o endpoint OIDC sem o mapeamento de `given_name`/`family_name`, o nome não é importado na criação da conta.

### 2. Criação imediata do usuário pelo `auth_oauth2`

Em `\auth_oauth2\auth::complete_login()`, o Moodle valida apenas se `username` e `email` foram retornados pelo provedor:

```php
if (empty($userinfo['username']) || empty($userinfo['email'])) {
    // Falha o login apenas quando username ou email estão vazios.
}
```

Mesmo quando `firstname` e `lastname` vêm vazios, o método `\auth_oauth2\api::create_new_confirmed_account()` insere imediatamente o registro na tabela `mdl_user` com `firstname = ''` e `lastname = ''`.

### 3. Abandono ou bloqueio na tela de conclusão de perfil (`/user/edit.php`)

Logo após autenticar a sessão, `require_login()` invoca `user_not_fully_set_up($USER)`, que verifica:

```php
if (empty($user->firstname) or empty($user->lastname) or empty($user->email) or over_bounce_threshold($user)) {
    return true;
}
```

Como `firstname` ou `lastname` está vazio, o Moodle redireciona obrigatoriamente o usuário para a tela de edição de perfil (`/user/edit.php`). O registro permanece com nome em branco no banco quando:

1. **O usuário abandona a tela `/user/edit.php` sem salvar** (a conta já foi gravada no banco durante o callback OAuth 2); ou
2. **Os campos do formulário estão bloqueados para edição**, impedindo o usuário de concluir o cadastro:
   - Se `field_lock_firstname` ou `field_lock_lastname` estiverem configurados como **Bloqueado** (`locked`) no plugin `auth_oauth2`, o formulário congela (`hardFreeze`) os campos em branco;
   - Em versões do `auth_suap` anteriores à `v4.5.083`, o bloqueio automático de campos customizados era replicado para todos os plugins de autenticação instalados (incluindo `auth_oauth2`), podendo travar campos do formulário de perfil no Moodle Aberto (ver [Bloqueio e Edição de CPF e Campos de Perfil no Moodle](edicao-bloqueio-cpf-campos-perfil-moodle.md)).

## Procedimento

### 1. Configurar o bloqueio de Nome e Sobrenome no `auth_oauth2` como "Desbloqueado se vazio"

1. Acesse **Administração do site > Plugins > Autenticação > OAuth 2** (`/admin/settings.php?section=authsettingoauth2`).
2. Na seção **Mapeamento de dados**, localize os campos **Nome** (`firstname`) e **Sobrenome** (`lastname`).
3. Configure:
   - **Bloquear valor** (`field_lock_firstname` e `field_lock_lastname`): **Desbloqueado se vazio** (`unlockedifempty`).
   - **Atualizar dados locais** (`field_updatelocal_firstname` e `field_updatelocal_lastname`): **Na criação** (`oncreate`) ou **Em cada acesso** (`onlogin`) combinado com `unlockedifempty`.

Com **Desbloqueado se vazio** (`unlockedifempty`):

- Se o provedor OAuth 2 enviar Nome e Sobrenome preenchidos, os valores são gravados e bloqueados contra alteração indevida.
- Se o provedor não enviar Nome ou Sobrenome, os campos ficam abertos em `/user/edit.php` para que o próprio usuário preencha no primeiro acesso.
- Nos logins seguintes, o Moodle não sobrescreve com string vazia o nome que o usuário preencheu localmente.

### 2. Revisar o mapeamento de campos nos Serviços OAuth 2 (Microsoft e Google)

1. Acesse **Administração do site > Servidor > Serviços OAuth 2** (`/admin/tool/oauth2/issuers.php`).
2. No provedor **Microsoft** (e demais provedores OIDC), clique no ícone **Mapeamento de campos do usuário** (`user_field_mapping`).
3. Certifique-se de que ambos os formatos de atributos estejam mapeados:
   - `given_name` $\rightarrow$ `firstname` e `givenname` $\rightarrow$ `firstname`
   - `family_name` $\rightarrow$ `lastname` e `familyname` $\rightarrow$ `lastname`
   - `name` ou `displayName` $\rightarrow$ `alternatename`

### 3. Manter o `auth_suap` atualizado (`>= v4.5.083`)

Garanta que o plugin `auth_suap` instalado no ambiente esteja na versão `4.5.083` (`20261009083`) ou superior, na qual a trava de campos customizados (`field_lock_profile_field_* = locked`) é aplicada exclusivamente ao `auth_suap` e limpa de outros métodos como `auth_oauth2`.

### 4. Regularização das contas já existentes com nome vazio

- **No próximo login do usuário**: com `firstname` e `lastname` configurados como **Desbloqueado se vazio** (`unlockedifempty`), assim que o usuário autenticar novamente no Moodle Aberto, a verificação nativa `user_not_fully_set_up()` forçará o redirecionamento para `/user/edit.php`, exigindo o preenchimento de Nome e Sobrenome antes da navegação em qualquer curso.
- **Contas inativas (abandono no primeiro acesso)**: contas antigas sem nenhuma inscrição em cursos correspondem a visitantes que desistiram na tela inicial de complemento de perfil e não exigem ação manual.
- **Regularização administrativa pontual**: caso um aluno ativo em curso precise de emissão imediata de certificado antes de realizar novo login, o administrador pode preencher Nome e Sobrenome diretamente em **Administração do site > Usuários > Contas > Gerenciar usuários**.

## Quando escalar

- Quando um provedor OAuth 2 institucional externo alterar o formato do payload `userinfo` e exigir ajustes nos endpoints cadastrados em **Serviços OAuth 2**.
- Quando houver erro de redirecionamento ou loop em `/user/edit.php` provocado por campos customizados de perfil marcados como obrigatórios (`required = 1`) e simultaneamente bloqueados (`locked = 1`).

## Equipe responsável

Equipe de TIC / Administração do AVA (Moodle).

## Links oficiais

- [Documentação Moodle — OAuth 2 authentication](https://docs.moodle.org/en/OAuth_2_authentication)
- [Documentação Moodle — OAuth 2 Microsoft service](https://docs.moodle.org/en/OAuth_2_Microsoft_service)
- [Bloqueio e Edição de CPF e Campos de Perfil no Moodle](edicao-bloqueio-cpf-campos-perfil-moodle.md)
- [SSO do Moodle com o SUAP (plugin auth_suap)](sso-moodle-auth-suap.md)

## Nível de confiabilidade

Prático.

## Notas adicionais

- Alunos ou servidores institucionais que possuam conta `@academico` ou `@escolar` e clicarem nos botões de login social (Google/Microsoft) no Moodle Aberto terão a conta vinculada ao `auth_oauth2` em vez do `auth_suap`, a menos que utilizem o botão de login único do SUAP.
- Em conformidade com a LGPD, relatórios exportados para auditoria de cadastros incompletos não devem ser versionados nem compartilhados publicamente contendo endereços de e-mail reais de usuários.
