const dialogflow = require('dialogflow');

class EntityCreator {

     createAgent() {
        const client = new dialogflow.v2.AgentsClient({
            // optional auth parameters.
        });

        const agent = {
          parent : 'projects/remotedialogflow',
          displayName : 'testFromApi',
          defaultLanguageCode: 'en'
        };
        client.setAgent({agent: agent})
            .then(responses => {
              const response = responses[0];
              console.log(response);
            })
            .catch(err => {
              console.error(err);
            });
    }
}

module.exports = EntityCreator;
