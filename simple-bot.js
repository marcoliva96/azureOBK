// simple-bot.js - Bot simple para Teams sin LiveKit
import restify from 'restify';
import { BotFrameworkAdapter } from 'botbuilder';
import { TeamsBot } from './index.js';
import { config } from './config.js';

// Crear adapter con credenciales de Azure
const adapter = new BotFrameworkAdapter({
    appId: config.MicrosoftAppId,
    appPassword: config.MicrosoftAppPassword
});

// Manejo de errores
adapter.onTurnError = async (context, error) => {
    console.error(`[onTurnError]: ${error}`);
    await context.sendActivity('Oops. Something went wrong!');
};

// Crear servidor
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const PORT = process.env.PORT || 3978;

server.listen(PORT, () => {
    console.log(`\n🤖 Bot ejecutándose en http://localhost:${PORT}`);
    console.log(`📡 Endpoint: http://localhost:${PORT}/api/messages`);
    console.log(`🔑 App ID: ${config.MicrosoftAppId}`);
});

// Endpoint para mensajes de Teams
server.post('/api/messages', async (req, res) => {
    console.log('📨 Mensaje recibido de Teams');
    adapter.processActivity(req, res, async (context) => {
        const bot = new TeamsBot();
        await bot.run(context);
    });
});

// Endpoint de salud
server.get('/health', async (req, res) => {
    res.json({ status: 'OK', bot: 'Teams Bot funcionando' });
});
