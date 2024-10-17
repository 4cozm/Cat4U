import dotenv from 'dotenv';
import discord from 'discord.js';
import { GatewayIntentBits } from 'discord.js';

dotenv.config();

const client = new discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('ready', () => {
  console.log(`서버 온라인 ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
  try {
    if (msg.author.bot) return;
    console.log(`메세지: ${msg.content}`);
    //여기 아래에 필터링 할 단어나 조건을 작성하면 됩니다
  } catch (error) {
    console.error({ 에러: error.message });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
