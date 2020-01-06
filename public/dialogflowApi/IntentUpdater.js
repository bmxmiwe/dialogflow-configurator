const dialogflow = require('dialogflow');

class IntentUpdater {

    updateDefaultIntent(defaultResponse) {

        const client = new dialogflow.v2.IntentsClient({
            // optional auth parameters.
        });
        const formattedParent = client.projectAgentPath('remotedialogflow');

        client.listIntents({parent: formattedParent})
            .then(responses => {
                const resources = responses[0];
                for (const resource of resources) {
                    if (resource.displayName === 'Default Welcome Intent') {
                        this.updateIntent(resource, defaultResponse);
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    updateIntent(intent, defaultResponse) {

        const responseText = {
            text: [defaultResponse],
        };

        const responseIntent = {
            text: responseText,
        };

        const trainingPhrases = [
            {
                type: 'EXAMPLE',
                parts: [{text: 'Hello'}]
            },
            {
                type: 'EXAMPLE',
                parts: [{text: 'Hi'}]
            },
            {
                type: 'EXAMPLE',
                parts: [{text: 'Good morning'}]
            }
        ];

        intent.messages = [responseIntent];
        intent.trainingPhrases = trainingPhrases;

        const client = new dialogflow.v2.IntentsClient({
            // optional auth parameters.
        });

        const request = {
            intent: intent,
            languageCode: 'en',
        };

        client.updateIntent(request)
            .then(responses => {
                const response = responses[0];
            })
            .catch(err => {
                console.error(err);
            });
    }
}

module.exports = IntentUpdater;
