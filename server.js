// server.js - Servidor compatible con Azure App Service
const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Importar el bot (convertir a CommonJS)
const { TeamsBot } = require('./index-commonjs.js');

// Crear adapter con credenciales de Azure
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId || 'c6cffe81-36fc-4a5a-9f66-a3c7fe3a229a',
    appPassword: process.env.MicrosoftAppPassword || 'E0d8Q~HXISPuptPld3EtX_fF7w32lL2CRNwtfbX8'
});

// Manejo de errores
adapter.onTurnError = async (context, error) => {
    console.error(`[onTurnError]: ${error}`);
    await context.sendActivity('Oops. Something went wrong!');
};

// Crear servidor
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`\n🤖 Bot ejecutándose en puerto ${PORT}`);
    console.log(`📡 Endpoint: http://localhost:${PORT}/api/messages`);
    console.log(`🔑 App ID: ${process.env.MicrosoftAppId || 'c6cffe81-36fc-4a5a-9f66-a3c7fe3a229a'}`);
});

// Endpoint para mensajes de Teams
server.post('/api/messages', async (req, res) => {
    console.log('📨 Mensaje recibido de Teams');
    adapter.processActivity(req, res, async (context) => {
        const bot = new TeamsBot();
        await bot.run(context);
    });
});

// Endpoint de salud para Azure
server.get('/health', async (req, res) => {
    res.json({ 
        status: 'OK', 
        bot: 'Teams Bot funcionando',
        timestamp: new Date().toISOString()
    });
});

// Endpoint raíz
server.get('/', async (req, res) => {
    res.json({ 
        message: 'Teams Bot está funcionando',
        endpoints: {
            messages: '/api/messages',
            health: '/health'
        }
    });
});
