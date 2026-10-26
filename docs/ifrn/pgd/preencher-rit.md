---
title: "PGD: preencher o Relatório Individual de Trabalho (RIT) do mês"
category: "PGD"
service: "SUAP - Programa de Gestão (pgd2)"
audience: ["TAEs", "Docentes"]
tags: ["pgd", "rit", "relatório individual de trabalho", "execução", "suap"]
reliability: "prático"
last_review: "2026-10-26"
source: "Uso do módulo PGD (pgd2) do SUAP"
---

## Sintoma

O mês terminou e é preciso relatar o que foi executado em cada entrega planejada no PIT.

## Contexto

O RIT é criado junto com o PIT e fica **Em Fase de Cadastro** até ser preenchido. Ele lista as entregas do PIT com as horas planejadas e, para cada uma, permite registrar uma ou mais execuções.

No topo, além das horas planejadas, o RIT mostra **Horas executadas**: total, em teletrabalho, no próprio setor, em outros setores e sem vínculo.

## Procedimento

1. Em **Meu PGD**, clique em **Execução (RIT)** na linha do mês (`/pgd2/visualizar_rit/<id>`).
2. Em cada entrega, clique em **Adicionar entrega** e preencha:

    | Campo | Observação |
    |---|---|
    | Título | O que foi efetivamente entregue. |
    | Descrição | Resumo da execução: o que foi feito, resultados e links (PRs, releases, atas). |
    | Data Início / Data Final | Período em que a execução ocorreu. |
    | Arquivo | Evidência opcional (relatório, ata, captura). |
    | Horas da Execução | Fração decimal de hora (ex.: `7,50`). |
    | % executado em teletrabalho | Ex.: `100,00` no teletrabalho integral. |

3. Repita para todas as entregas. Uma entrega planejada pode ter mais de uma execução.
4. Confira os totais de horas executadas no topo.
5. Solicite a homologação à chefia **até o dia 5** do mês seguinte.

!!! warning "Requisito mínimo"
    O sistema exige **ao menos uma entrega relacionada ao PES do setor principal** no RIT para permitir a solicitação de homologação.

## Quando escalar

- Entrega executada que não estava no PIT: ajuste o PIT (que pode ser alterado a qualquer tempo) ou combine com a chefia como registrá-la.
- RIT devolvido pela chefia: veja o parecer em **Consultas → Solicitações de aprovação e homologação**.

## Equipe responsável

Servidor (relato) e chefia imediata (homologação até o dia 15).

## Nível de confiabilidade

Prático.

## Notas adicionais

- Manter durante o mês um registro paralelo (issues, commits, agenda) facilita preencher descrições e horas.
- Veja também [PGD e RSC – preenchimento de tempo](../suap/pgd-rsc-preenchimento-tempo.md).
