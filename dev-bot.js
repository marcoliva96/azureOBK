// dev-bot.js - Bot para desarrollo local sin autenticación
import restify from 'restify';
import { BotFrameworkAdapter } from 'botbuilder';
import { TeamsBot } from './index.js';

// Crear adapter SIN autenticación para desarrollo local
const adapter = new BotFrameworkAdapter({
    // Sin credenciales para desarrollo local
});

// Manejo de errores
adapter.onTurnError = async (context, error) => {
    console.error(`[onTurnError]: ${error}`);
    await context.sendActivity('Oops. Something went wrong!');
};

// Crear servidor
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const PORT = process.env.PORT || 3979;

server.listen(PORT, () => {
    console.log(`\n🤖 Bot de desarrollo ejecutándose en http://localhost:${PORT}`);
    console.log(`📡 Endpoint: http://localhost:${PORT}/api/messages`);
    console.log(`🔓 Sin autenticación (modo desarrollo)`);
});

// Endpoint para mensajes del emulator
server.post('/api/messages', async (req, res) => {
    console.log('📨 Mensaje recibido del emulator');
    console.log('📊 Datos:', JSON.stringify(req.body, null, 2));
    
    adapter.processActivity(req, res, async (context) => {
        const bot = new TeamsBot();
        await bot.run(context);
    });
});

// Endpoint de salud
server.get('/health', async (req, res) => {
    res.json({ 
        status: 'OK', 
        bot: 'Bot de desarrollo funcionando',
        timestamp: new Date().toISOString(),
        auth: 'disabled'
    });
});

// Endpoint raíz
server.get('/', async (req, res) => {
    res.json({ 
        message: 'Bot de desarrollo está funcionando',
        endpoints: {
            messages: '/api/messages',
            health: '/health'
        },
        note: 'Sin autenticación para desarrollo local'
    });
});
