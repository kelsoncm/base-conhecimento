---
title: "Criar e configurar um bot no Telegram (BotFather e Bot API)"
category: "Desenvolvimento"
service: "Telegram Bot API"
audience: ["Desenvolvedores"]
tags: ["telegram", "bot", "botfather", "bot-api", "token", "webhook", "polling", "chat-id"]
reliability: "prático"
last_review: "2026-10-28"
source: "Documentação oficial da Telegram Bot API e criação de um bot pessoal"
---

## Sintoma

Você precisa de um bot no Telegram para receber ou enviar mensagens a partir de um sistema próprio (notificações, alertas, integração com um assistente) e quer saber como criá-lo, configurá-lo e testá-lo antes de escrever qualquer código.

## Contexto

Todo bot do Telegram é criado e administrado pelo **@BotFather**, o bot oficial para isso. Ao criar um bot você recebe um **token** no formato `<id_do_bot>:<segredo>`. Com ele, qualquer programa pode agir como o bot por meio da **Bot API**, uma API HTTP em `https://api.telegram.org/bot<token>/<método>`.

Regras importantes:

- Um bot **não pode iniciar conversa** com um usuário. A pessoa precisa mandar uma mensagem ao bot primeiro (ou tocar em **Iniciar**, que envia `/start`).
- O bot recebe as mensagens de **um só jeito por vez**: *long polling* (`getUpdates`) **ou** *webhook* (`setWebhook`).
- Quem tem o token controla o bot. Ele é uma credencial e deve ser tratado como senha.

## Procedimento

### 1. Criar o bot no BotFather

1. No Telegram, abra uma conversa com **@BotFather** (confira o selo azul de verificado).
2. Envie `/newbot`.
3. Informe o **nome de exibição** (ex.: `Assistente do Kelson`). Ele pode ser alterado depois.
4. Informe o **username**: precisa ser único e **terminar em `bot`** (ex.: `assistente_kelson_bot`). Ele não pode ser alterado depois.
5. O BotFather responde com o link `t.me/<username>` e o **token**. Guarde o token em local seguro (gerenciador de senhas ou arquivo `.env` fora do controle de versão).

### 2. Ajustar o perfil e o comportamento

Todos os comandos abaixo são enviados ao @BotFather, que pergunta em seguida a qual bot aplicar. `/mybots` reúne as mesmas opções em menus.

| Comando | Para quê |
|---|---|
| `/setdescription` | Texto exibido na tela vazia, antes da primeira conversa. |
| `/setabouttext` | Texto curto do perfil do bot. |
| `/setuserpic` | Foto do bot. |
| `/setcommands` | Lista de comandos sugeridos ao digitar `/` (uma linha por comando: `comando - descrição`). |
| `/setjoingroups` | Permite ou impede que o bot seja adicionado a grupos. Para bot de uso pessoal, **desative**. |
| `/setprivacy` | Modo de privacidade em grupos. Ativado (padrão): o bot só recebe comandos, menções e respostas às mensagens dele. Desativado: recebe todas as mensagens do grupo. |
| `/revoke` | Invalida o token atual e gera outro. Use se o token vazar. |
| `/deletebot` | Apaga o bot. É irreversível e libera o username. |

### 3. Testar o token pela Bot API

Deixe o token numa variável de ambiente, para não precisar escrevê-lo em cada comando.

PowerShell:

```powershell
$env:TELEGRAM_BOT_TOKEN = Read-Host "Token"
$api = "https://api.telegram.org/bot$env:TELEGRAM_BOT_TOKEN"
Invoke-RestMethod "$api/getMe"
```

Bash:

```bash
read -rs TELEGRAM_BOT_TOKEN && export TELEGRAM_BOT_TOKEN
api="https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN"
curl -s "$api/getMe"
```

A resposta `{"ok":true,"result":{"id":...,"is_bot":true,"username":"..."}}` confirma que o token é válido. Um token errado retorna `401 Unauthorized`.

### 4. Descobrir o chat ID

Para enviar mensagens o bot precisa do **chat ID** do destinatário.

1. Mande qualquer mensagem ao bot pelo Telegram.
2. Leia as atualizações pendentes:

   ```bash
   curl -s "$api/getUpdates"
   ```

3. Procure `message.chat.id` na resposta.

Valores de referência:

- conversa privada: número positivo, igual ao ID do usuário;
- grupo: número negativo;
- supergrupo e canal: número negativo que começa com `-100`.

Alternativa para descobrir o próprio ID de usuário: mandar uma mensagem ao **@userinfobot**.

As atualizações ficam disponíveis por até 24 horas e deixam de ser retornadas depois de confirmadas (chamando `getUpdates` com `offset` maior que o último `update_id`).

### 5. Enviar uma mensagem de teste

PowerShell:

```powershell
Invoke-RestMethod "$api/sendMessage" -Method Post -Body @{ chat_id = "<chat_id>"; text = "Olá do bot" }
```

Bash:

```bash
curl -s "$api/sendMessage" -d chat_id=<chat_id> -d text="Olá do bot"
```

Se retornar `403 Forbidden: bot can't initiate conversation with a user`, a pessoa ainda não falou com o bot (passo 4.1).

### 6. Escolher polling ou webhook

| | Long polling (`getUpdates`) | Webhook (`setWebhook`) |
|---|---|---|
| Como funciona | O programa pergunta ao Telegram se há mensagens novas. | O Telegram faz POST numa URL HTTPS sua a cada mensagem. |
| Exige | Só acesso de saída à internet. | URL pública com HTTPS válido. |
| Indicado para | Uso pessoal, máquina local, atrás de NAT ou firewall. | Serviço hospedado, alto volume. |

Conflitos comuns (HTTP 409):

- `Conflict: can't use getUpdates method while webhook is active`: há um webhook configurado. Remova com `curl -s "$api/deleteWebhook"` antes de usar polling.
- `Conflict: terminated by other getUpdates request`: **dois programas** fazem polling com o mesmo token. Só um pode consumir as atualizações; pare o outro ou crie um bot separado para cada programa.

Para ver se há webhook ativo: `curl -s "$api/getWebhookInfo"` (o campo `url` vazio indica que não há).

## Quando escalar

- O BotFather não responde ou recusa a criação: aguarde, pois há limite de criação de bots por conta, e consulte o suporte em `@BotSupport`.
- O token foi exposto publicamente: use `/revoke` imediatamente e atualize todos os programas que usam o bot.

## Equipe responsável

Uso pessoal; não há equipe responsável.

## Links oficiais

- [Bots: introdução para desenvolvedores](https://core.telegram.org/bots)
- [Funcionalidades dos bots e BotFather](https://core.telegram.org/bots/features#botfather)
- [Referência da Bot API](https://core.telegram.org/bots/api)

## Nível de confiabilidade

**Prático**: procedimento seguido na criação de um bot pessoal, com conferência na documentação oficial da Bot API.

## Notas adicionais

!!! warning "Segurança do token"
    - Não coloque o token em código, commits, issues, prints ou chats. Use variável de ambiente ou arquivo `.env` ignorado pelo Git.
    - O token aparece na URL das chamadas da Bot API. Cuidado com logs de proxy, histórico do shell e ferramentas que registram URLs.
    - Mensagens recebidas pelo bot vêm de qualquer pessoa que o encontre. Filtre por chat ID ou mantenha uma lista de usuários permitidos antes de executar qualquer ação.

Uso prático: [plugin Telegram do Claude Code no Windows](../claude-code/plugin-telegram-windows.md), que usa um bot criado assim para conversar com o Claude Code.
