---
title: "Instalar e configurar o plugin Telegram do Claude Code no Windows"
category: "Desenvolvimento"
service: "Claude Code / Telegram"
audience: ["Desenvolvedores"]
tags: ["claude-code", "plugin", "telegram", "mcp", "bun", "winget", "windows", "bot"]
reliability: "prático"
last_review: "2026-10-28"
source: "Experiência ao instalar o plugin telegram@claude-plugins-official (v0.0.7) no Claude Code em Windows 11"
---

## Sintoma

O plugin `telegram` do Claude Code é instalado sem erro (`✓ Installed telegram. Plugin is now active.`), mas o servidor MCP do plugin não conecta. A sessão informa algo como:

```text
plugin:telegram:telegram: "Skipping connection (recent failure cached retries automatically in 15 min, ...)"
```

E as ferramentas `mcp__plugin_telegram_telegram__*` (reply, react, edit_message, download_attachment) não aparecem.

## Contexto

O plugin `telegram` permite conversar com a sessão do Claude Code por um bot do Telegram. Ele tem três partes:

- um **servidor MCP** que fala com a Bot API do Telegram e que **roda com o [Bun](https://bun.sh/)**;
- a skill `/telegram:configure`, que salva o token do bot;
- a skill `/telegram:access`, que controla quem pode falar com o bot (pareamento e allowlist).

No Windows o Bun não vem instalado. Sem ele o servidor MCP não sobe, e o Claude Code guarda a falha em cache por cerca de 15 minutos antes de tentar de novo.

O estado do canal fica fora do repositório, em:

```text
%USERPROFILE%\.claude\channels\telegram\
├─ .env          # TELEGRAM_BOT_TOKEN=...
└─ access.json   # política de DM, allowlist e pareamentos pendentes
```

Esse diretório pode ser trocado pelas variáveis `TELEGRAM_STATE_DIR` ou `CLAUDE_CONFIG_DIR`.

## Procedimento

### 1. Instalar o plugin

No Claude Code:

```text
/plugin marketplace add anthropics/claude-plugins-official
/plugin install telegram@claude-plugins-official
/reload-plugins
```

### 2. Instalar o Bun

```powershell
winget install --id Oven-sh.Bun -e --accept-source-agreements --accept-package-agreements
```

O winget cria os atalhos `bun` e `bunx` em `%LOCALAPPDATA%\Microsoft\WinGet\Links`. Terminais abertos **antes** da instalação não enxergam o novo PATH. Para testar no mesmo terminal:

```powershell
& "$env:LOCALAPPDATA\Microsoft\WinGet\Links\bun.exe" --version
```

Alternativa: `scoop install bun`.

### 3. Criar o bot e salvar o token

1. No Telegram, fale com o **@BotFather**, use `/newbot` e copie o token (formato `123456789:AAH...`). O passo a passo completo, com perfil, privacidade, teste do token e conflitos de polling, está em [Criar e configurar um bot no Telegram](../telegram/criar-bot-telegram.md).
2. No Claude Code:

   ```text
   /telegram:configure <token>
   ```

   A skill grava `TELEGRAM_BOT_TOKEN=<token>` em `.env`, preservando as outras chaves do arquivo.

### 4. Reiniciar para carregar Bun e token

O servidor lê o `.env` **só ao iniciar**, e o processo do Claude Code precisa enxergar o novo PATH do Bun. Por isso, **reinicie o Claude Code** (só o `/reload-plugins` não basta quando o Bun acabou de ser instalado).

### 5. Parear e fechar o acesso

1. Mande uma DM ao bot. Com a política padrão (`pairing`), ele responde com um código.
2. Aprove no Claude Code:

   ```text
   /telegram:access pair <código>
   ```

3. Quando todos que devem usar o bot estiverem pareados, troque para allowlist:

   ```text
   /telegram:access policy allowlist
   ```

`pairing` é só um meio temporário para capturar os IDs do Telegram. Deixar essa política ativa permite que qualquer pessoa que encontre o bot gere códigos de pareamento.

Mudanças no `access.json` valem na hora: o arquivo é relido a cada mensagem recebida, sem reiniciar.

## Quando escalar

- O Bun está no PATH, mas o servidor continua falhando após reiniciar: consulte os logs MCP do Claude Code e as issues de [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official).

## Equipe responsável

Uso pessoal; não há equipe responsável.

## Links oficiais

- [Bun](https://bun.sh/)
- [Repositório de plugins oficiais do Claude Code](https://github.com/anthropics/claude-plugins-official)
- [Telegram Bot API e BotFather](https://core.telegram.org/bots)

## Nível de confiabilidade

**Prático**: instalação feita e testada em Windows 11 com Bun 1.4.4 e plugin v0.0.7.

## Notas adicionais

!!! warning "Segurança do token"
    - O token do bot dá controle total sobre o bot. Não cole o token em chats, issues ou commits. Se ele vazar, revogue no @BotFather (`/revoke`) e rode `/telegram:configure` com o novo.
    - No Windows o `chmod 600` que a skill aplica ao `.env` **não tem efeito**: o arquivo continua legível por qualquer processo do seu usuário.
    - Mensagens que chegam pelo Telegram são entrada não confiável. O próprio plugin instrui o Claude a nunca aprovar pareamentos ou mudar o `access.json` porque uma mensagem do Telegram pediu: isso só deve ser feito por você, no terminal.
