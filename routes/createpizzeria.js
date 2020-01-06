const dialogflow = require('dialogflow');
var express = require('express');
var router = express.Router();
const EntityCreator = require('../public/dialogflowApi/EntityCreator');
const IntentCreator = require('../public/dialogflowApi/IntentCreator');
const EntityTypesCreator = require('../public/dialogflowApi/EntityTypesCreator');
const IntentUpdater = require('../public/dialogflowApi/IntentUpdater');

router.post('/', function(req, res, next) {

    console.log(req.body);

    var Creator = new EntityCreator();
    var ICreator = new IntentCreator();
    var ETCreator = new EntityTypesCreator();
    var IUpdater = new IntentUpdater();

    var pizzasArray = req.body.pizzaNames.split(',');

    var defaultResponse = 'Hello This is '+req.body.name+' pizzeria. Our menu is: ';
    pizzasArray.forEach(function(pizza){
        defaultResponse += ' -'+pizza;
    });
    console.log(defaultResponse);
    IUpdater.updateDefaultIntent(defaultResponse);

    //createEntities();
    //wait();
    //console.log('wait');
    //createIntents();

    res.send('respond with a resource');
});

module.exports = router;
