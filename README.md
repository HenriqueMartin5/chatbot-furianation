
# 🧠 FURIANATION BOT – Chatbot para fãs do time de CS da FURIA

Este projeto foi desenvolvido para o **Challenge #1 - Experiência Conversacional** do processo seletivo da **FURIA Tech**. O objetivo é proporcionar uma experiência de conversa entre fãs e o time de CS da FURIA através de um chatbot funcional e envolvente.

---

## 💬 O que é o FURIANATION Bot?

O **FURIANATION** é um chatbot que simula o comportamento de um super fã da FURIA Esports, com foco exclusivo no time de **Counter-Strike**. Ele conversa com os usuários, responde perguntas frequentes sobre o time, faz recomendações de vídeos, envia frases motivacionais no estilo FURIA e muito mais.

---

## 🚀 Funcionalidades

- 🤝 Saudação personalizada e perguntas de introdução ao fã
- 🔫 Informações sobre a história do time de CS da FURIA, jogadores, títulos e curiosidades
- 📺 Recomendação de vídeos no YouTube (ex: highlights, entrevistas, bastidores)
- 📅 Informações sobre a agenda de jogos (campeonatos, horários)
- 🛍️ Sugestão de produtos oficiais (camisas, bonés, mousepads)
- 🧠 Quiz e curiosidades sobre o time
- 🔥 Frases motivacionais no estilo “torcida FURIOSA”
- ❓ Atendimento a perguntas comuns (“quem joga hoje?”, “onde seguir os jogadores?”)
- 💬 Coleta de feedback dos fãs

---

## 🧱 Tecnologias utilizadas

- `Node.js`
- [`venom-bot`](https://github.com/orkestral/venom) – para integração com o WhatsApp Web
- `OpenAI API (ChatGPT)` – para respostas inteligentes baseadas no contexto da conversa
- `axios` – para requisições HTTP
- Estrutura de armazenamento temporário em memória

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/furianation-bot.git
cd furianation-bot
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie o arquivo `.env` com sua chave da OpenAI

```env
OPENAI_API_KEY=sk-...
```

Ou edite diretamente a variável `Authorization` no arquivo `app.js` com sua chave da OpenAI.

### 4. Inicie o bot

```bash
node app.js ou npm start
```

> Isso abrirá uma instância do WhatsApp Web no navegador. Escaneie o QR code com seu WhatsApp e comece a usar o bot!

---

## 🧪 Como funciona

1. O fã envia uma mensagem no WhatsApp;
2. O bot responde com 4 perguntas iniciais de cadastro;
3. Após isso, o usuário pode conversar livremente com o bot;
4. A IA responde com base em um prompt customizado e no histórico da conversa, sempre com foco no time de **CS da FURIA**;

---

## 📹 Demonstração

> [📺 Clique aqui para ver o vídeo de demonstração no YouTube](https://youtube.com/shorts/DOnLqzp4OsY?feature=share)

---

## 📄 Arquivos principais

- `app.js` – Lógica principal do chatbot
- `src/database.js` – Simulação de banco de dados temporário (em memória)
- `getTrainingPrompt()` – Função que gera o contexto da IA com base no ano atual

---

## 💡 Sugestões de melhoria futura

- Integração com API do YouTube para vídeos automáticos
- Salvamento do histórico e perfil do fã em banco real (MongoDB, Firebase)

---

## 🧾 Licença

Este projeto é open-source e está sob a licença MIT.

---

## 🙌 Créditos

Desenvolvido por Henrique Augusto para o processo seletivo da **FURIA Tech 2025** 🖤🔥  
