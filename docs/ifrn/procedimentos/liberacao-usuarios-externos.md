---
title: "Cadastro e liberação de usuários e colaboradores externos no SUAP"
category: "Procedimentos"
service: "Acesso e Autenticação"
audience: ["TIC", "Coordenadores de Curso", "Docentes", "Chefias de Setor"]
tags: ["usuários externos", "colaborador externo", "prestador de serviço", "laboratórios", "suap", "ifrn-id", "biometria"]
reliability: "prático"
last_review: "2026-10-12"
source: "Experiências trocadas entre colaboradores e Central de Ajuda DEAD/ZL"
---

## Sintoma

- Necessidade de criar conta no SUAP (**IFRN-Id**) para colaboradores externos, bolsistas, tutores ou terceirizados prestadores de serviço.
- Necessidade de permitir que usuários externos (sem vínculo prévio com o IFRN) acessem laboratórios para cursos, oficinas ou eventos pontuais.

## Contexto

A conta no SUAP (**IFRN-Id**) é a credencial única utilizada para todos os serviços de TIC do IFRN (estações de trabalho, rede Wi-Fi corporativa, e-mail institucional e sistemas). O procedimento de cadastro e concessão de acesso varia conforme a finalidade:

1. **Colaborador externo ou prestador de serviço:** vínculo formal de trabalho, tutoria ou consultoria.
2. **Participante de evento/oficina:** acesso temporário a laboratórios ou infraestrutura física.

---

## Procedimento

### A. Cadastro de Colaborador Externo no SUAP (IFRN-Id)

#### 1. Canal de solicitação conforme a unidade
- **Vinculação à DEAD (Campus Natal - Zona Leste):** A solicitação deve ser feita presencialmente ou por memorando ao **Gabinete da Diretoria** (prédio da DEAD, 1º andar, sala 106).
- **Demais unidades organizacionais:** A coordenação ou setor responsável deve abrir um chamado no SUAP direcionado à **Coordenação de Tecnologia da Informação (CTI)**.
- **Prestador de serviço / Terceirizado:** Abrir chamado específico na Central de Serviços via URL direta: `https://suap.ifrn.edu.br/centralservicos/abrir_chamado/87/`.

#### 2. Informações obrigatórias da pessoa física
- **Nome completo:** conforme certidão, CPF ou passaporte.
- **Nome social:** caso aplicável (identidade de gênero da pessoa trans; não confundir com apelido).
- **Nome usual:** como deseja ser chamada institucionalmente (qualquer combinação de prenome e sobrenome).
- **CPF:** para brasileiros natos, naturalizados ou equiparados.
- **Nº do Passaporte:** obrigatório para estrangeiros sem CPF.
- **Sexo:** conforme registro civil.
- **Nacionalidade:** brasileiro nato, naturalizado, equiparado ou estrangeiro.
- **E-mail pessoal:** deve ser um e-mail externo (Gmail, Outlook, etc.) para recuperação de conta; **não** utilizar e-mails `@ifrn.edu.br`.
- **Papel:** Bolsista, tutor, colaborador externo ou terceirizado.

#### 3. Padrão exigido para a foto 3×4 digital
Para que o crachá e cadastro no SUAP sejam validados:
- Tirar com celular na posição vertical, enquadramento do busto para cima (rosto ocupando de 70% a 80% da área).
- Fundo totalmente branco e liso (parede), mantendo distância do fundo para não criar sombras.
- Rosto centralizado, olhando para a câmera, com expressão neutra e boca fechada.
- **Proibido:** óculos, chapéus, bonés, máscaras ou qualquer adereço que encubra o rosto.

#### 4. Dados obrigatórios do vínculo institucional
- **Função:** código ou denominação conforme a Classificação Brasileira de Ocupações (CBO/MTE).
- **Período de vigência:** data de início e fim. *Nota prática:* caso não haja data final determinada no contrato, preencher convencionalmente com `30/06` ou `31/12` do ano corrente.
- **Instituição de vínculo/origem:** ex.: FUNCERN, empresa terceirizada licitada ou fundação de apoio, informando a Razão Social e **CNPJ**.
- **Setor de exercício:** sigla do setor de lotação (ex.: DEAD, ASTE, ASIT, CME, DIAC, UAB).

#### 5. Biometria e primeiro acesso
1. **Cadastro biométrico:** O usuário deve comparecer à CTI (DEAD/ZL, 3º andar, salas 302 ou 303) para coletar a digital. Se já teve cadastro biométrico anterior (ex.: ex-aluno), a digital pode ser reaproveitada.
2. **Definição de senha:** Não existe senha padrão inicial. O usuário deve acessar a tela inicial do SUAP, clicar em **"Esqueceu sua senha?"**, informar o CPF e seguir as instruções enviadas para o e-mail pessoal cadastrado.

---

### B. Liberação de Usuários Externos para Uso de Laboratórios

#### 1. Para cursos, minicursos ou oficinas de extensão
1. Cadastrar a atividade como projeto ou curso de extensão no SUAP com antecedência.
2. O coordenador do projeto vincula os participantes diretamente à ação.
3. Os participantes passam a ter matrícula de aluno de extensão, gerando credenciais automáticas para acesso aos computadores dos laboratórios.

#### 2. Para empréstimo de laboratório (sem projeto institucional formal)
1. Solicitar que os usuários criem conta prévia no sistema do IFRN via autenticação **GOV.BR**.
2. Registrar formalmente chamado ou processo no SUAP contendo:
   - Responsável institucional e setor demandante.
   - Período exato e laboratórios reservados.
   - Lista nominal dos participantes (Nome, CPF e instituição de origem).
   - Termo de responsabilidade pelo patrimônio e equipamentos.

## Quando escalar

- Falhas no envio do token de redefinição de senha para o e-mail externo do usuário: suporte CTI.
- Divergências de cadastro de CBO ou duplicidade de CPF/passaporte: Administrador do SUAP sistêmico (DIGPE/PROEN).
- Demora na aprovação de formulário de prestador terceirizado: fiscal de contrato ou CTI.

## Equipe responsável

- **Gabinete da DEAD / Chefias de Setor:** validação de solicitações de vínculos.
- **CTI / COTIC:** execução do cadastro no SUAP, coleta biométrica e liberação de acessos aos sistemas e redes.

## Links oficiais

- [Abertura de Chamado para Prestador de Serviço (Tipo 87)](https://suap.ifrn.edu.br/centralservicos/abrir_chamado/87/)
- [Login e Recuperação de Senha no SUAP](https://suap.ifrn.edu.br/)
- [Portal GOV.BR](https://www.gov.br/)

## Nível de confiabilidade

Confirmado / Prático.

## Notas adicionais

- Contas com data limite expirada têm bloqueio automático no SUAP; as chefias devem solicitar prorrogação com pelo menos 5 dias úteis de antecedência.
- O reaproveitamento de biometria de ex-alunos agiliza o processo, mas a foto deve ser renovada se tiver mais de 2 anos.
