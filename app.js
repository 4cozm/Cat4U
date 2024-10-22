import dotenv from 'dotenv';
import discord from 'discord.js';
import { GatewayIntentBits } from 'discord.js';
import downTimeTracker from './src/downTimeTimer.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.WEB_PORT, () => {
  console.log('웹 서버 구동 중');
});

dotenv.config();

const client = new discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('ready', () => {
  console.log(`서버 온라인 ${client.user.tag}!`);
  downTimeTracker();
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
