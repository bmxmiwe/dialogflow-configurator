const dialogflow = require('dialogflow');
const EntityTypesCreator = require('./EntityTypesCreator');

class EntityCreator {

    async createEntityValue(projectId, entityTypeId, entityValue, synonyms) {
        // Instantiates clients
        const entityTypesClient = new dialogflow.v2.EntityTypesClient();
        // The path to the agent the created entity belongs to.
        const agentPath = entityTypesClient.entityTypePath(projectId, entityTypeId);

        const entity = {
            value: entityValue,
            synonyms: synonyms,
        };

        const createEntitiesRequest = {
            parent: agentPath,
            entities: [entity],
        };

        const [response] = await entityTypesClient.batchCreateEntities(
            createEntitiesRequest
        );
        console.log('Created entity type:');
        console.log(response);
        // [END dialogflow_create_entity]
    }

    addValuesToEntity(entityName, values) {

        const entityClient = new dialogflow.v2.EntityTypesClient({
            // optional auth parameters.
        });
        const intentsClient = new dialogflow.v2.IntentsClient({
            // optional auth parameters.
        });

        const formattedParent = intentsClient.projectAgentPath('remotedialogflow');

        const entityType = {
            displayName: entityName,
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
                var n = response.name.lastIndexOf('/');
                var UUID = response.name.substring(n + 1);
                values.forEach(value => {
                    this.createEntityValue('remotedialogflow', UUID, value.value, value.synonyms);
                });
            })
            .catch(err => {
                console.error(err);
            });
    }
}
module.exports = EntityCreator;
