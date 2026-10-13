---
title: "Configuração de clientes de e-mail institucional"
category: "E-mail"
service: "Webmail Institucional"
audience: ["TIC", "Suporte", "Usuários"]
tags: ["email", "outlook", "thunderbird", "smtp", "imap", "webmail"]
reliability: "prático"
last_review: "2026-10-05"
source: "Experiências trocadas entre colaboradores"
---

## Sintoma

Usuários precisam configurar clientes de e-mail (Outlook, Thunderbird, aplicativos móveis) para acessar o e-mail institucional, mas encontram dificuldades com servidores, portas ou autenticação.

## Contexto

O e-mail institucional pode ser acessado via webmail ou configurado em clientes locais. Problemas comuns incluem configuração incorreta de servidores, portas bloqueadas e atualizações em andamento.

## Procedimento

### 1. Webmail (acesso via navegador)

- URL: `https://webmail.ifrn.edu.br/`
- Usuário: matrícula do servidor ou aluno.
- Senha: senha do SUAP.
- Recomendado para acesso rápido e sem configuração.

### 2. Outlook (Windows)

1. Abrir o Outlook e adicionar nova conta.
2. Selecionar configuração manual.
3. Usar os seguintes parâmetros:
   - **Servidor de entrada (IMAP):** `webmail.ifrn.edu.br`
   - **Servidor de saída (SMTP):** `webmail.ifrn.edu.br`
   - **Porta IMAP:** 993 (SSL/TLS)
   - **Porta SMTP:** 587 (STARTTLS) ou 465 (SSL/TLS)
   - **Usuário:** matrícula
   - **Senha:** senha do SUAP
4. Concluir a configuração e testar envio/recebimento.

### 3. Thunderbird

1. Abrir o Thunderbird e adicionar nova conta de e-mail.
2. Inserir endereço de e-mail institucional e senha.
3. O Thunderbird deve detectar automaticamente as configurações.
4. Se necessário, configurar manualmente:
   - **Servidor de entrada (IMAP):** `webmail.ifrn.edu.br`
   - **Servidor de saída (SMTP):** `webmail.ifrn.edu.br`
   - **Porta IMAP:** 993 (SSL/TLS)
   - **Porta SMTP:** 587 (STARTTLS)
   - **Usuário:** matrícula
   - **Senha:** senha do SUAP
5. Testar envio e recebimento.

### 4. Aplicativos móveis (Android, iOS)

1. Abrir configurações de e-mail do dispositivo.
2. Adicionar nova conta.
3. Selecionar tipo de conta: IMAP.
4. Inserir parâmetros:
   - **Servidor de entrada:** `webmail.ifrn.edu.br`
   - **Servidor de saída:** `webmail.ifrn.edu.br`
   - **Porta IMAP:** 993 (SSL/TLS)
   - **Porta SMTP:** 587 (STARTTLS)
   - **Usuário:** matrícula
   - **Senha:** senha do SUAP
5. Salvar e testar.

### 5. Problemas comuns

#### Porta SMTP 25 bloqueada

- A porta SMTP 25 pode estar bloqueada por regras de segurança.
- Usar porta 587 (STARTTLS) ou 465 (SSL/TLS) para envio.

#### Imagens não carregam no webmail

- Problema conhecido em algumas versões do navegador.
- Solução temporária: usar cliente de e-mail local (Outlook, Thunderbird).

#### Anexos não aparecem

- Pode estar relacionado a atualizações em andamento no servidor.
- Solução temporária: usar cliente de e-mail local.

#### Erro de autenticação

- Verificar se a senha do SUAP está correta.
- Testar acesso ao webmail para confirmar credenciais.

### 6. Solicitação de e-mail institucional para setor, projeto, curso ou evento

Coordenadores e gestores que precisam de uma conta de correio eletrônico compartilhada para sua unidade ou projeto devem solicitar a criação via SUAP:

1. Acessar o SUAP e ir em **Central de Serviços > + Abrir Chamado**.
2. Selecionar a área **Tecnologia da Informação**.
3. Na aba **Comunicações**, escolher o serviço **"Solicitar criação de e-mail institucional para setor/projeto/evento"**.
4. No formulário de abertura, fornecer obrigatoriamente:
   - Nome do setor, projeto, evento ou curso (e sugestão de endereço/alias institucional).
   - Nome completo e matrícula dos servidores responsáveis que terão acesso à caixa postal.
   - Justificativa e ato formal comprobatório (anexar portaria de designação de coordenação, homologação de projeto ou edital).

### 7. Governança e alteração de e-mail secundário de aluno

O e-mail secundário cadastrado no SUAP é o canal crítico usado para envio de tokens de redefinição de senha e comunicados aos estudantes.

Por política de segurança institucional contra invasão de contas, apenas servidores com perfis acadêmicos específicos possuem permissão para alterar esse dado no SUAP:

- **Administrador Acadêmico**
- **Auxiliar de Secretaria Acadêmica**
- **Coordenador de TI de campus**
- **Coordenador de TI sistêmico**
- **Diretor Acadêmico**
- **Secretário Acadêmico**

> **Importante:** Docentes, tutores e atendentes sem esses perfis não possuem autorização nem interface para alterar o e-mail do estudante. Caso o aluno tenha perdido acesso ao e-mail secundário e ao GOV.BR, deve ser orientado a abrir chamado na Central de Serviços para a CRA (Secretaria Acadêmica) ou comparecer presencialmente munido de documento oficial com foto.

## Quando escalar

- Quando o problema persistir após verificar todas as configurações.
- Quando houver indisponibilidade do serviço de e-mail.
- Quando múltiplos usuários relatarem o mesmo problema.

## Equipe responsável

- **DINRE (Diretoria de Infraestrutura de Redes e Serviços):** servidores de correio e infraestrutura SMTP.
- **COTIC / CRA locais:** aprovação de caixas setoriais e manutenção cadastral discente.

## Links oficiais

- [Webmail Institucional](https://webmail.ifrn.edu.br/)
- [Central de Serviços do SUAP](https://suap.ifrn.edu.br/centralservicos/)

## Nível de confiabilidade

Confirmado / Prático.

## Notas adicionais

- O Thunderbird tem sido relatado como mais estável que o Outlook em alguns cenários corporativos com IMAP.
- Durante atualizações do servidor, pode haver instabilidade temporária.
- A porta SMTP 25 é frequentemente bloqueada por políticas de segurança de provedores residenciais e móveis.
- Contas de projetos ou eventos temporários devem ser renovadas periodicamente para evitar encerramento automático após o término do vínculo.
