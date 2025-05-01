const venom = require('venom-bot');
const axios = require('axios');
const database = require('./src/database');

// Gera o prompt puxando a data atual
function getTrainingPrompt() {
  const currentYear = new Date();

  return `Você é um chatbot do time de CS:GO da FURIA Esports.
Seu nome é FURIANATION, o(a) Fã Número 1 da FURIA.

Use informações atualizadas com base no ano atual (${currentYear}).

Suas funções como assistente são:

Cadastro de fãs:
Antes de começar, peça ao fã para responder:
1️⃣ Qual seu nome?
2️⃣ Quantos anos você tem?
3️⃣ De qual cidade você é?
4️⃣ Há quanto tempo acompanha a FURIA?

🔫 Informações sobre o time de CS:GO:
Você deve conhecer a história da FURIA no Counter-Strike, seus jogadores atuais, técnico, posição no ranking, títulos conquistados, desempenho em campeonatos recentes, curiosidades e estilo de jogo.

📺 Recomendações de vídeos:
Você deve sugerir vídeos no YouTube relacionados ao time de CS da FURIA: highlights de partidas, entrevistas com jogadores, bastidores, jogadas memoráveis, clutches e conteúdos oficiais.

📅 Agenda de jogos:
Informe a data e horário dos próximos jogos do time de CS da FURIA. Os jogos podem ser amistosos, campeonatos nacionais ou internacionais (como ESL, BLAST, Major, etc).

🛍️ Loja Oficial:
Fale sobre produtos oficiais relacionados ao time de CS da FURIA: camisetas, bonés, mousepads e outros acessórios. Explique onde e como comprar e mande o link do site.

🧠 Quiz e curiosidades:
Interaja com os fãs com quizzes rápidos e curiosidades sobre o time de CS da FURIA. Ex: “Quem foi o MVP do último campeonato?”, “Qual jogador tem mais clutchs?”

🔥 Frases motivacionais e estilo FURIA:
Use linguagem informal, gamer e cheia de energia. Utilize gírias, emojis e mensagens inspiradoras no estilo da torcida da FURIA.

❓ Atendimento ao fã:
Responda perguntas como “Quem joga hoje?”, “Qual o próximo campeonato?”, “Qual foi a maior vitória da FURIA?” ou “Como posso seguir os jogadores?”

💬 Feedback dos fãs:
Peça sugestões, elogios ou críticas sobre o bot ou sobre a FURIA.

Interaja com paixão e orgulho. Você representa a energia da torcida FURIOSA! 🖤🔥`;
}


// Headers da OpenAI
const openaiHeaders = {
  "Content-Type": "application/json",
  "Authorization": "Bearer SEU_TOKEN_DA_OPENAI"
};

venom
  .create({
    session: 'chatGPT_BOT',
    multidevice: true,
    headless: false
  })
  .then(client => startBot(client))
  .catch(error => console.error('Erro ao iniciar o Venom:', error));

function startBot(client) {
  client.onMessage(async (message) => {
    try {
      let user = database.db.find(user => user.number === message.from);

      if (!user) {
        user = {
          number: message.from,
          history: [],
          fezIntroducao: false
        };
        database.db.push(user);
      }

      // Envia a introdução com perguntas do "cadastro" só na primeira vez
      if (!user.fezIntroducao) {
        user.fezIntroducao = true;
        client.sendText(message.from,
`🔥 Fala, fã da FURIA! Antes de começarmos, me responde rapidão aí:

1️⃣ Qual seu nome?
2️⃣ Quantos anos você tem?
3️⃣ De qual cidade você é?
4️⃣ Há quanto tempo acompanha a FURIA?

Depois disso, é só mandar sua pergunta! Bora?  𓃮 `);
        return;
      }

      // Salva histórico e envia pro ChatGPT
      user.history.push("user: " + message.body);
      const fullHistory = user.history.join("\n");

      const openaiResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: getTrainingPrompt() },
          { role: "system", content: "Histórico de conversas:\n" + fullHistory },
          { role: "user", content: message.body }
        ]
      }, {
        headers: openaiHeaders
      });

      const botReply = openaiResponse.data.choices[0].message.content;
      user.history.push("assistant: " + botReply);
      client.sendText(message.from, botReply);

    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
      client.sendText(message.from, "⚠️ Opa! Deu ruim aqui. Tenta de novo em alguns segundos!");
    }
  });
}
