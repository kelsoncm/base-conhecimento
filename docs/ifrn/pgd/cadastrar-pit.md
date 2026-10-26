---
title: "PGD: cadastrar o Plano Individual de Trabalho (PIT) do mês"
category: "PGD"
service: "SUAP - Programa de Gestão (pgd2)"
audience: ["TAEs", "Docentes"]
tags: ["pgd", "pit", "plano individual de trabalho", "teletrabalho", "entregas", "suap"]
reliability: "prático"
last_review: "2026-10-26"
source: "Uso do módulo PGD (pgd2) do SUAP"
---

## Sintoma

É preciso cadastrar o PIT do próximo mês, ou a página **Minhas Pendências no PGD** mostra a pendência "Criação ou Solicitação de Aprovação/Homologação dos seguintes PITs: [período]".

## Contexto

O PIT tem quatro partes, cada uma numa aba da tela do plano:

| Aba | Conteúdo |
|---|---|
| **Dados básicos** | Data de início, regime de execução (Teletrabalho parcial, Teletrabalho integral ou Presencial) e % de teletrabalho. |
| **Cronograma de Trabalho Presencial** | Dias e horários presenciais (vazio no teletrabalho integral). |
| **Cronograma de Atendimento em Teletrabalho** | Dias e horários em que o servidor fica disponível para atendimento remoto. |
| **Entregas** | Entregas individuais com título, descrição, prazo e tempo planejado, vinculadas ou não a uma entrega do PES. |

Pré-requisitos: adesão ao PGD deferida, adesão ao PES do setor deferida e calendário PIT/RIT do mês aberto.

## Procedimento

### 1. Criar o PIT

1. Acesse **Meu PGD** (`/pgd2/meu_pgd/`) e clique em **Adicionar PIT** (`/pgd2/cadastrar_pit/`).
2. Em **Selecione a adesão**, escolha a adesão vigente.
3. Em **Calendário PIT/RIT**, escolha o mês.
4. Marque **Confirmo este cadastro**, informe a **senha do SUAP** e salve.

O PIT aparece na tabela "PITs/RITs" de Meu PGD com situação **Em Fase de Cadastro**. O link **Planejamento (PIT)** leva a `/pgd2/visualizar_pit/<id>`.

### 2. Dados básicos

Aba **Dados básicos** → **Editar** (`/pgd2/editar_dados_basicos_pit/<id>/`):

- **Data Início**: já vem preenchida.
- **Regime individual de execução no PGD**: Teletrabalho parcial, Teletrabalho integral ou Presencial.
- **% de Teletrabalho**: ex.: `100,00` para teletrabalho integral. Não pode passar do "% máximo de Teletrabalho" do PES.

### 3. Cronograma de atendimento em teletrabalho

Aba **Cronograma de Atendimento em Teletrabalho** → **Adicionar** (`/pgd2/cadastrar_atendimento_teletrabalho_pit/<id>/`).

O formulário aceita **recorrência**, então o mês inteiro pode ser cadastrado de uma vez:

| Campo | Exemplo |
|---|---|
| Data | primeiro dia útil do mês |
| Hora Inicial / Hora Final | `14:00` / `18:00` |
| Repetir toda | Segunda, Terça, Quarta, Quinta, Sexta |
| Repetir até | último dia do mês |

Confira o **Total** exibido na aba (ex.: 22 dias × 4h = 88h). Para remover um dia específico, exclua a linha correspondente.

!!! note "Recorrência não pula feriados"
    A repetição cadastra todos os dias da semana marcados, inclusive feriados. Exclua as linhas desses dias se não houver atendimento.

### 4. Cronograma de trabalho presencial

Só preencha se o regime tiver dias presenciais. O formulário (`/pgd2/cadastrar_trabalho_presencial_pit/<id>/`) segue a mesma lógica do cronograma de teletrabalho.

### 5. Entregas

Aba **Entregas** → **Adicionar**:

- **Entrega vinculada a entrega do PES**: abre a lista de entregas do PES (`/pgd2/selecionar_entrega_pes_cadastrar_entrega_pit/<id>/`). Clique em **Selecionar** na entrega desejada.
- **Entrega não vinculada a entrega do PES**: para atividades sem correspondência no PES.

Campos da entrega:

| Campo | Observação |
|---|---|
| Título | Curto e específico (ex.: "Desenvolvimento e manutenção do sistema X"). |
| Descrição | O que será feito no mês; ajuda a chefia a avaliar e serve de base para o RIT. |
| Prazo | Opcional. |
| Tempo planejado | Fração decimal de hora: `13,50` = 13h30min. |

!!! warning "Pelo menos uma entrega do setor principal"
    Para solicitar aprovação, o PIT/RIT precisa ter **no mínimo uma entrega vinculada ao PES do setor principal**.

### 6. Conferir as horas

No topo do PIT, compare **Horas previstas para planejamento** com **Horas planejadas**. Ajuste o tempo das entregas se necessário, lembrando os feriados do mês.

O sistema **não bloqueia** horas planejadas acima das previstas: um PIT com 168h planejadas para 152h previstas chegou a ser homologado. Mesmo assim, recomenda-se que as horas planejadas sejam iguais às previstas, para o plano refletir a carga real do mês.

### 7. Solicitar aprovação

1. Enquanto faltar algo, o topo do PIT lista as pendências (ex.: "É necessário cadastrar os dados básicos", "É necessário cadastrar, no mínimo, uma entrega", cronograma de teletrabalho obrigatório para teletrabalho parcial ou integral).
2. Com os requisitos cumpridos, a situação passa a **Em fase de Cadastro/Aguardando envio para Aprovação/Homologação** e aparece o botão **Solicitar aprovação/homologação** no topo do PIT.
3. Na tela de solicitação:
    - **Justificativa/Observação**: opcional.
    - **Confirmo esta operação**: obrigatório.
    - **Senha para confirmação**: senha do SUAP.
4. Clique em **Enviar**.

O andamento e o parecer da chefia ficam em **Consultas → Solicitações de aprovação ou homologação**.

## Quando escalar

- O calendário do mês não aparece em "Calendário PIT/RIT": falar com a gestão do PGD.
- A entrega do PES necessária não existe: pedir à chefia que a inclua no PES.

## Equipe responsável

Servidor (cadastro) e chefia imediata (aprovação/homologação).

## Nível de confiabilidade

Prático.

## Notas adicionais

- Para repetir o planejamento de um mês anterior, veja [Replicar o PIT de um mês anterior](replicar-pit-mes-anterior.md).
- Consultas úteis no PIT: **Histórico de alterações** e **Situação do envio dos dados pela API PGD 2** (envio ao sistema federal).
- Ações disponíveis: **Cancelar PIT** e **Recalcular setor e PES** (útil quando o PES ou o setor mudou depois da criação do PIT).
