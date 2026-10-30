---
title: "Usar a skill moodle-plugin no Claude Code"
category: "Desenvolvimento"
service: "Claude Code / Gemini CLI / plugins Moodle"
audience: ["Desenvolvedores"]
tags: ["claude-code", "skill", "moodle", "plugin", "moodle-marketplace", "moodle-plugin-ci", "act"]
reliability: "prático"
last_review: "2026-10-30"
source: "Plugins da EduPlay Moodle Suite e revisão do mod_imagemap no Moodle Marketplace (2026)"
---

## Sintoma

Cada plugin Moodle novo repetia os mesmos problemas:
- o revisor do Moodle Marketplace devolvia o plugin por pontos já conhecidos (`PARAM_RAW`, `print_error`, falta de boilerplate, AJAX sem External Services, backup/restore incompleto);
- o CI falhava por avisos que podiam ter sido evitados;
- a documentação e a release eram montadas do zero.

## Contexto

A skill `moodle-plugin` reúne, num só lugar, o que funcionou nos plugins da EduPlay Moodle Suite e o que a revisão do `mod_imagemap` reprovou. Uma skill é um arquivo `SKILL.md` com instruções que o agente carrega sozinho quando a descrição combina com a tarefa. Ela vale no Claude Code e, pelo mesmo link, no Gemini CLI.

Ela fica em `~/projetos/PESSOAL/kelsoncm/workspace/skills/moodle-plugin/`:

| Arquivo | Conteúdo |
|---|---|
| `SKILL.md` | Quando usar, padrão do código, estrutura do repositório, validação local, documentação, release e Marketplace |
| `references/review-checklist.md` | Checklist do que o revisor do Marketplace aponta, com a correção de cada item |
| `references/act.md` | Validação com `act` (inclusive no Windows), eslint e grunt no container do job, conversão de JS legado, Moodle temporário para testes no navegador e capturas |
| `references/release-marketplace.md` | Release por rascunho, verificação da release publicada, envio manual ou automático ao Marketplace, página do plugin e ressubmissão |

## Procedimento

### 1. Instalar (uma vez por máquina)

A skill é linkada nas pastas de skills do Claude e do Gemini. Ela não é copiada, então editar o repositório atualiza os dois.

Linux e macOS:

```bash
ln -s ~/projetos/PESSOAL/kelsoncm/workspace/skills/moodle-plugin ~/.claude/skills/moodle-plugin
ln -s ~/projetos/PESSOAL/kelsoncm/workspace/skills/moodle-plugin ~/.gemini/config/skills/moodle-plugin
```

Windows (PowerShell 7.6+ com o modo de desenvolvedor ativo):

```powershell
$src = "$HOME/projetos/PESSOAL/kelsoncm/workspace/skills/moodle-plugin"
New-Item -ItemType SymbolicLink -Path "$HOME/.claude/skills/moodle-plugin" -Target $src
New-Item -ItemType SymbolicLink -Path "$HOME/.gemini/config/skills/moodle-plugin" -Target $src
```

Confira numa sessão nova do Claude Code: a skill aparece na lista de skills disponíveis como `moodle-plugin`.

### 2. Usar

Não é preciso chamar a skill: ela é carregada quando a tarefa envolve um plugin Moodle. Para garantir, cite-a no pedido ou use `/moodle-plugin`.

Exemplos de pedidos:

- "Crie um bloco Moodle `block_x` que mostre ..." → o plugin nasce com:
  - versões 4.5 e 5.3 LTS;
  - só `lang/en`;
  - boilerplate GPL;
  - templates e AMD ES6;
  - workflows de CI, docs e release.
- "Recebi este e-mail do revisor do Marketplace (MMR-123)..." → cada ponto vira uma issue, a correção segue o checklist e a página do plugin é montada com descrição em HTML e link da documentação.
- "Resolva as issues do plugin X e prepare a release" → PRs com validação local por `act`, release por rascunho e envio da versão ao Marketplace.
- "Documente o plugin" → Sphinx em `docs/en` e `docs/pt_BR`, com capturas reais feitas num Moodle temporário.

### 3. O que esperar do agente

- **Antes do push:** valida com `act` (codechecker e PHPDoc sem avisos, grunt, PHPUnit, Sphinx `-W`) e avisa o que o `act` não reproduz.
- **Mudanças de interface:** testa num Moodle temporário em Docker antes de commitar.
- **Ações externas:** pede confirmação antes de mergear PRs, publicar a release, publicar a página do Marketplace ou falar com o revisor no ticket.
- **Credenciais:** nunca manuseia tokens. O token do Marketplace para o envio automático é gerado e gravado por você (`gh secret set MOODLE_MARKETPLACE_TOKEN`).

### 4. Manter a skill atualizada

Quando uma revisão, um CI ou um teste revelar algo novo, peça para registrar na skill. Os pontos de revisão vão para `references/review-checklist.md`, e os do fluxo, para a referência correspondente. Como o diretório é linkado, a mudança vale na próxima sessão.

## Quando escalar

- O revisor pede algo que contradiz a skill: siga o revisor e atualize a skill.
- A skill não carrega: confira se o link existe (`ls -l ~/.claude/skills`) e se o `SKILL.md` tem o cabeçalho com `name` e `description`.

## Equipe responsável

Kelson da Costa Medeiros (uso pessoal e nos projetos `eduplay-moodle-suite` e `moodle-by-kelsoncm`).

## Links oficiais

- [Agent Skills no Claude Code](https://code.claude.com/docs/en/skills)
- [Checklist de contribuição de plugins Moodle](https://moodledev.io/general/community/plugincontribution/checklist)
- [moodle-plugin-ci](https://moodlehq.github.io/moodle-plugin-ci/)
- [Moodle Marketplace](https://marketplace.moodle.com/)
- [Exemplo de plugin no padrão: moodle-local_eduplay](https://github.com/eduplay-moodle-suite/moodle-local_eduplay)

## Nível de confiabilidade

**Prático:** padrão usado nos quatro plugins da EduPlay Moodle Suite, aprovados no Marketplace, e na correção do `mod_imagemap` (versão 1.3.0, ressubmetida à revisão).

## Notas adicionais

- A skill traz convenções pessoais: commits em pt-BR no formato `tipo(escopo): [TAG] ...`, campos de tempo `Estimated (h)` e `Spent (h)` e caminhos das pastas de projeto. Elas dependem das regras globais (`global_rules.md`).
- Junto com ela, use a skill `github-actions`, que define as versões das actions dos workflows.
