const dialogflow = require('dialogflow');

class IntentCreator {

    createDeliveryPhoneNumberIntent(deliveryTime) {
        var trainingPhrases = [{
            type: 'EXAMPLE',
            parts: [
                {text: 'My number is '},
                {text: '123123123', entityType: '@sys.phone-number', alias: 'phone'},
            ],
        },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: '58 342 23 12', entityType: '@sys.phone-number', alias: 'phone'},
                ],
            }
        ];
        const responseText = {
            text: ['Ok, the order has been accepted. Thank you. Estimated delivery time is ' + deliveryTime],
        };
        const parameters = [{
            prompts: [],
            displayName: 'phone',
            value: '$phone',
            defaultValue: '',
            entityTypeDisplayName: '@sys.phone-number',
            mandatory: false,
            isList: false
        }];
        this.createIntent(trainingPhrases, parameters, responseText, 'delivery phone number');
    }

    createDeliveryAddressIntent() {
        var trainingPhrases = [{
            type: 'EXAMPLE',
            parts: [
                {text: 'My address is'},
                {text: 'Skłodowskiej 25/34 Gdańsk', entityType: '@sys.address', alias: 'address'},
            ],
        },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'Beniowskiego 60/62 m 10 Toruń', entityType: '@sys.address', alias: 'address'},
                ],
            }
        ];
        const responseText = {
            text: ['Ok, give us your phone number'],
        };
        const parameters = [{
                 prompts: [],
                 displayName: 'address',
                 value: '$address',
                 defaultValue: '',
                 entityTypeDisplayName: '@sys.location',
                 mandatory: false,
                 isList: false
        }];
        this.createIntent(trainingPhrases, parameters, responseText, 'delivery address');
    }

    createPizzaTypeIntent() {
        var trainingPhrases = [{
            type: 'EXAMPLE',
            parts: [
                {text: 'I would like '},
                {text: 'margherita', entityType: '@pizzaType', alias: 'type'},
                {text: ' pizza'},
            ],
        },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'I want to order '},
                    {text: 'marinara', entityType: '@pizzaType', alias: 'type'},
                ],
            }
        ];
        const responseText = {
            text: ['Ok, What should be the thickness of the pizza dough?'],
        };
        const parameters = [
            {
                prompts: ['Choose correct pizza'],
                displayName: 'type',
                value: '$type',
                defaultValue: '',
                entityTypeDisplayName: '@pizzaType',
                mandatory: true,
                isList: false
            },
        ];
        // {
        //     prompts: [],
        //     displayName: 'testEnt2',
        //     value: '$testEnt2',
        //     defaultValue: '',
        //     entityTypeDisplayName: '@testEntity2',
        //     mandatory: false,
        //     isList: false
        // },
        // {
        //     prompts: [],
        //     displayName: 'address',
        //     value: '$address',
        //     defaultValue: '',
        //     entityTypeDisplayName: '@sys.location',
        //     mandatory: false,
        //     isList: false
        // }
        const displayName = 'pizza type';
        this.createIntent(trainingPhrases, parameters, responseText, displayName);
    }

    createSauceIntent() {
        var trainingPhrases = [
            {
            type: 'EXAMPLE',
            parts: [
                {text: 'please '},
                {text: 'tomato', entityType: '@pizzaSauce', alias: 'sauce'},
                {text: ' sauce'}
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'I want '},
                    {text: 'garlic', entityType: '@pizzaSauce', alias: 'sauce'},
                    {text: ' sauce'}
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'garlic', entityType: '@pizzaSauce', alias: 'sauce'},
                    {text: ' sauce'}
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'tomato', entityType: '@pizzaSauce', alias: 'sauce'},
                ],
            },
        ];
        const responseText = {
            text: ['Ok, Please enter delivery address'],
        };
        const parameters = [
            {
                prompts: [],
                displayName: 'sauce',
                value: '$sauce',
                defaultValue: '',
                entityTypeDisplayName: '@pizzaSauce',
                mandatory: false,
                isList: false
            },
        ];
        this.createIntent(trainingPhrases, parameters, responseText, 'pizza sauce');
    }

    createPizzaSizeIntent() {
        var trainingPhrases = [{
            type: 'EXAMPLE',
            parts: [
                {text: 'I would like '},
                {text: 'small', entityType: '@pizzaSize', alias: 'size'},
            ],
        },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'I want '},
                    {text: 'medium', entityType: '@pizzaSize', alias: 'size'},
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'large', entityType: '@pizzaSize', alias: 'size'},
                ],
            }
        ];
        const responseText = {
            text: ['Ok, What sauce to pizza?'],
        };
        const parameters = [
            {
                prompts: [],
                displayName: 'size',
                value: '$size',
                defaultValue: '',
                entityTypeDisplayName: '@pizzaSize',
                mandatory: false,
                isList: false
            },
        ];
        this.createIntent(trainingPhrases, parameters, responseText, 'pizza size');
    }

    createPizzaDoughIntent() {
        var trainingPhrases = [{
            type: 'EXAMPLE',
            parts: [
                {text: 'I would like '},
                {text: 'thick', entityType: '@pizzaCrust', alias: 'dough'},
            ],
        },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'I want '},
                    {text: 'thin', entityType: '@pizzaCrust', alias: 'dough'},
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'thin', entityType: '@pizzaCrust', alias: 'dough'},
                ],
            }
        ];
        const responseText = {
            text: ['Ok, What should be pizza size?'],
        };
        const parameters = [
            {
                prompts: [],
                displayName: 'dough',
                value: '$dough',
                defaultValue: '',
                entityTypeDisplayName: '@pizzaCrust',
                mandatory: false,
                isList: false
            },
        ];
        this.createIntent(trainingPhrases, parameters, responseText, 'pizza dough');
    }

    createPizzeriaAddressIntent(address) {
        var trainingPhrases = [
            {
            type: 'EXAMPLE',
            parts: [
                {text: 'What is the address of the pizzeria'},
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'Where is the pizzeria'},
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'Give me the address of the pizzeria'},
                ],
            }

        ];

        const responseText = {
            text: ['Pizzeria address is ' + address],
        };

        this.createIntent(trainingPhrases, [], responseText, 'pizzeria address');
    }

    createPizzeriaPhoneNumberIntent(phoneNumber) {
        var trainingPhrases = [
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'Give me phone number'},
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'What is phone number?'},
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'Give me the phone number to pizzeria'},
                ],
            },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'What is the phone number to pizzeria'},
                ],
            }

        ];
        const responseText = {
            text: ['Pizzeria phone number is ' + phoneNumber],
        };
        this.createIntent(trainingPhrases, [], responseText, 'pizzeria phone');
    }

    createDeliveryCostIntent(deliveryCost) {
        var trainingPhrases = [{
            type: 'EXAMPLE',
            parts: [
                {text: 'What is the delivery cost'},
            ],
        },
            {
                type: 'EXAMPLE',
                parts: [
                    {text: 'give me the delivery cost'},
                ],
            }
        ];
        const responseText = {
            text: ['Delivery cost is ' + deliveryCost],
        };
        this.createIntent(trainingPhrases, [], responseText, 'delivery cost');
    }

    createIntent(trainingPhrases, parameters, responseText, displayName) {

        const intentsClient = new dialogflow.v2.IntentsClient({
            // optional auth parameters.
        });

        const formattedParent = intentsClient.projectAgentPath('remotedialogflow');

        const responseIntent = {
            text: responseText,
        };

        const intent = {
            displayName: displayName,
            trainingPhrases: trainingPhrases,
            messages: [responseIntent],
            parameters: parameters
        };
        const request = {
            parent: formattedParent,
            intent: intent,
        };

        intentsClient.createIntent(request)
            .then(responses => {
                const response = responses[0];
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });
    }
}

module.exports = IntentCreator;
