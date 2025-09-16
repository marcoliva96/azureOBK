# Teams Bot Framework

Bot para Microsoft Teams que se conecta con Azure Function y muestra tarjetas adaptativas.

## 🚀 Funcionalidades

- ✅ Conecta con Azure Function
- ✅ Muestra tarjetas adaptativas en Teams
- ✅ Maneja respuestas en español
- ✅ Configurado para Azure App Service

## 📁 Estructura del Proyecto

```
├── index.js          # Lógica del bot (TeamsBot)
├── azure-bot.js      # Servidor para Azure App Service
├── simple-bot.js     # Servidor para desarrollo local
├── agent.js          # Agente LiveKit
├── config.js         # Credenciales de Azure Bot
├── package.json      # Dependencias y scripts
├── web.config        # Configuración para Azure
└── .deployment       # Configuración de despliegue
```

## 🔧 Configuración

### Variables de Entorno

```bash
MicrosoftAppId=c6cffe81-36fc-4a5a-9f66-a3c7fe3a229a
MicrosoftAppPassword=E0d8Q~HXISPuptPld3EtX_fF7w32lL2CRNwtfbX8
```

### Azure Function

El bot hace POST a:
```
https://fninteraccioteamsobliku20250915174232.azurewebsites.net/api/Function1
```

Con header: `selectedApp: A`

## 🚀 Despliegue

### Desarrollo Local
```bash
npm install
npm run dev
```

### Azure App Service
```bash
npm install
npm start
```

## 📱 Uso en Teams

1. Configura el bot en Azure Bot resource
2. Añade el endpoint: `https://tu-app.azurewebsites.net/api/messages`
3. Añade el bot a Teams usando el App ID

## 🔗 Endpoints

- `GET /health` - Estado del bot
- `POST /api/messages` - Mensajes de Teams
- `GET /` - Información del bot
