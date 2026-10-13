---
title: "Sistema de Processo Seletivo: cadastro de editais, bancas e apuração"
category: "Sistemas"
service: "Sistema de Processo Seletivo (SGC)"
audience: ["Comissões de Seleção", "Coordenação de Acesso Discente", "TIC", "Suporte"]
tags: ["processo seletivo", "sgc", "edital", "cotas", "avaliadores", "sorteio", "suap"]
status: "prático"
last_review: "2026-10-12"
source: "Central de Ajuda DEAD/ZL e manuais do Sistema Gestor de Concursos"
---

## Sintoma

- Necessidade de cadastrar novos editais de seleção no Sistema Gestor de Concursos (SGC/Processo Seletivo).
- Dúvidas sobre configuração e homologação de cotas, distribuição de candidatos para avaliadores de bancas e cálculo automatizado de notas e escores.
- Dificuldade em obter o link público do edital para divulgação antes da abertura das inscrições.

## Contexto

O **Sistema Gestor de Concursos (SGC)** do IFRN gerencia processos seletivos para cursos técnicos, superiores, pós-graduações, cursos FIC e seleções de bolsistas/colaboradores. O sistema atua de forma autônoma ou integrado aos cadastros do SUAP, abrangendo desde a publicação do edital até a apuração do resultado final.

A interface administrativa é dividida em dois eixos:
- **Menu Superior:** seleção do edital ativo sobre o qual as operações serão executadas.
- **Menu Lateral:** configuração das etapas, provas, critérios, bancas, cotas e processamento de notas.

---

## Procedimento

### 1. Obter a URL do edital antes da abertura das inscrições

Na interface pública, o sistema oculta editais cujas inscrições ainda não iniciaram. Para divulgar o link nos portais institucionais e redes sociais previamente:

1. Na área administrativa do SGC, acesse **Editais > Meus Editais** (ou localize pelo código no menu superior).
2. Verifique o **ID numérico** do edital cadastrado (ex.: `123`).
3. Monte a URL pública padrão:
   ```text
   https://processoseletivo.ifrn.edu.br/edital/informacoes/<ID_DO_EDITAL>/
   ```
4. Esse endereço já exibe a ementa, arquivos anexos (edital em PDF) e cronograma para os candidatos, exibindo a contagem regressiva até a abertura do formulário de inscrição.

---

### 2. Cadastro de edital por análise curricular

1. Selecione o edital no menu superior e configure as **Etapas** e **Vagas** no menu lateral.
2. Em **Prova Genérica > Prova**, crie a prova representativa da análise curricular (ex.: *Avaliação de Títulos*).
3. Cadastre os **Itens de Avaliação (Critérios):**
   - Nome do critério (ex.: *Formação acadêmica*, *Experiência docente*).
   - Pontuação mínima, máxima e peso.
   - Definir se a nota aceita casas decimais.
4. Cadastre os **Avaliadores da Banca:**
   - Adicione os servidores avaliadores cadastrados no sistema. Caso o avaliador não possua cadastro prévio, registre-o na base de usuários com perfil de avaliador.

---

### 3. Configuração e homologação de cotas

Processos seletivos com reserva de vagas (Lei de Cotas, ações afirmativas, PCD) exigem etapa prévia de **Homologação:**

1. No menu do edital, ative a opção de **Cotas**.
2. Configure a **Cota Genérica:**
   - Texto de ajuda e orientações para o candidato no ato da inscrição.
   - Documentos comprobatórios obrigatórios para upload (laudo médico, autodeclaração étnico-racial, histórico escolar público).
3. **Etapa de Homologação:**
   - Acesse **Homologação > Inscritos por Cota**.
   - A comissão analisa os documentos anexados e marca o parecer (*Deferido* ou *Indeferido* com justificativa).
   - Candidatos indeferidos são automaticamente remanejados para a lista de **Ampla Concorrência (Geral)**.

---

### 4. Geração e distribuição de avaliações

Após o encerramento do prazo de inscrições e da homologação das cotas:

1. Acesse **Prova Genérica > Distribuição de Avaliações**.
2. Selecione o método de distribuição:
   - **Automática uniforme:** o sistema divide as inscrições proporcionalmente entre os membros da banca.
   - **Dupla avaliação:** cada candidato é avaliado por 2 avaliadores distintos para permitir cálculo de discrepância.
3. Clique em **Distribuir Inscrições**.
4. Cada avaliador visualizará apenas as inscrições a ele atribuídas no seu painel restrito.

---

### 5. Cálculo de escores e processamento do resultado

1. Acesse **Prova Genérica > Prova**.
2. Clique no botão **Calcular Escores**. O sistema aplicará os pesos, somará os critérios e gerará as notas finais das provas.
3. Em seguida, acesse **Processamento de Resultado**:
   - Execute o cálculo da classificação geral e das listas cotistas.
   - O sistema aplica os critérios de desempate estabelecidos no edital (idade, pontuação em critérios prioritários, etc.).
4. Clique em **Publicar Resultado Preliminar** ou exporte o relatório oficial em PDF/CSV para publicação no portal.

---

### 6. Editais com seleção por sorteio eletrônico

Para seleções simplificadas de cursos FIC ou vagas residuais via sorteio:

1. No tipo de seleção do edital, marque **Sorteio Eletrônico**.
2. Após o encerramento das inscrições e homologação da lista de inscritos, acesse **Sorteio > Executar Sorteio**.
3. O sistema utiliza semente criptográfica (*seed*) para garantir aleatoriedade auditável e gera a ordem de classificação instantaneamente, incluindo lista de espera.
4. Salve e publique a folha de auditoria do sorteio contendo a semente utilizada e o timestamp.

---

## Quando escalar

- Falhas no algoritmo de distribuição de avaliações (inscrições órfãs ou duplicadas): suporte técnico da CTI/Sistemas.
- Erro no cálculo de desempate ou discrepância entre avaliadores: Coordenação do Processo Seletivo e suporte de TIC.
- Lentidão crítica no servidor no último dia de inscrições: acionar a DINRE para ajuste de recursos e escalabilidade.

## Equipe responsável

- **Comissão Central e Setorial de Processos Seletivos:** configuração pedagógica, bancas e homologações.
- **CTI / Coordenação de Sistemas:** manutenção da infraestrutura, banco de dados e correção de bugs no SGC.

## Links oficiais

- [Sistema de Processo Seletivo do IFRN](https://processoseletivo.ifrn.edu.br/)
- [Painel Administrativo do SGC](https://processoseletivo.ifrn.edu.br/admin/)

## Nível de confiabilidade

- **Confirmado:** procedimento em conformidade com as regras institucionais e tutoriais da DEAD/ZL.

## Notas adicionais

- Sempre certifique-se de que o edital selecionado no menu superior é exatamente aquele em que deseja executar ações em lote, pois o recálculo de escores é irreversível após homologado.
- Os critérios de desempate precisam estar rigidamente alinhados com o texto publicado no edital em PDF para evitar contestações jurídicas.
