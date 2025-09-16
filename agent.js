// agent.js
import { Agent } from '@livekit/agents';
import { TeamsBot } from './index.js';
import { config } from './config.js'; // Importa tus credenciales

const agent = new Agent({
  bot: new TeamsBot(),
  // Configuración de LiveKit
  serverUrl: process.env.LIVEKIT_SERVER_URL || 'wss://your-livekit-server.com',
  token: process.env.LIVEKIT_TOKEN || 'your-livekit-token',
  // Credenciales de Azure Bot
  appId: config.MicrosoftAppId,
  appPassword: config.MicrosoftAppPassword
});

agent.start().then(() => {
  console.log('🤖 Agente LiveKit en funcionamiento');
  console.log('📡 Conectado a Teams con App ID:', config.MicrosoftAppId);
});
