// index.js
import { ActivityHandler, CardFactory } from 'botbuilder';
import fetch from 'node-fetch'; // npm install node-fetch@3

export class TeamsBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            try {
                // 1️⃣ Hacer POST a la Azure Function
                const response = await fetch(
                    'https://fninteraccioteamsobliku20250915174232.azurewebsites.net/api/Function1',
                    {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'selectedApp': 'A'
                        }
                    }
                );

                const data = await response.json(); // { pregunta1, respuesta1, respuesta2 }

                // 2️⃣ Crear la Adaptive Card
                const card = {
                    type: 'AdaptiveCard',
                    body: [
                        {
                            type: 'TextBlock',
                            text: data.pregunta1,
                            weight: 'Bolder',
                            size: 'Medium'
                        },
                        {
                            type: 'TextBlock',
                            text: data.respuesta1,
                            wrap: true
                        },
                        {
                            type: 'TextBlock',
                            text: data.respuesta2,
                            wrap: true
                        }
                    ],
                    actions: [
                        {
                            type: 'Action.Submit',
                            title: 'Aceptar'
                        }
                    ],
                    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
                    version: '1.4'
                };

                // 3️⃣ Enviar la tarjeta a Teams
                await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
            } catch (error) {
                console.error(error);
                await context.sendActivity('Ocurrió un error al obtener la tarjeta.');
            }

            await next();
        });
    }
}
