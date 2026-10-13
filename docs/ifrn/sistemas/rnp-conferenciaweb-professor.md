---
title: "ConferênciaWeb (RNP) — Guia do Professor e Moderador"
category: "Sistemas"
service: "ConferênciaWeb / RNP"
audience: ["Professores", "Moderadores", "Suporte", "Coordenações de Curso"]
tags: ["rnp", "conferenciaweb", "moodle", "lti", "docente", "moderador", "aulas sincronas"]
status: "prático"
last_review: "2026-10-12"
source: "Central de Ajuda da RNP (ajuda.rnp.br/conferenciaweb) e DEAD/ZL"
---

## Sintoma

- Docente precisa planejar, agendar e ministrar aulas síncronas integradas ao Moodle ou pelo portal do ConferênciaWeb.
- Necessidade de moderar a sala de aula virtual (silenciar microfones, travar recursos, controlar sala de espera).
- Dúvidas sobre upload de slides, compartilhamento de tela, gravação da sessão, divisão em salas de apoio (grupos) e transmissão ao vivo (streaming).

## Contexto

Como moderador no **ConferênciaWeb**, o docente possui privilégios administrativos completos sobre a sessão síncrona. A ferramenta é construída sobre o ecossistema BigBlueButton customizado pela RNP, com foco em didática ativa e integração nativa com o **Moodle Acadêmico** via protocolo **LTI (Learning Tools Interoperability)**.

---

## Procedimento

### 1. Criando a sala de aula síncrona no Moodle (LTI)

A integração LTI permite que o professor crie salas diretamente no curso sem precisar sair do Moodle ou compartilhar links externos:

1. Acesse o seu curso no Moodle Acadêmico e clique em **Ativar edição** (ícone de engrenagem ou botão superior).
2. No tópico/semana desejado, clique em **Adicionar uma atividade ou recurso**.
3. Selecione a atividade **"Sala de aula - ConfWeb"**.
4. Configure as opções básicas:
   - **Nome da atividade:** ex.: *Aula Síncrona - Semana 03: Introdução às Redes*.
   - **Mensagem de boas-vindas:** mensagem exibida no chat ao entrar.
   - **Disponibilidade:** datas e horários de abertura e encerramento da sala.
5. Em **Configurações da Sessão**, ajuste os bloqueios padrão:
   - Desabilitar microfone de participantes ao entrar (*Mute on start*).
   - Exigir aprovação do moderador antes de entrar (Sala de espera).
   - Bloquear webcams ou chat privado entre alunos se necessário.
6. Clique em **Salvar e voltar ao curso**.

---

### 2. Agendamento avulso via Portal do ConferênciaWeb

Para bancas examinadoras, reuniões de departamento ou eventos fora de turmas regulares do Moodle:

1. Acesse `https://conferenciaweb.rnp.br/` e faça login via federação **CAFe** com suas credenciais do SUAP.
2. Na página inicial, você possui uma **Sala Pessoal** permanente com link fixo.
3. Para criar reuniões específicas, clique em **Agendamentos > Nova Reunião**:
   - Defina título, data/hora e senha de acesso (opcional).
   - Copie o link gerado e encaminhe para os convidados.

---

### 3. Moderação e controle da sala durante a aula

No painel esquerdo da sala, acima da lista de participantes, clique no ícone de engrenagem para gerenciar a turma:

- **Silenciar todos os usuários:** Desativa o áudio de todos os participantes.
- **Silenciar todos os usuários exceto o apresentador:** Mantém o áudio do professor e fecha microfones abertos acidentalmente.
- **Travar espectadores:** Permite restringir em lote:
  - Compartilhamento de webcam dos alunos.
  - Envio de mensagens privadas entre participantes.
  - Edição de notas compartilhadas.
- **Promover participantes:** Clique no nome de um aluno ou mediador pedagógico para:
  - *Tornar apresentador:* transfere o controle de troca de slides e compartilhamento de tela.
  - *Tornar moderador:* concede plenos poderes de gerenciamento de sala.

---

### 4. Apresentações, lousa e compartilhamento de tela

- **Carregar Apresentação (Slides/PDF):**
  - Clique no botão de ações **(+)** no canto inferior esquerdo e selecione **Carregar uma apresentação**.
  - Arraste seu arquivo em PDF, PPTX ou ODP. *Dica:* O formato PDF renderiza com fidelidade absoluta de fontes e diagramação.
  - Ative a opção *Permitir download da apresentação* se desejar que os alunos baixem o arquivo diretamente da sala.
- **Quadro Branco (Lousa Interativa):**
  - Na barra de ferramentas à direita do slide, escolha ferramentas de lápis, texto, formas geométricas e marca-texto.
  - Ative o **Modo multiusuário** para permitir que todos os alunos desenhem e interajam conjuntamente no slide.
- **Compartilhar Tela:**
  - Clique no ícone de **Monitor** na barra inferior. Escolha entre Tela Inteira, Janela de Programa ou Aba do Navegador (habilite *Compartilhar áudio da aba* para vídeos do YouTube).

---

### 5. Metodologias ativas e interação

Pelo menu de ações **(+)**, o docente pode disparar em tempo real:

1. **Enquetes Instantâneas:** O sistema detecta automaticamente opções escritas nos slides (ex.: A, B, C, D ou Sim/Não) e sugere botões de votação rápida. Ao encerrar, clique em *Publicar resultados da enquete* para projetar o gráfico na lousa.
2. **Quiz com IA:** Criação rápida de questões avaliativas geradas pelo assistente inteligente da plataforma.
3. **Nuvem de Palavras:** Os alunos enviam palavras pelo chat/popup e uma nuvem semântica dinâmica é gerada no centro da tela.
4. **Sortear Participante:** Sorteio randômico entre os estudantes presentes na sala para arguições orais.
5. **Salas de Apoio (Breakout Rooms):**
   - Acesse o menu de engrenagem e selecione **Criar salas de apoio**.
   - Defina o número de salas (ex.: 4 grupos), a duração em minutos e atribua os alunos automaticamente ou por arrasto manual.
   - O professor pode transitar livremente entre as salas de apoio para tirar dúvidas e encerrá-las quando desejar.

---

### 6. Gravação e transmissão ao vivo (Streaming)

- **Gravação de Aula:**
  - Clique no botão **Iniciar Gravação** no topo da tela. A gravação pode ser pausada e retomada a qualquer momento.
  - Ao término da reunião (Menu de três pontos > *Encerrar reunião*), a RNP processará o vídeo.
  - A gravação fica automaticamente listada na atividade LTI do Moodle para os alunos assistirem, incluindo capítulos e transcrição automatizada.
- **Transmissão Externa (Streaming RTMP):**
  - No menu de ações **(+)**, selecione **Transmissão (Streaming)**.
  - Insira a URL do servidor RTMP e a chave de transmissão gerada no YouTube Studio ou Facebook Live para retransmitir a aula em tempo real.

---

## Quando escalar

- Gravação não foi processada após 24 horas: abrir chamado para a equipe da DEAD/ZL solicitando checagem junto à RNP.
- Atividade LTI retornando erro de assinatura OAuth ou credenciais inválidas: suporte de TIC para revalidação do segredo LTI do Moodle.
- Conexão instável durante transmissão de evento de grande porte: contatar a equipe técnica da DEAD para uso dos estúdios com link dedicado.

## Equipe responsável

- **Docente / Moderador:** condução das aulas e gestão de turmas.
- **Equipe de Suporte AVA (DEAD/ZL):** suporte pedagógico e técnico de configuração de salas.
- **TIC do Campus:** infraestrutura de rede institucional e computadores dos gabinetes.

## Links oficiais

- [Central de Ajuda da RNP - Manual do Usuário](https://ajuda.rnp.br/conferenciaweb/manuais-de-uso-do-servico/manual-do-usuario)
- [LTI - Aula Moodle no ConferênciaWeb](https://ajuda.rnp.br/conferenciaweb/manuais-de-uso-do-servico/manual-do-usuario/lti-aula-moodle)
- [Boas Práticas de Moderação](https://ajuda.rnp.br/conferenciaweb/manuais-de-uso-do-servico/manual-do-usuario/boas-praticas)

## Nível de confiabilidade

- **Confirmado:** documentação oficial da RNP e práticas consolidadas da DEAD/ZL.

## Notas adicionais

- Sempre encerre a sessão formalmente clicando em **Opções (três pontos) > Encerrar reunião**. Se o professor apenas fechar a aba do navegador, a sala permanecerá aberta na infraestrutura até o timeout de inatividade.
- A gravação no ConferênciaWeb não grava webcams ou microfones que estiverem mutados ou desligados, respeitando a privacidade dos participantes.
