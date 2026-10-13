---
title: "ConferênciaWeb (RNP) — Guia do Administrador e Integração Moodle (LTI)"
category: "Sistemas"
service: "ConferênciaWeb / RNP e Moodle AVA"
audience: ["TIC", "Administradores de AVA", "Suporte Nível 2/3", "Engenharia de Redes"]
tags: ["rnp", "conferenciaweb", "moodle", "lti", "administrador", "webrtc", "cafe", "presenca"]
status: "prático"
last_review: "2026-10-12"
source: "Manual do Administrador RNP (ajuda.rnp.br/conferenciaweb) e DEAD/ZL"
---

## Sintoma

- Equipe de TIC precisa integrar ou atualizar o módulo de webconferência da RNP no Moodle institucional.
- Aulas síncronas bloqueadas por políticas de firewall, portas WebRTC ou falhas na federação CAFe.
- Dúvidas sobre configuração da ferramenta externa LTI, presença automática no módulo `mod_attendance`, sincronização de calendário e setup de grupos.

## Contexto

O **ConferênciaWeb** utiliza o padrão aberto **LTI (Learning Tools Interoperability)** mantido pelo consórcio 1EdTech (antigo IMS Global). Essa arquitetura desacopla o Moodle da infraestrutura de streaming, eliminando a sobrecarga de processamento nos servidores locais da instituição:

- **Frontend:** O Moodle consome a ferramenta via iframe ou redirecionamento seguro com assinatura OAuth.
- **Backend:** A infraestrutura de processamento WebRTC, gravação e transcodificação de vídeos reside nos clusters distribuídos da RNP.
- **Autenticação:** Integração federada via **CAFe (Comunidade Acadêmica Federada)** com protocolo SAML 2.0 / Shibboleth.

---

## Procedimento

### 1. Configuração da Ferramenta Externa LTI no Moodle

Para disponibilizar a atividade "Sala de aula - ConfWeb" em todos os cursos do campus ou da instituição:

1. Acesse o Moodle com perfil de **Administrador do Site**.
2. Navegue até **Administração do site > Plugins > Módulos de atividades > Ferramenta externa > Gerenciar ferramentas**.
3. Clique em **Configurar uma ferramenta manualmente** e preencha:
   - **Nome da ferramenta:** `Sala de aula - ConfWeb (RNP)`.
   - **URL da ferramenta:** URL do endpoint LTI fornecido pela RNP (ex.: `https://conferenciaweb.rnp.br/lti/launch`).
   - **Versão do LTI:** `LTI 1.0/1.1` ou `LTI Advantage (1.3)` conforme credenciamento institucional.
   - **Chave do consumidor (Consumer Key):** Chave corporativa fornecida pela RNP para a instituição.
   - **Segredo compartilhado (Shared Secret):** Token seguro associado à chave.
4. Na aba **Privacidade**:
   - *Compartilhar o nome do inicializador com a ferramenta:* **Sempre**.
   - *Compartilhar o e-mail do inicializador com a ferramenta:* **Sempre**.
   - *Aceitar notas da ferramenta:* Não aplicável (ou Sim, se utilizar presença com nota).
5. Na aba **Vários**:
   - *Exibição do contêiner:* Selecione **Nova janela** ou **Janela existente** (recomenda-se *Nova janela* para melhor ergonomia de compartilhamento de tela).
6. Clique em **Salvar mudanças**. A ferramenta passará a figurar na lista de atividades para todos os professores.

---

### 2. Mapeamento de papéis (Roles) entre Moodle e ConferênciaWeb

O conector LTI traduz os perfis do Moodle da seguinte forma:

| Papel no Moodle | Papel no ConferênciaWeb | Privilégios Concedidos |
| :--- | :--- | :--- |
| `Editing Teacher` (Professor com edição) | **Moderador** | Pleno controle: gravação, enquetes, travas de sala, salas de apoio. |
| `Teacher` (Professor sem edição / Tutor) | **Moderador** | Moderação pedagógica e apresentação. |
| `Manager` (Coordenador de Curso) | **Moderador** | Administração da sessão. |
| `Student` (Estudante) | **Espectador (Viewer)** | Participante comum: chat, microfone/câmera (se autorizado). |
| `Guest` (Visitante anônimo) | **Espectador** | Entrada condicionada à aprovação na sala de espera. |

---

### 3. Integração de presença automática no Moodle (`mod_attendance`)

A RNP disponibiliza rotina de sincronização automatizada de frequência acadêmica:

1. No curso do Moodle, o professor cria uma atividade padrão de **Presença** (`mod_attendance`).
2. Quando a sessão síncrona do ConferênciaWeb é finalizada pelo moderador, a plataforma da RNP dispara um evento via **Webhook** assinado para a aplicação LTI.
3. Um worker em background processa a lista de participantes autenticados, calcula o percentual de tempo em que cada aluno permaneceu conectado na sala e atualiza o status na atividade de presença:
   - Alunos com permanência superior ao limiar configurado (ex.: 75% da aula) recebem status **Presente**.
   - Alunos abaixo do limiar ou ausentes recebem status **Ausente**.

---

### 4. Setup de grupos e salas separadas

Em cursos com turmas unificadas ou múltiplos polos:
- Nas configurações da atividade LTI, ative o modo **Grupos separados**.
- O ConferênciaWeb provisionará instâncias de salas virtuais isoladas para cada grupo cadastrado no Moodle, permitindo que professores de turmas distintas realizem encontros no mesmo horário sem interferência mútua.

---

### 5. Requisitos de Infraestrutura de Rede e Firewall (WebRTC)

Para assegurar estabilidade nas estações institucionais e laboratórios, as seguintes regras de rede devem ser liberadas nos firewalls de borda (Fortigate, pfSense, iptables):

| Protocolo | Portas de Destino | Finalidade | Origem / Destino |
| :--- | :--- | :--- | :--- |
| **TCP** | `443` | Sinalização HTTPS, API REST e WebSockets seguros (WSS) | Rede local ➡️ Clusters RNP (`*.rnp.br`) |
| **UDP** | `16384` a `32768` | Fluxos de áudio e vídeo WebRTC (RTP/SRTP) | Rede local ➡️ Clusters de mídia RNP |
| **UDP/TCP** | `3478`, `5349` | Travessia de NAT (Protocolos STUN e TURN da RNP) | Rede local ➡️ Servidores TURN RNP |

**Métricas recomendadas para QoS:**
- Latência de ida e volta (RTT): `< 150 ms`.
- Jitter de pacotes: `< 30 ms`.
- Perda de pacotes (Packet loss): `< 1.5%`.

---

## Quando escalar

- Erro de assinatura LTI (*Invalid signature / OAuth error*): verificar sincronização de relógio (NTP) do servidor Moodle com os servidores oficiais da internet antes de reemitir as chaves.
- Alunos autenticados recebendo erro de atributo SAML na CAFe: verificar o release de atributos no IdP Shibboleth do IFRN (garantir envio de `eduPersonPrincipalName` e `mail`).
- Instabilidade generalizada de servidores de mídia da RNP: abrir chamado emergencial no Service Desk da RNP (`atendimento@rnp.br` ou 0800 722 0216).

## Equipe responsável

- **Administração de AVA (DEAD/ZL):** configuração do plugin LTI, templates de curso e suporte aos docentes.
- **DINRE / Engenharia de Redes:** liberação de portas WebRTC, qualidade de serviço (QoS) e IdP CAFe/Shibboleth.
- **Service Desk da RNP:** cluster central BigBlueButton e servidores de transcodificação de gravações.

## Links oficiais

- [Manual do Administrador do ConferênciaWeb - RNP](https://ajuda.rnp.br/conferenciaweb/manuais-de-uso-do-servico/manual-do-administrador)
- [Integração Moodle via LTI (Documentação Oficial)](https://ajuda.rnp.br/conferenciaweb/manuais-de-uso-do-servico/manual-do-administrador/integracao-moodle-via-lti)
- [Setup de Presença Automática com mod_attendance](https://ajuda.rnp.br/conferenciaweb/manuais-de-uso-do-servico/manual-do-administrador/integracao-de-presenca-automatica-no-moodle)
- [Painel de Status dos Serviços da RNP](https://status.rnp.br/)

## Nível de confiabilidade

- **Confirmado:** documentação oficial de engenharia da RNP e homologação pela equipe de sistemas da DEAD/ZL.

## Notas adicionais

- Sempre realize testes de integração LTI em ambiente de homologação (*staging*) antes de atualizar as chaves de produção no Moodle.
- A presença automática depende estritamente de que o estudante acesse a reunião logado em sua conta Moodle/CAFe; conexões anônimas não conseguem ser correlacionadas à caderneta discente.
