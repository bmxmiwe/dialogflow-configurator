const dialogflow = require('dialogflow');

class IntentCreator {

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
                prompts: [],
                displayName: 'type',
                value: '$type',
                defaultValue: '',
                entityTypeDisplayName: '@pizzaType',
                mandatory: false,
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
        const displayName = 'pizzaType';
        this.createIntent(trainingPhrases, parameters, responseText, displayName);
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
