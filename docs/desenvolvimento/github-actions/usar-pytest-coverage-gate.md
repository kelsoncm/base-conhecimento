---
title: "Usar a Action pytest-coverage-gate (catraca de cobertura de testes)"
category: "Desenvolvimento"
service: "pytest-coverage-gate / GitHub Actions / pre-commit"
audience: ["Desenvolvedores", "DevOps"]
tags: ["pytest", "coverage", "quality-gate", "github-actions", "pre-commit", "baseline"]
reliability: "prático"
last_review: "2026-10-27"
source: "Projeto python-by-kelsoncm/pytest-coverage-gate (v1.1.0) e seu próprio CI"
---

## Sintoma

Você quer impedir que a cobertura de testes **caia** ao longo do tempo, sem fixar um número mágico (como `--cov-fail-under=80`) que fica desatualizado ou é baixo demais para um projeto que já tem 95%.

## Contexto

O `pytest-coverage-gate` funciona como uma **catraca (*ratchet*)**: lê o `line-rate` do `coverage.xml` (gerado por `pytest-cov`) e compara com um **baseline** versionado em `.coverage-baseline`.

| Situação | Resultado |
|---|---|
| Cobertura menor que o baseline | falha (`FAIL`) |
| Igual | passa (`OK`) |
| Maior | passa (`SUCC`); o baseline sobe, se não estiver em `--check-only` |

Ele existe em três formas: **hook de pre-commit**, **CLI** (`pip install pytest-coverage-gate`) e **GitHub Action**. O gate usa só a biblioteca padrão do Python (3.9+).

## Procedimento

### 1. Preparar o projeto

```bash
pytest --cov=<seu_pacote> --cov-report=xml
echo "0.00" > .coverage-baseline      # ou a cobertura atual
git add .coverage-baseline            # versione o baseline
```

### 2. Local: hook de pre-commit

```yaml
repos:
  - repo: https://github.com/python-by-kelsoncm/pytest-coverage-gate
    rev: v1.1.0
    hooks:
      - id: pytest-coverage-gate
```

Localmente o gate **sobe o baseline** quando a cobertura melhora; é aí que o `.coverage-baseline` evolui, e você commita o novo valor.

### 3. CI: GitHub Action

```yaml
- run: pip install pytest pytest-cov
- run: pytest --cov=<seu_pacote> --cov-report=xml

- name: Coverage gate
  id: gate
  uses: python-by-kelsoncm/pytest-coverage-gate@v1
```

A Action roda em modo **somente verificação** (`--check-only`), porque uma alteração feita no *runner* se perderia no fim do job.

| Input | Padrão | Descrição |
|---|---|---|
| `coverage-xml` | `coverage.xml` | Caminho do relatório Cobertura |
| `baseline` | `.coverage-baseline` | Arquivo com o percentual de referência |
| `update-baseline` | `false` | Se `true`, reescreve o baseline no workspace quando melhora |
| `python-version` | `3.x` | Python usado (3.9+) |

| Output | Descrição |
|---|---|
| `current` | Cobertura atual (%) |
| `baseline` | Baseline (%) |
| `delta` | Diferença em pontos percentuais (ex.: `+1.25`) |
| `status` | `ok`, `improved` ou `fail` |

Além dos outputs, a Action escreve uma tabela (baseline, atual, delta, status) no resumo do job.

### 4. O projeto usa a própria Action?

Sim. O `ci.yml` do repositório do `pytest-coverage-gate` roda os testes na matriz Python 3.9 a 3.13 e, no job de 3.13, executa o gate com **`uses: ./`** (a Action do próprio commit):

```yaml
- name: Coverage gate (this repository's own action)
  if: matrix.python-version == '3.13'
  uses: ./
```

Usar `./` em vez de `@v1` é intencional: cada PR testa o **código da própria branch**. Um `@v1` testaria a versão já publicada, não a alteração em revisão. O baseline do projeto fica em `.coverage-baseline` (hoje `90.00`).

### 5. Como subir o baseline

Como a Action não persiste o baseline, o caminho é:

1. rodar o hook/CLI localmente (ele atualiza o arquivo), e
2. commitar o novo `.coverage-baseline` junto da mudança.

Com `update-baseline: true`, um passo posterior do workflow precisa commitar ou abrir PR com o arquivo alterado.

## Quando escalar

- Se a cobertura oscilar entre execuções iguais (testes não determinísticos), corrija os testes antes de apertar o baseline.
- Se o `coverage.xml` não tiver `line-rate` na raiz, o relatório não é do formato Cobertura gerado por `pytest-cov`.

## Equipe responsável

Pessoal (Kelson da Costa Medeiros).

## Links oficiais

- [Action no Marketplace](https://github.com/marketplace/actions/pytest-coverage-gate)
- [Repositório](https://github.com/python-by-kelsoncm/pytest-coverage-gate)
- [Pacote no PyPI](https://pypi.org/project/pytest-coverage-gate/)

## Nível de confiabilidade

- **Prático:** exemplos executados no CI do projeto e validados com `act` usando `@v1`; os 12 testes do gate cobrem os casos de regressão, igualdade, melhora, `--check-only` e arquivos ausentes.

## Notas adicionais

- Desde a `v1.1.0` as mensagens do CLI estão em **inglês** (antes, pt-BR). Quem lê a saída por texto precisa atualizar; os códigos de saída não mudaram.
- A comparação usa 2 casas decimais, para que ruído de ponto flutuante não vire regressão.
- O parser rejeita `coverage.xml` com `DOCTYPE`/`ENTITY` (um relatório legítimo nunca os tem).
- Como publicar uma Action assim: [Publicar uma Action no GitHub Marketplace](publicar-action-marketplace.md).
