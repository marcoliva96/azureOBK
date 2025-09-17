// index-commonjs.js - Bot en CommonJS para Azure
const { ActivityHandler, CardFactory } = require('botbuilder');

class TeamsBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            try {
                console.log('🤖 Bot recibió mensaje:', context.activity.text);
                
                // 1️⃣ Valores estáticos para pruebas
                const data = {
                    pregunta1: "¿Cuál es tu color favorito?",
                    respuesta1: "Azul - Representa confianza y estabilidad",
                    respuesta2: "Verde - Simboliza crecimiento y naturaleza"
                };

                console.log('📊 Datos estáticos:', data);

                // 2️⃣ Crear la Adaptive Card mejorada
                const card = {
                    type: 'AdaptiveCard',
                    body: [
                        {
                            type: 'TextBlock',
                            text: '🎨 **Pregunta de Prueba**',
                            weight: 'Bolder',
                            size: 'Large',
                            color: 'Accent'
                        },
                        {
                            type: 'TextBlock',
                            text: data.pregunta1,
                            weight: 'Bolder',
                            size: 'Medium',
                            wrap: true,
                            spacing: 'Medium'
                        },
                        {
                            type: 'Container',
                            style: 'emphasis',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: '**Opción 1:**',
                                    weight: 'Bolder',
                                    size: 'Small'
                                },
                                {
                                    type: 'TextBlock',
                                    text: data.respuesta1,
                                    wrap: true,
                                    spacing: 'Small'
                                }
                            ],
                            spacing: 'Medium'
                        },
                        {
                            type: 'Container',
                            style: 'emphasis',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: '**Opción 2:**',
                                    weight: 'Bolder',
                                    size: 'Small'
                                },
                                {
                                    type: 'TextBlock',
                                    text: data.respuesta2,
                                    wrap: true,
                                    spacing: 'Small'
                                }
                            ],
                            spacing: 'Medium'
                        }
                    ],
                    actions: [
                        {
                            type: 'Action.Submit',
                            title: '✅ Aceptar',
                            data: { action: 'accept' }
                        },
                        {
                            type: 'Action.Submit',
                            title: '🔄 Otra Pregunta',
                            data: { action: 'new_question' }
                        }
                    ],
                    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
                    version: '1.4'
                };

                // 3️⃣ Enviar la tarjeta a Teams
                await context.sendActivity({ 
                    attachments: [CardFactory.adaptiveCard(card)],
                    text: 'Aquí tienes tu tarjeta adaptativa de prueba:'
                });
                
                console.log('✅ Tarjeta enviada correctamente');
                
            } catch (error) {
                console.error('❌ Error:', error);
                await context.sendActivity('Ocurrió un error al crear la tarjeta.');
            }

            await next();
        });
    }
}

module.exports = { TeamsBot };
