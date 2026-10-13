---
title: "Política de armazenamento em nuvem no IFRN (Google, Microsoft 365 e RNP)"
category: "Sistemas"
service: "Google Workspace, Microsoft 365 e Nuvem RNP"
audience: ["TIC", "Servidores", "Docentes", "Discentes"]
tags: ["armazenamento", "google-workspace", "onedrive", "microsoft-365", "rnp", "nuvem", "cgd"]
status: "prático"
last_review: "2026-10-12"
source: "Resolução 2/2022-CGD/IFRN e Central de Ajuda DEAD/ZL"
---

## Sintoma

- Usuários recebendo alertas de cota de armazenamento quase cheia no Google Drive ou OneDrive.
- Dúvidas sobre limites máximos de gigabytes permitidos por perfil institucional (docente, TAE, discente).
- Incidentes ou perdas pontuais de arquivos hospedados na infraestrutura em nuvem (ex.: nuvem da RNP associada ao Moodle).

## Contexto

Historicamente, o IFRN oferecia contas do Google Workspace for Education com armazenamento ilimitado. Com a alteração global nas políticas comerciais da Google e da Microsoft para o setor educacional em 2022, o **Comitê de Governança Digital (CGD) do IFRN** instituiu a **Resolução nº 2/2022-CGD**, estabelecendo a política institucional de uso racional do armazenamento de dados corporativos e acadêmicos.

Estrutura de contas institucionais:
- **Discentes:** domínio `@escolar.ifrn.edu.br`.
- **Servidores e Colaboradores:** domínio `@ifrn.edu.br` e `@academico.ifrn.edu.br`.
- **Serviços Acadêmicos e AVA:** hospedagem distribuída entre datacenters locais e a infraestrutura em nuvem da **RNP (Rede Nacional de Ensino e Pesquisa)**.

---

## Procedimento

### 1. Limites de cota por categoria (Resolução 2/2022-CGD)

| Perfil / Vínculo | Domínio do E-mail | Cota Google Workspace | Cota Microsoft 365 |
| :--- | :--- | :--- | :--- |
| **Estudantes regulares** | `@escolar.ifrn.edu.br` | Até 15 GB (compartilhado Drive/Gmail/Fotos) | Conforme licença A1 ativa |
| **Servidores ativos (Docentes/TAEs)** | `@ifrn.edu.br` / `@academico` | Até 100 GB | Até 100 GB (OneDrive corporativo) |
| **Setores / Caixas Departamentais** | `@ifrn.edu.br` | Até 50 GB | Sob demanda justificada |
| **Egressos / Ex-alunos** | `@escolar.ifrn.edu.br` | Conta desativada conforme calendário acadêmico | Não aplicável |

---

### 2. Higienização e liberação de espaço no Google Drive

1. Acesse o gerenciador de armazenamento: `https://drive.google.com/drive/quota`.
2. O Google listará os arquivos ordenados pelo maior tamanho.
3. Exclua arquivos desnecessários:
   - Gravações antigas de reuniões do Google Meet (faça download para backup local ou arquive em mídias físicas).
   - Backups pesados de sistemas, instaladores (`.iso`, `.exe`) e vídeos em alta resolução.
   - Esvazie a **Lixeira** do Google Drive e do Gmail (arquivos na lixeira continuam consumindo a cota de armazenamento até serem permanentemente excluídos).
4. Utilize a ferramenta **Google Takeout** (`https://takeout.google.com/`) caso precise exportar todos os seus dados para migração pessoal.

---

### 3. Migração para o Microsoft 365 / OneDrive Institucional

Como o IFRN disponibiliza licenças corporativas do Microsoft 365 para servidores:

1. Acesse `https://portal.office.com/` com suas credenciais institucionais.
2. Utilize o **OneDrive for Business** para armazenamento primário de documentos de trabalho administrativos e projetos de pesquisa.
3. Não utilize contas institucionais para armazenar arquivos pessoais (fotos de família, mídias recreativas, backups de celulares particulares).

---

### 4. Salvaguarda e contingência em nuvem RNP (AVA e Moodle)

Em caso de incidentes reportados pela RNP na infraestrutura em nuvem que afetem anexos e materiais didáticos do Moodle:

1. A equipe técnica da DEAD/ZL extrai os logs do banco de dados e mapeia os arquivos corrompidos ou inacessíveis.
2. Uma lista de arquivos afetados (nome, e-mail do autor, código da sala e link) é consolidada e enviada aos professores e coordenadores.
3. **Reenvio de arquivos perdidos:**
   - O professor acessa a respectiva sala de aula virtual no Moodle.
   - Ativa a edição e faz o reenvio (*upload*) do arquivo em PDF/documento original.
   - Para cursos autoinstrucionais ou sem professor ativo, a equipe da DEAD/ZL restaura o conteúdo a partir dos repositórios de backup locais da instituição.

---

## Quando escalar

- Usuário atingiu 100% da cota e está impedido de receber e-mails institucionais urgentes: suporte CTI/DINRE para concessão temporária de prazo de limpeza.
- Necessidade de cota expandida para projetos de pesquisa institucionais (Big Data, dados brutos laboratoriais): solicitar via processo administrativo à DINRE/Reitoria com justificativa técnica.
- Erro de sincronização ou perda de dados em massa na nuvem: acionar imediatamente a central de atendimento da RNP e a equipe de infraestrutura da DEAD.

## Equipe responsável

- **Comitê de Governança Digital (CGD):** formulação e revisão de políticas e limites de cotas.
- **DINRE (Diretoria de Infraestrutura de Redes e Serviços):** administração dos tenants Google Workspace e Microsoft 365.
- **CTI dos Campi / Suporte Local:** auxílio aos usuários em ferramentas de exportação e expurgo.

## Links oficiais

- [Gerenciamento de Armazenamento - Google Drive](https://drive.google.com/drive/quota)
- [Portal Microsoft 365](https://portal.office.com/)
- [Google Takeout](https://takeout.google.com/)

## Nível de confiabilidade

- **Confirmado:** embasado na Resolução nº 2/2022-CGD/IFRN e diretrizes oficiais de nuvem da RNP.

## Notas adicionais

- Contas de alunos egressos que colaram grau entram em ciclo de expurgo automático após aviso prévio; os concluintes devem fazer backup de seus trabalhos acadêmicos antes do término do vínculo formal.
- O uso de contas institucionais para pirataria, armazenamento de mídias ilegais ou conteúdos não acadêmicos constitui infração disciplinar passível de bloqueio sumário da conta.
