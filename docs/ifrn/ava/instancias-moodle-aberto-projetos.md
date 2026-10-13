---
title: "Ecossistema de instâncias Moodle no IFRN (Acadêmico, Projetos e Aberto)"
category: "AVA"
service: "Moodle AVA"
audience: ["TIC", "Coordenadores de Projeto", "Docentes", "Pesquisadores", "Extensão"]
tags: ["moodle", "ava", "moodle-projetos", "moodle-aberto", "mooc", "suap", "normativa-proen-19-2025"]
status: "prático"
last_review: "2026-10-12"
source: "Instrução Normativa PROEN nº 19/2025 e Central de Ajuda DEAD/ZL"
---

## Sintoma

- Servidores com dúvidas sobre qual ambiente virtual utilizar para cursos de extensão, projetos de pesquisa, capacitações ou cursos abertos massivos (MOOCs).
- Dificuldades para solicitar a criação de salas fora da matriz acadêmica regular do SUAP.
- Incertezas sobre regras de governança, acesso de usuários externos e hospedagem de mídias em instâncias especiais do Moodle.

## Contexto

Para garantir segurança, estabilidade e aderência a requisitos de negócio distintos, o IFRN mantém o ecossistema do **Ambiente Virtual de Aprendizagem (AVA / Moodle)** particionado em três instâncias institucionais independentes:

1. **Moodle Acadêmico (`ava.ifrn.edu.br`):** Destinado exclusivamente às disciplinas da educação formal (cursos técnicos, superiores e pós-graduações regulares). Sua base de dados é sincronizada estritamente com os diários do SUAP.
2. **Moodle Projetos:** Voltado para ações de extensão, projetos de pesquisa com fomento, projetos de ensino e capacitações corporativas internas, regido pela **Instrução Normativa PROEN nº 19/2025**.
3. **Moodle Aberto / Cursos Abertos Online (`ead.ifrn.edu.br/ava/aberto/`):** Plataforma institucional de cursos livres autoinstrucionais (MOOCs) voltada para a comunidade externa e sociedade em geral.

---

## Procedimento

### A. Moodle Projetos (Instrução Normativa PROEN nº 19/2025)

#### 1. Requisitos para Criação de Cursos
Qualquer servidor ativo do IFRN pode solicitar a criação de um curso no Moodle Projetos, desde que atendidos os seguintes critérios:
- A ação deve estar **formalizada institucionalmente no SUAP** (projeto de extensão, projeto de pesquisa aprovado por edital, ação de ensino ou comissão de capacitação).
- A equipe do projeto deve possuir coordenador formalmente designado.

#### 2. Fluxo de Solicitação via Central de Serviços
1. Acesse a Central de Serviços do SUAP e abra um chamado direcionado a **EaD e Tecnologias Educacionais > Ambiente Virtual de Aprendizagem Moodle**.
2. No corpo do chamado, forneça obrigatoriamente:
   - **Nome da ação, curso ou projeto.**
   - **Objetivo pedagógico e público-alvo.**
   - **Link do projeto cadastrado e aprovado no SUAP** (ou documentação comprobatória da portaria/edital).
   - **Mecanismo de inclusão dos participantes:** especifique se os alunos serão inscritos em lote ou por autoinscrição controlada.
   - **Equipe gestora do curso:** nome completo, CPF, matrícula (IFRN-Id) e e-mail dos professores, mediadores e bolsistas que atuarão na sala.

#### 3. Governança de Usuários e Segurança
- **Identificação Única (IFRN-Id):** Todos os participantes que acessam o Moodle Projetos devem possuir cadastro no SUAP. Para participantes externos, a coordenação deve providenciar previamente o cadastro de **Usuário Externo no SUAP**.
- **Gestão de Inscrições Centralizada:** Por diretriz da IN 19/2025, não são concedidas permissões administrativas irrestritas para criação ou remoção manual direta de contas. Todas as movimentações em lote de estudantes devem ser solicitadas à equipe de suporte do Moodle via chamado.

#### 4. Política de Armazenamento e Racionalização de Mídias
- É terminantemente **vedado o upload direto de arquivos de vídeo** na base de dados do Moodle.
- Todos os materiais audiovisuais devem ser hospedados em repositórios apropriados da instituição (**Eduplay da RNP**, YouTube institucional ou servidores de streaming), inserindo-se apenas o link ou código de incorporação (*embed*) na sala virtual.

---

### B. Moodle Aberto (Cursos Livres / MOOCs)

O Moodle Aberto é destinado a cursos massivos online autoinstrucionais (sem mediação pedagógica síncrona ou tutores dedicados), nos quais os participantes avançam no seu próprio ritmo com avaliação automatizada:

#### 1. Acesso Público pelo Estudante
- URL: `https://ead.ifrn.edu.br/ava/aberto/`
- Autenticação simplificada: os usuários podem criar contas gratuitas utilizando endereço de e-mail pessoal ou realizar login social direto com contas **Google** ou **Microsoft**.
- Inscrição autônoma: o estudante localiza o curso na vitrine e clica em **Inscreva-me**.

#### 2. Solicitação de Novo Curso Aberto por Servidores
1. Servidores ou grupos de pesquisa interessados em publicar um MOOC devem abrir chamado na Central de Serviços do SUAP para a DEAD/ZL.
2. Fornecer: ementa do curso, carga horária estimada, materiais didáticos autorais já produzidos e mecanismos de avaliação formativa (questionários com correção automática).
3. A equipe de Design Educacional da DEAD realiza a curadoria técnica e pedagógica (SLA de retorno de 48 horas úteis para alinhamento inicial).

---

## Comparativo das Instâncias Moodle

| Característica | Moodle Acadêmico | Moodle Projetos | Moodle Aberto |
| :--- | :--- | :--- | :--- |
| **Público-alvo** | Alunos e professores regulares | Participantes de projetos/extensão | Sociedade e comunidade externa |
| **Origem das turmas** | Matrizes e diários do SUAP | Chamado no SUAP com projeto formal | Chamado com curadoria DEAD |
| **Autenticação** | Credenciais SUAP (IFRN-Id) / CAFe | Credenciais SUAP (IFRN-Id) | E-mail livre, Google ou Microsoft |
| **Tutoria** | Obrigatória (Docente do diário) | Conforme plano do projeto | Não (Autoinstrucional) |
| **Certificação** | Registro acadêmico oficial no SUAP | Declaração/certificado de extensão | Certificado digital automatizado |

---

## Quando escalar

- Necessidade de integração de turma do Moodle Projetos com sistemas externos de terceiros: consultar a CTI/DEAD para viabilidade de LTI ou Web Services REST.
- Dúvidas sobre enquadramento de ação pedagógica: Pró-Reitoria de Ensino (PROEN) ou Diretoria de Extensão.
- Lentidão em períodos de pico de cursos abertos massivos: acionar a DINRE para ajuste de instâncias de aplicação e banco de dados.

## Equipe responsável

- **Coordenação do Projeto / Docente Proponente:** elaboração pedagógica, atendimento aos alunos e gestão do conteúdo.
- **Suporte Moodle (DEAD/ZL):** criação técnica de salas, controle de coortes e sustentação das instâncias.
- **PROEN / Diretorias Sistêmicas:** governança e homologação de normativas.

## Links oficiais

- [Painel do AVA IFRN](https://ava.ifrn.edu.br/)
- [Moodle Aberto - IFRN](https://ead.ifrn.edu.br/ava/aberto/)
- [Central de Serviços do SUAP](https://suap.ifrn.edu.br/centralservicos/)

## Nível de confiabilidade

- **Confirmado:** embasado na Instrução Normativa PROEN nº 19/2025 e portarias da DEAD/ZL.

## Notas adicionais

- Salas inativas no Moodle Projetos há mais de dois semestres sem movimentação acadêmica entram em ciclo de arquivamento para desoneração do banco de dados institucional.
