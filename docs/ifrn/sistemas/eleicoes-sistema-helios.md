---
title: "Eleições eletrônicas no IFRN com Helios Voting"
category: "Sistemas"
service: "Helios Voting"
audience: ["Comissões Eleitorais", "TIC", "Suporte", "Comunidade Acadêmica"]
tags: ["helios", "eleicoes", "votacao", "criptografia", "auditoria", "suap"]
status: "prático"
last_review: "2026-10-12"
source: "Central de Ajuda DEAD/ZL e documentação técnica do Helios Voting"
---

## Sintoma

- Realização de eleições institucionais para Reitoria, Direção-Geral de Campi, Colegiados, Grêmios e Representações Estudantis/Docentes.
- Dúvidas de eleitores sobre segurança do voto, autenticação e conferência de comprovantes.
- Procedimentos operacionais para comissões eleitorais na criação da eleição, geração de chaves e apuração de resultados.

## Contexto

O **Helios Voting** é uma plataforma de votação eletrônica auditável baseada em criptografia homomórfica. Diferente de sistemas convencionais de enquetes ou formulários, o Helios protege o segredo do voto diretamente no navegador do usuário antes de transmiti-lo pela rede:

1. **Voto cifrado no cliente:** A cédula é criptografada no dispositivo do votante utilizando a chave pública da eleição.
2. **Rastreabilidade sem identificação:** O sistema emite um código de rastreamento (*Smart Ballot Tracker* / hash SHA-256), que permite verificar se o voto está presente na urna sem revelar em quem o eleitor votou.
3. **Criptografia compartilhada (Shamir):** A eleição pode possuir múltiplos curadores (*trustees*). A urna só pode ser decifrada e apurada se todos (ou o quórum mínimo) de curadores apresentarem suas frações de chave privada.

---

## Procedimento

### A. Para o Eleitor (Como Votar)

1. **Acesso e Autenticação:**
   - Acesse o link oficial da eleição informado pela comissão eleitoral (ex.: `https://votacao.ifrn.edu.br/helios/e/<NOME_DA_ELEICAO>/vote`).
   - Autentique-se utilizando as credenciais institucionais (**IFRN-Id / SUAP**) ou a senha temporária enviada por e-mail pela comissão.
2. **Cabine de Votação (Cédula):**
   - Na cabine virtual, escolha os candidatos ou opções de cada cargo.
   - Revise o resumo de suas escolhas na tela de confirmação.
3. **Criptografia e Cédula:**
   - Ao avançar, o navegador processa o voto e gera o **Rastreador de Voto** (código hash alfanumérico).
   - O eleitor pode optar por:
     - **Auditar a cédula:** verificar matematicamente que o voto cifrado corresponde à escolha (o voto é descartado e o eleitor vota novamente).
     - **Depositar o voto na urna:** enviar a cédula cifrada para o servidor.
4. **Comprovante de Votação:**
   - Após o depósito, o sistema exibe a mensagem de confirmação e o código de rastreamento definitivo.
   - Salve ou imprima o comprovante para conferência futura no boletim da urna.

---

### B. Para a Comissão Eleitoral (Administração da Eleição)

#### 1. Criação e Configuração da Eleição
1. No painel de administração do Helios, crie a eleição informando título, descrição, data/hora de abertura e encerramento.
2. Cadastre as questões da cédula (cargos, opções de resposta, limites mínimos e máximos de marcação, votos em branco/nulos).
3. Importe a lista de eleitores aptos (arquivo CSV com identificador, e-mail e nome completo, extraído do SUAP).

#### 2. Cerimônia das Chaves (Curadores / Trustees)
1. Cadastre os membros da comissão como curadores da eleição.
2. Cada curador acessa sua interface pessoal, gera seu par de chaves criptográficas no navegador e faz o download de sua chave privada de segurança.
3. **Congelar a Eleição:** Após todos os curadores registrarem suas chaves públicas, a comissão "congela" a cédula. A partir desse instante, nenhuma questão ou regra pode ser modificada.

#### 3. Apuração e Descriptografia
1. Ao encerrar o prazo de votação, a comissão clica em **Encerrar Urna**.
2. O sistema executa o embaralhamento criptográfico (*mixnet*), desvinculando definitivamente a ordem dos votos cifrados dos nomes dos eleitores.
3. Cada curador faz o upload de sua chave privada para fornecer sua parte da decodificação.
4. O Helios combina as chaves, totaliza os votos matematicamente e gera o **Boletim de Urna**.
5. Publique a lista de rastreadores computados para que qualquer eleitor confira a inclusão de seu voto na ata oficial.

---

## Quando escalar

- Eleitor apto que não consta na lista de votantes: verificar base cadastral discente/funcional no SUAP e solicitar inclusão à Comissão Eleitoral.
- Falhas na autenticação LDAP/SUAP: acionar a COTIC/TIC imediatamente para validar o serviço de diretório.
- Perda de chave privada por curador: caso a eleição não tenha sido configurada com quórum flexível (*threshold*), a perda de uma chave impede a apuração e exige anulação do pleito.

## Equipe responsável

- **Comissão Eleitoral:** gestão dos pleitos, credenciamento de eleitores e homologação de atas.
- **TIC / Coordenação de Redes e Infraestrutura:** sustentação do servidor Helios, certificados SSL e integração de login com o SUAP.

## Links oficiais

- [Sistema Helios Voting - IFRN](https://votacao.ifrn.edu.br/)
- [Documentação Oficial do Projeto Helios Voting](https://heliosvoting.org/)

## Nível de confiabilidade

- **Confirmado:** documentado por portarias e resoluções do CONSUP/IFRN e validado pelas comissões eleitorais.

## Notas adicionais

- O voto no Helios é sigiloso por padrão matemático; nem administradores do sistema nem desenvolvedores com acesso direto ao banco de dados conseguem correlacionar a cédula aberta ao usuário.
- Se um eleitor votar mais de uma vez durante o período aberto da eleição, apenas o **último voto depositado** é computado na urna.
