const dialogflow = require('dialogflow');

class EntityTypesCreator {

    createEntityType(entityTypeName) {

        const intentsClient = new dialogflow.v2.IntentsClient({
        });

        const entityClient = new dialogflow.v2.EntityTypesClient({
        });

        const formattedParent = intentsClient.projectAgentPath('remotedialogflow');

        const entityType = {
            displayName: entityTypeName,
            kind: "KIND_MAP"
        };
        const request = {
            parent: formattedParent,
            entityType: entityType,
        };
        entityClient.createEntityType(request)
            .then(responses => {
                const response = responses[0];
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });
    }
}

module.exports = EntityTypesCreator;
