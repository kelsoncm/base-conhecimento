---
title: "Publicar uma Action no GitHub Marketplace (e publicar o pacote no PyPI pela mesma tag)"
category: "Desenvolvimento"
service: "GitHub Actions / GitHub Marketplace / PyPI"
audience: ["Desenvolvedores", "DevOps"]
tags: ["github-actions", "marketplace", "action", "tags", "pypi", "trusted-publisher", "setuptools-scm", "release"]
reliability: "prático"
last_review: "2026-10-27"
source: "Experiência ao publicar a Action python-by-kelsoncm/pytest-coverage-gate (v1.1.0) no Marketplace e no PyPI"
---

## Sintoma

Você quer transformar uma ferramenta própria em uma **GitHub Action** publicada no Marketplace e, no mesmo projeto, continuar publicando o pacote no PyPI a cada tag. Na prática, a combinação de **tag móvel `v1`**, **gatilho por tag** e **versionamento automático** gera falhas pouco óbvias.

## Contexto

Uma Action usada como `uses: dono/repo@v1` precisa de uma tag **móvel** `v1` que sempre aponte para a última `v1.x.y`. Essa tag convive no mesmo commit com a tag exata `v1.x.y`, o que quebra duas suposições comuns:

- o filtro `tags: ["v*"]` de um workflow de publicação casa com `v1` também;
- ferramentas que derivam a versão da tag (ex.: `setuptools-scm`) podem escolher `v1` em vez de `v1.x.y`.

## Procedimento

### 1. Pré-requisitos da Action

- Repositório **público**, com `action.yml` na **raiz**.
- `name`, `description` e `branding` (`icon` e `color`) preenchidos. O GitHub valida isso na tela da release ("Everything looks good!") e avisa se o nome já estiver em uso.
- README que sirva de página do Marketplace.
- Para ferramentas que usam só a biblioteca padrão, prefira uma **composite action** que executa o script do próprio repositório:

  ```yaml
  runs:
    using: "composite"
    steps:
      - uses: actions/setup-python@<versão>
        with:
          python-version: ${{ inputs.python-version }}
      - shell: bash
        run: python "${{ github.action_path }}/script.py" "${args[@]}"
  ```

  Assim não há `pip install`, a versão da Action é o `ref` usado (`@v1`) e o uso não depende de o PyPI estar atualizado.

### 2. Aceitar o Marketplace Developer Agreement

Na tela de edição da release, a opção *Publish this release to the GitHub Marketplace* aparece **com cadeado** até a conta aceitar o contrato. O aceite é um **botão** na própria página (não um link), vale para a conta ou organização dona do repositório e exige permissão de proprietário. É uma ação legal: leia os termos antes.

### 3. Ordem segura de lançamento

1. CI da `main` verde.
2. Tag exata `vX.Y.Z` (dispara a publicação no PyPI).
3. Confirmar a versão no PyPI.
4. Criar a release.
5. Marcar *Publish this Action to the GitHub Marketplace*, escolher a categoria principal (mais uma opcional) e clicar em **Update release**.
6. Mover a tag móvel `v1` (item 4 abaixo).
7. Validar o `@v1` (item 8 abaixo).

Escolha na categoria o que descreve a função (no caso, **Code quality** + **Testing**).

!!! warning "O GitHub pode pedir confirmação de acesso (sudo mode)"
    Ao salvar a release, uma tela *Confirm access* pode interromper o envio. Depois de autenticar, **confira se a opção de Marketplace persistiu**: a release deve mostrar o selo *Marketplace* e `https://github.com/marketplace/actions/<nome>` deve responder 200. Se não, repita o preenchimento e o clique.

### 4. Tag móvel `v1` sem acidentes

- **Crie a tag móvel apontando direto para o commit**, sem anotação, para não gerar tag aninhada:

  ```bash
  git tag -f v1 'v1.1.0^{}'     # ou o hash do commit
  git push -f origin v1
  ```

- **Restrinja o gatilho de publicação** a tags exatas. O filtro do GitHub é *glob*, não regex; `+` significa "um ou mais do item anterior":

  ```yaml
  on:
    push:
      tags:
        - "v[0-9]+.[0-9]+.[0-9]+"
  ```

- **Fixe a versão do pacote pela tag** no build. Com `v1` e `v1.1.0` no mesmo commit, o `git describe` do `setuptools-scm` escolheu `v1`, gerou `pacote-1.tar.gz` e o PyPI respondeu `400 ... releases older than 14 days`:

  ```yaml
  - name: Build package
    env:
      TAG_NAME: ${{ github.ref_name }}
    run: |
      export SETUPTOOLS_SCM_PRETEND_VERSION="${TAG_NAME#v}"
      python -m build
  ```

- Mova a `v1` a **cada** release nova, mas só depois de a `vX.Y.Z` estar publicada.

### 5. Releases imutáveis

Com *immutable releases* ativado, **tag e anexos de uma release publicada não podem mais ser editados**; só título e notas (e a opção de Marketplace). Portanto, acerte o commit da tag **antes** de criar a release. Uma tag que ainda não virou release (e não foi publicada no PyPI) pode ser recriada no commit correto.

### 6. Trusted publisher do PyPI após mover o repositório

Se o repositório mudou de dono (ex.: de usuário para organização), o publicador confiável do PyPI continua com o dono antigo e a publicação falha com `invalid-publisher`. No projeto do PyPI, em *Publishing*, adicione um publicador novo com:

| Campo | Valor |
|---|---|
| Owner | dono atual (usuário ou organização) |
| Repository | nome do repositório |
| Workflow | nome do arquivo (ex.: `publish.yml`) |
| Environment | o mesmo `environment` do job de publicação (ex.: `pypi`) |

O PyPI pede a **confirmação da senha** para abrir essa área (vale por uma hora). Depois de validar, remova o publicador antigo.

Dica de diagnóstico: o log do passo de publicação lista os *claims* enviados (`repository`, `workflow_ref`, `environment`); compare com o cadastro.

### 7. Repetir uma execução que falhou

`gh run rerun <id> --failed` **reaproveita os artefatos do job de build anterior** e usa o **workflow do commit da tag**. Corrigir o `publish.yml` na `main` não adianta para a tag já criada: é preciso uma tag nova (ou recriar uma tag ainda não publicada) em um commit que já tenha a correção.

### 8. Validar o `@v1` antes de divulgar

Com o [act](https://github.com/nektos/act), um workflow descartável baixa a Action do GitHub como um usuário externo faria:

```yaml
jobs:
  ok:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<versão>
      - uses: dono/repo@v1
```

Teste ao menos um caso de sucesso e um de falha, e confira os *outputs*.

## Quando escalar

- Se o aceite do contrato do Marketplace não estiver disponível, a conta/organização pode exigir um proprietário diferente.
- Se o PyPI recusar o publicador mesmo com os *claims* corretos, verifique o suporte do PyPI (mesmo log do passo de publicação).

## Equipe responsável

Pessoal (Kelson da Costa Medeiros).

## Links oficiais

- [Trusted publishers no PyPI](https://docs.pypi.org/trusted-publishers/)
- Documentação do GitHub (busque em `docs.github.com`): "Publishing actions in GitHub Marketplace" e "Immutable releases".
- [Action pytest-coverage-gate no Marketplace](https://github.com/marketplace/actions/pytest-coverage-gate)

## Nível de confiabilidade

- **Prático:** todos os passos foram executados na publicação da `v1.1.0`; os textos de tela do GitHub e do PyPI podem mudar.

## Notas adicionais

- Um workflow de publicação com o filtro antigo `v*` recebeu duas execuções indevidas ao enviar a `v1`; elas falharam por `invalid-publisher` e **nada foi publicado**. Sem esse acaso, uma versão "1" poderia ter ido ao PyPI, e versões publicadas não podem ser apagadas nem reutilizadas.
- Ver também o artigo sobre a [Action pytest-coverage-gate](usar-pytest-coverage-gate.md).
