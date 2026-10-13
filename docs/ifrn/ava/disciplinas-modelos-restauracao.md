---
title: "Modelos de disciplinas e restauração de salas no Moodle"
category: "AVA"
service: "Moodle AVA / Projeto REAA"
audience: ["Professores", "Secretaria Acadêmica", "TIC", "Designers Educacionais"]
tags: ["moodle", "ava", "modelos", "backup", "restauracao", "reaa", "proen", "dead"]
status: "prático"
last_review: "2026-10-12"
source: "Central de Ajuda DEAD/ZL e Projeto REAA/PROEN"
---

## Sintoma

- Docente precisa estruturar uma nova sala no Moodle seguindo o padrão visual institucional da DEAD/ZL.
- Necessidade de utilizar disciplinas com conteúdos prontos desenvolvidas pelo **Projeto REAA (Recursos Educacionais Abertos e Acessíveis)**.
- Dúvidas sobre o fluxo de solicitação de restauração via SUAP sem perder alunos e professores já matriculados.

## Contexto

A Diretoria de Educação a Distância e Tecnologias Educacionais (DEAD/ZL), em cooperação com a Pró-Reitoria de Ensino (PROEN), padroniza os ambientes virtuais em duas modalidades de modelos:

1. **Modelos Base (Sem conteúdos):** Arquivos de backup (`.mbz`) vazios contendo apenas a estrutura padrão de navegação (seção de boas-vindas, plano de ensino, ambientação, tópicos formatados e fóruns de avisos). O professor baixa o arquivo e restaura diretamente na sua disciplina.
2. **Disciplinas Modelo com Conteúdos (Projeto REAA):** Salas completas produzidas por equipes multidisciplinares (designers instrucionais, conteudistas e revisores) para componentes curriculares comuns de cursos técnicos subsequentes, graduações e pós-graduações. A restauração é executada pela equipe de Suporte Moodle da DEAD via chamado no SUAP.

---

## Procedimento

### A. Utilizando Modelos Base (Sem Conteúdo)

Para aplicar a estrutura visual padrão da DEAD em um diário recém-criado:

1. **Download do Modelo:** Acesse o repositório de modelos da DEAD e baixe o arquivo de backup (`.mbz`).
2. **Acessar a Disciplina:** Entre na sua sala de aula virtual no Moodle.
3. **Menu de Restauração:**
   - No menu superior ou lateral de gerenciamento da disciplina, clique em **Mais > Reutilização de curso** (ou ícone de engrenagem > **Restaurar**).
4. **Upload do Backup:**
   - Na área *Importar um arquivo de backup*, arraste o arquivo `.mbz` baixado e clique em **Restaurar**.
5. **Configurações de Destino:**
   - Na etapa de destino, selecione a opção **"Mesclar o curso de backup com este curso"**.
   - *Atenção:* Nunca escolha "Excluir os conteúdos deste curso e depois restaurar" para não comprometer registros institucionais do SUAP.
6. **Conclusão:** Avance pelas etapas mantendo as marcações padrão e clique em **Executar a restauração**. A estrutura de seções, ícones e fóruns padronizados será aplicada na sala.

---

### B. Solicitando Restauração de Disciplina Modelo com Conteúdos (Projeto REAA)

O catálogo REAA inclui disciplinas completas como *Educação em Tecnologias Digitais (30h/60h)*, *Metodologia do Trabalho Científico (30h)*, *Leitura e Produção de Textos Acadêmicos (30h)*, *Segurança do Trabalho (30h)*, *Gestão e Empreendedorismo (30h)*, *Filosofia, Ciência e Tecnologia (30h)* e *Ambientação Virtual para Pós-Graduação (30h)*.

#### Etapa 1: Provisionamento obrigatório no SUAP
Antes de solicitar a restauração do modelo, a sala precisa existir no Moodle:
1. O diário da disciplina deve estar criado e ativo no **SUAP**.
2. A integração deve ser acionada clicando em **Sincronizar com o AVA** no SUAP.
3. Esse procedimento cria a sala e vincula automaticamente o professor e os estudantes com matrícula ativa.

#### Etapa 2: Abertura de chamado na Central de Serviços
1. Acesse a Central de Serviços do SUAP no link direto: `https://suap.ifrn.edu.br/centralservicos/abrir_chamado/410/` (Serviço: *Requisitar criação ou alteração de usuários ou disciplinas no Moodle*).
2. No corpo do chamado, informe:
   - **Solicitação:** "Restauração de disciplina modelo do Projeto REAA".
   - **Nome exato da disciplina modelo desejada:** (ex.: *Metodologia do Trabalho Científico - 30h*).
   - **URL/Link da disciplina criada no Moodle:** (copie o endereço da sala aberta no navegador).
3. Envie o chamado.

#### Etapa 3: Execução e pós-restauração
- A equipe de Suporte Moodle da DEAD importará os livros interativos, vídeos, questionários e objetos de aprendizagem na sala.
- **Docentes e alunos não são afetados:** A integração SUAP continua ativa e as matrículas permanecem intactas.
- **Ajuste de datas pelo docente:** O professor deve revisar as datas de abertura e fechamento das tarefas e questionários para adequá-las ao calendário letivo vigente do campus.

---

## Quando escalar

- Falhas no upload do arquivo `.mbz` por limite de tamanho de postagem (*post_max_size* no PHP): acionar a TIC/DEAD.
- Erro de permissão ao restaurar blocos ou papéis na disciplina: verificar se o docente possui papel de *Professor com edição (EditingTeacher)* na sala.
- Solicitação de novo componente curricular para o catálogo do Projeto REAA: encaminhar proposta pedagógica à Diretoria de EaD / PROEN.

## Equipe responsável

- **Docente:** personalização de cronograma e mediação pedagógica.
- **Equipe de Suporte Moodle (DEAD/ZL):** restauração técnica de bases REAA e disponibilização dos backups padrão.
- **Equipe Pedagógica / REAA:** concepção e atualização contínua dos materiais abertos.

## Links oficiais

- [Abertura de Chamado para Restauração no Moodle (Serviço 410)](https://suap.ifrn.edu.br/centralservicos/abrir_chamado/410/)
- [Painel do AVA IFRN](https://ava.ifrn.edu.br/)
- [Pró-Reitoria de Ensino (PROEN/IFRN)](https://portal.ifrn.edu.br/ensino/proen/)

## Nível de confiabilidade

- **Confirmado:** procedimentos oficiais homologados pelo Projeto REAA/PROEN e executados pela Central de Serviços DEAD/ZL.

## Notas adicionais

- Ao restaurar modelos base (.mbz), recomenda-se fazê-lo antes de cadastrar conteúdos autorais para evitar conflitos de numeração de tópicos.
- Disciplinas do projeto REAA são licenciadas sob Creative Commons (CC-BY-NC-SA), permitindo adaptações e reuso pedagógico por qualquer campus do IFRN.
