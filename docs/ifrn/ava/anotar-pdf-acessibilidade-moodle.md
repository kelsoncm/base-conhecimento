---
title: "Anotação em PDF e padrões de acessibilidade no Moodle"
category: "AVA"
service: "Moodle AVA"
audience: ["Professores", "Mediadores", "TIC", "NAPNE"]
tags: ["moodle", "ava", "anotar-pdf", "acessibilidade", "emag", "w3c", "napne", "ghostscript"]
status: "prático"
last_review: "2026-10-12"
source: "Central de Ajuda DEAD/ZL, e-MAG e W3C/WAI"
---

## Sintoma

- Docente precisa corrigir e comentar trabalhos acadêmicos de estudantes diretamente pelo navegador, sem necessidade de baixar e reenviar arquivos manualmente.
- Necessidade de assegurar que os ambientes virtuais e materiais didáticos atendam aos padrões de **acessibilidade digital** para pessoas com deficiência (PCD).
- Dúvidas sobre configuração do plugin de acessibilidade (`CTRL + U`) e requisitos do conversor de documentos no Moodle.

## Contexto

A plataforma Moodle do IFRN integra recursos avançados de avaliação e inclusão:
1. **Feedback "Anotar PDF" (*Annotate PDF*):** Converte automaticamente arquivos submetidos por estudantes (DOCX, ODT, RTF, PDF) em documentos visualizáveis no navegador, permitindo aposição de notas adesivas, desenhos vetoriais, carimbos de validação e comentários inline.
2. **Acessibilidade Digital (e-MAG e WCAG 2.1):** Em conformidade com a legislação federal e as diretrizes do Modelo de Acessibilidade em Governo Eletrônico (e-MAG), o AVA e o Portal EaD incorporam ferramentas de apoio a pessoas com baixa visão, daltonismo, dislexia e limitações motoras.

---

## Procedimento

### A. Ativação e Uso do Feedback "Anotar PDF"

#### 1. Configurando na Atividade Tarefa
O feedback do tipo Anotar PDF deve ser ativado nas configurações da atividade:
1. Na sala de aula virtual, clique em **Ativar edição** e adicione ou edite uma **Tarefa**.
2. Na seção **Tipos de feedback**, marque obrigatoriamente a opção:
   - `[X] Anotação em PDF` (ou *Anotar PDF*).
   - Opcionalmente, marque *Comentários de feedback* para observações gerais.
3. Salve e disponibilize a atividade. *Atenção:* O recurso deve ser habilitado preferencialmente antes do início dos envios discentes.

#### 2. Corrigindo Trabalhos com a Interface de Anotação
1. Ao acessar a tarefa enviada pelo aluno, clique em **Ver todos os envios > Nota**.
2. A tela de avaliação exibirá o documento convertido no painel central.
3. Utilize a barra superior de ferramentas:
   - **Comentários:** insira caixas de texto com cores personalizáveis.
   - **Formas e Linhas:** sublinhe, risque ou destaque parágrafos do texto.
   - **Carimbos (Selos):** adicione carimbos rápidos de *Certo* (✔), *Errado* (✘) ou *Atenção* (!).
4. No painel lateral direito, preencha a nota e o parecer avaliativo.
5. Clique em **Salvar mudanças**. O aluno terá acesso imediato ao PDF anotado na seção de feedback do seu perfil.

---

### B. Padrões e Recursos de Acessibilidade no AVA

#### 1. Menu de Acessibilidade do Moodle e Portal EaD
Usuários com necessidades especiais de visualização podem personalizar a interface a qualquer momento:
- **Atalho de teclado:** Pressione `CTRL + U` (ou clique no ícone flutuante de acessibilidade no canto da tela).
- **Recursos disponíveis:**
  - **Alto Contraste:** inverte paletas de cores para facilitar a leitura em ambientes com reflexo ou para usuários com fotossensibilidade e baixa acuidade visual.
  - **Texto Maior:** amplia a tipografia proporcionalmente sem quebrar o layout das caixas e menus.
  - **Espaçamento de Texto:** aumenta o espaçamento entrelinhas e entre caracteres para mitigar fadiga visual.
  - **Fonte Amigável para Dislexia:** aplica a tipografia *OpenDyslexic*, projetada com peso inferior nas letras para reduzir trocas e rotações involuntárias de caracteres.
  - **Links Destacados:** sublinha e colore hyperlinks com alto contraste.

#### 2. Boas Práticas Pedagógicas na Estruturação das Salas
Para garantir conformidade com o e-MAG e compatibilidade com leitores de tela (NVDA, JAWS, TalkBack):
- **Imagens e Figuras:** Toda imagem inserida no editor de texto do Moodle deve conter o campo *Texto alternativo* preenchido com descrição objetiva do conteúdo visual, ou marcado como *Imagem decorativa*.
- **Estrutura Semântica:** Organize os textos utilizando os estilos de cabeçalho (`Cabeçalho Grande / H2`, `Cabeçalho Médio / H3`) em vez de apenas aumentar o tamanho da fonte manualmente ou aplicar negrito.
- **Tabelas de Dados:** Utilize cabeçalhos de coluna identificados para que o leitor de tela interprete a relação de linhas e dados.
- **Arquivos em Vídeo:** Priorize vídeos com legendas sincronizadas (hospedados no Eduplay ou YouTube com transcrição ativada).

---

## Quando escalar

- Tarefas enviadas que exibem mensagem *"Falha ao gerar pré-visualização do PDF"*: acionar a equipe de TIC/AVA para verificar se o serviço de conversão (`unoconv`, LibreOffice listener ou Ghostscript) está em execução no servidor.
- Dúvidas sobre adaptação de atividades avaliativas para alunos com deficiência visual/auditiva: acionar o **NAPNE (Núcleo de Apoio às Pessoas com Necessidades Específicas)** do campus.

## Equipe responsável

- **Docente e Mediador:** configuração das tarefas e produção de conteúdos semanticamente acessíveis.
- **Equipe de TIC / AVA (DEAD/ZL):** sustentação dos binários de renderização de PDF no servidor e templates acessíveis.
- **NAPNE:** consultoria e adaptação especializada de materiais didáticos.

## Links oficiais

- [Modelo de Acessibilidade em Governo Eletrônico (e-MAG)](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/e-mag)
- [Diretrizes de Acessibilidade para Conteúdo Web (W3C / WCAG 2.1)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Central de Ajuda DEAD/ZL - Moodle](https://ajuda.ead.ifrn.edu.br/)

## Nível de confiabilidade

- **Confirmado:** documentação técnica padrão da suíte Moodle e diretrizes do e-MAG/Governo Federal.

## Notas adicionais

- O recurso Anotar PDF aceita envios em formato de imagem (PNG, JPG) e documentos de texto (DOCX, ODT), convertendo-os automaticamente para o formato padronizado de anotação.
- O IFRN incentiva o uso de formatos abertos (ODT/PDF) para evitar problemas de compatibilidade e garantir perenidade aos registros acadêmicos.
