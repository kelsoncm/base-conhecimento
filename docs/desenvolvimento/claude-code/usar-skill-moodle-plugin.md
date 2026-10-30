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

A skill `moodle-plugin` reúne, num só lugar, o que funcionou nos plugins da EduPlay Moodle Suite e o que a revisão do `mod_imagemap` reprovou. Uma skill é um arquivo `SKILL.md` com instruções que o agente carrega sozinho quando a descrição combina com a tarefa.

Ela é pública, em inglês e sem convenções pessoais: [moodle-by-kelsoncm/moodle-plugin-skill](https://github.com/moodle-by-kelsoncm/moodle-plugin-skill). Vem empacotada como plugin do Claude Code, e a pasta da skill também funciona em outros agentes, como o Gemini CLI.

| Arquivo (em `plugins/moodle-plugin/skills/moodle-plugin/`) | Conteúdo |
|---|---|
| `SKILL.md` | Quando usar, padrão do código, estrutura do repositório, validação local, documentação, release e Marketplace |
| `references/review-checklist.md` | Checklist do que o revisor do Marketplace aponta, com a correção de cada item |
| `references/act.md` | Validação com `act` (inclusive no Windows), eslint e grunt no container do job, conversão de JS legado, Moodle temporário para testes no navegador e capturas |
| `references/release-marketplace.md` | Release por rascunho, verificação da release publicada, envio manual ou automático ao Marketplace, página do plugin e ressubmissão |

As minhas convenções (issues, commits em pt-BR, campos de tempo, pastas das famílias de plugins e regras de publicação) ficam numa skill à parte, `moodle-plugin-pessoal`, em `~/projetos/PESSOAL/kelsoncm/workspace/skills/moodle-plugin-pessoal/`. Ela é carregada junto com a pública.

## Procedimento

### 1. Instalar (uma vez por máquina)

**Opção A: plugin do Claude Code** (qualquer pessoa)

```text
/plugin marketplace add moodle-by-kelsoncm/moodle-plugin-skill
/plugin install moodle-plugin@moodle-by-kelsoncm
```

**Opção B: clone e link** (o que eu uso, porque edito a skill e as mudanças valem na hora, no Claude e no Gemini)

Linux e macOS:

```bash
git clone git@github.com:moodle-by-kelsoncm/moodle-plugin-skill.git ~/projetos/PESSOAL/mbkw/moodle-plugin-skill
ln -s ~/projetos/PESSOAL/mbkw/moodle-plugin-skill/plugins/moodle-plugin/skills/moodle-plugin ~/.claude/skills/moodle-plugin
ln -s ~/projetos/PESSOAL/mbkw/moodle-plugin-skill/plugins/moodle-plugin/skills/moodle-plugin ~/.gemini/config/skills/moodle-plugin
ln -s ~/projetos/PESSOAL/kelsoncm/workspace/skills/moodle-plugin-pessoal ~/.claude/skills/moodle-plugin-pessoal
ln -s ~/projetos/PESSOAL/kelsoncm/workspace/skills/moodle-plugin-pessoal ~/.gemini/config/skills/moodle-plugin-pessoal
```

Windows (PowerShell 7.6+ com o modo de desenvolvedor ativo):

```powershell
$pub = "$HOME/projetos/PESSOAL/mbkw/moodle-plugin-skill/plugins/moodle-plugin/skills/moodle-plugin"
$pes = "$HOME/projetos/PESSOAL/kelsoncm/workspace/skills/moodle-plugin-pessoal"
foreach ($base in "$HOME/.claude/skills", "$HOME/.gemini/config/skills") {
    New-Item -ItemType SymbolicLink -Path "$base/moodle-plugin" -Target $pub
    New-Item -ItemType SymbolicLink -Path "$base/moodle-plugin-pessoal" -Target $pes
}
```

Confira numa sessão nova do Claude Code: `moodle-plugin` e `moodle-plugin-pessoal` aparecem na lista de skills disponíveis. Use só uma das opções: com as duas, a skill aparece duplicada.

### 2. Usar

Não é preciso chamar a skill: ela é carregada quando a tarefa envolve um plugin Moodle. Para garantir, cite-a no pedido ou use `/moodle-plugin` (`/moodle-plugin:moodle-plugin` na opção A).

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

Quando uma revisão, um CI ou um teste revelar algo novo:
- **Lição técnica:** vai para o repositório público, por issue e PR em `moodle-by-kelsoncm/moodle-plugin-skill`. Pontos de revisão entram em `references/review-checklist.md`; os do fluxo, na referência correspondente. Atualize também a versão no `plugin.json` e o `CHANGELOG.md`: quem instalou pela opção A só recebe a mudança quando a versão sobe.
- **Convenção pessoal:** vai para `moodle-plugin-pessoal`.

Com a opção B, a mudança vale na próxima sessão.

## Quando escalar

- O revisor pede algo que contradiz a skill: siga o revisor e atualize a skill.
- A skill não carrega: confira se o link existe (`ls -l ~/.claude/skills`) e se o `SKILL.md` tem o cabeçalho com `name` e `description`. Na opção A, confira com `/plugin` se o plugin está instalado e habilitado.

## Equipe responsável

Kelson da Costa Medeiros (uso pessoal e nos projetos `eduplay-moodle-suite` e `moodle-by-kelsoncm`).

## Links oficiais

- [Agent Skills no Claude Code](https://code.claude.com/docs/en/skills)
- [Checklist de contribuição de plugins Moodle](https://moodledev.io/general/community/plugincontribution/checklist)
- [moodle-plugin-ci](https://moodlehq.github.io/moodle-plugin-ci/)
- [Moodle Marketplace](https://marketplace.moodle.com/)
- [Repositório da skill: moodle-plugin-skill](https://github.com/moodle-by-kelsoncm/moodle-plugin-skill)
- [Exemplo de plugin no padrão: moodle-local_eduplay](https://github.com/eduplay-moodle-suite/moodle-local_eduplay)

## Nível de confiabilidade

**Prático:** padrão usado nos quatro plugins da EduPlay Moodle Suite, aprovados no Marketplace, e na correção do `mod_imagemap` (versão 1.3.0, ressubmetida à revisão).

## Notas adicionais

- A skill pública está em inglês para servir à comunidade Moodle; o agente continua respondendo no idioma da conversa.
- A `moodle-plugin-pessoal` depende das regras globais (`global_rules.md`).
- Junto com ela, use a skill `github-actions`, que define as versões das actions dos workflows.
