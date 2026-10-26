---
title: "PGD: replicar o PIT de um mês anterior"
category: "PGD"
service: "SUAP - Programa de Gestão (pgd2)"
audience: ["TAEs", "Docentes"]
tags: ["pgd", "pit", "replicar", "copiar", "automação", "suap"]
reliability: "prático"
last_review: "2026-10-26"
source: "Uso do módulo PGD (pgd2) do SUAP"
---

## Sintoma

O planejamento se repete de um mês para outro, mas o SUAP **não tem opção de copiar ou duplicar um PIT**. Cada mês precisa ser cadastrado do zero.

## Contexto

O menu **Ações** do PIT oferece só **Cancelar PIT** e **Recalcular setor e PES**. A réplica é manual: ler o PIT-modelo e recadastrar dados básicos, cronogramas e entregas no PIT novo. Dois detalhes facilitam:

- O cronograma de teletrabalho aceita **recorrência semanal**, então o mês inteiro é cadastrado num único envio.
- Enquanto o **PES** for o mesmo (ex.: PES trimestral), as entregas do PES selecionáveis são as mesmas nos meses do período.

## Procedimento

### 1. Criar o PIT do mês novo

Siga o passo 1 de [Cadastrar o PIT do mês](cadastrar-pit.md#1-criar-o-pit). Esta etapa exige a senha do SUAP.

### 2. Levantar o PIT-modelo

Abra o PIT do mês anterior (Meu PGD → **Planejamento (PIT)**) e anote:

| Aba | O que anotar |
|---|---|
| Dados básicos | Regime e % de teletrabalho. |
| Cronograma presencial | Dias e horários (se houver). |
| Cronograma de teletrabalho | Padrão de dias e horário (ex.: seg–sex, 14h–18h). |
| Entregas | Para cada entrega: entrega do PES a que está vinculada, título, descrição completa e tempo planejado. |

!!! tip "Descrição completa"
    Na listagem, a descrição pode aparecer resumida. Abra **Editar** de cada entrega no PIT-modelo para copiar o texto integral, **sem salvar**.

### 3. Preencher o PIT novo

1. **Dados básicos** → Editar → mesmos regime e %.
2. **Cronograma de teletrabalho** → Adicionar → primeiro dia útil, horários, dias da semana marcados e **Repetir até** = último dia do mês.
3. **Cronograma presencial** → só se o modelo tiver.
4. **Entregas** → Adicionar → **Entrega vinculada a entrega do PES** → Selecionar a mesma entrega do PES → colar título, descrição e tempo. Repita para cada entrega.

### 4. Ajustar ao mês

- Compare **Horas previstas para planejamento** do mês novo com **Horas planejadas**. Feriados e recessos mudam a carga, então redistribua o tempo das entregas, se necessário.
- Atualize descrições que citem fatos do mês anterior.
- Se o PES mudou (novo trimestre), escolha as entregas equivalentes no novo PES.

### 5. Solicitar aprovação

Menu **Ações** do PIT → solicitar aprovação/homologação, até o dia 25 do mês anterior ao planejado.

## Automação com assistente de navegador

O procedimento é repetitivo e funciona bem com um assistente de IA que opere o navegador (ex.: Claude in Chrome), desde que se respeitem estas regras:

- A **criação** do PIT pede a senha do SUAP. O servidor cria o PIT vazio e o assistente preenche o resto.
- Os formulários de dados básicos, cronogramas e entregas **não pedem senha** e podem ser preenchidos pelo assistente.
- A **solicitação de aprovação** é irreversível e deve ser confirmada pelo servidor.

Rotas usadas (substitua `<id>` pelo ID do PIT e `<id_pes>` pelo ID da entrega do PES):

| Ação | Rota |
|---|---|
| Ver PIT (abas) | `/pgd2/visualizar_pit/<id>/?tab=horaatendimento` · `?tab=entregas` |
| Editar dados básicos | `/pgd2/editar_dados_basicos_pit/<id>/` |
| Cadastrar teletrabalho | `/pgd2/cadastrar_atendimento_teletrabalho_pit/<id>/` |
| Cadastrar presencial | `/pgd2/cadastrar_trabalho_presencial_pit/<id>/` |
| Listar entregas do PES | `/pgd2/selecionar_entrega_pes_cadastrar_entrega_pit/<id>/` |
| Cadastrar entrega vinculada | `/pgd2/cadastrar_entrega_pit/<id>/<id_pes>` |
| Cadastrar entrega não vinculada | `/pgd2/cadastrar_entrega_pit/<id>/` |
| Editar entrega (ler modelo) | `/pgd2/editar_entrega_pit/<id_entrega>` |

Nomes dos campos dos formulários:

- Dados básicos: `data_inicio`, `regime_execucacao` (1 = Teletrabalho parcial, 2 = Teletrabalho integral, 3 = Presencial), `percentual_teletrabalho`.
- Teletrabalho: `data`, `hora_inicio`, `hora_final`, `recorrencia_dias_semana` (0 = segunda … 6 = domingo), `data_ate`.
- Entrega: `titulo`, `descricao`, `data_prazo`, `tempo_planejado` (ex.: `52,00`).

## Quando escalar

- Entregas do PES do modelo não aparecem no mês novo: o PES pode ter expirado. Fale com a chefia sobre o novo PES.

## Equipe responsável

Servidor (cadastro) e chefia imediata (aprovação).

## Nível de confiabilidade

Prático: testado no SUAP do IFRN em outubro de 2026. Rotas e nomes de campos podem mudar em novas versões.

## Notas adicionais

- Uma sugestão de melhoria para o SUAP seria um botão "Copiar PIT anterior" no menu Ações, que reduziria bastante o retrabalho mensal.
