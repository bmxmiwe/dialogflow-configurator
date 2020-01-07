var express = require('express');
var router = express.Router();
const EntityCreator = require('../public/dialogflowApi/EntityCreator');
const IntentCreator = require('../public/dialogflowApi/IntentCreator');
const IntentUpdater = require('../public/dialogflowApi/IntentUpdater');
const AgentCreator = require('../public/dialogflowApi/AgentCreator');

router.post('/', function(req, res, next) {

    console.log(req.body);

    var DialogflowAgentCreator = new AgentCreator();
    var Creator = new EntityCreator();
    var ICreator = new IntentCreator();
    var IUpdater = new IntentUpdater();

    DialogflowAgentCreator.createAgent();
    wait();
    var pizzasArray = req.body.pizzaNames.split(',');

    var defaultResponse = 'Hello This is '+req.body.name+' pizzeria. Our menu is: ';
    pizzasArray.forEach(function(pizza){
        defaultResponse += ' -'+pizza;
    });
    console.log(defaultResponse);
    IUpdater.updateDefaultIntent(defaultResponse);

    createEntities(req.body);
    wait();
    console.log('wait');
    createIntents(req.body);
    res.redirect('/success');

    function createEntities(form)
    {
        createSizeEntity(form.sizes);
        createPizzaEntity(pizzasArray);
        createSaucesEntity(form.sauces);
        createCrustEntity(form.dough);
    }

    function createIntents(form) {
        ICreator.createPizzaTypeIntent();
        ICreator.createPizzaDoughIntent();
        ICreator.createPizzaSizeIntent();
        ICreator.createSauceIntent();
        ICreator.createDeliveryAddressIntent();
        ICreator.createDeliveryPhoneNumberIntent(form.deliveryTime);
        ICreator.createPizzeriaAddressIntent(form.address);
        ICreator.createPizzeriaPhoneNumberIntent(form.phone);
        ICreator.createDeliveryCostIntent(form.deliveryCost);
    }

    function createSizeEntity(selectedSizes) {

        var sizes = [];
        if (selectedSizes.includes('small')) {
            sizes.push({
                value: 'small',
                synonyms: ['little', 'minor', 'tiny']
            })
        }
        if (selectedSizes.includes('medium')) {
            sizes.push({
                value: 'medium',
                synonyms: ['average', 'middle-sized', 'medium-sized']
            })
        }
        if (selectedSizes.includes('large')) {
            sizes.push({
                value: 'large',
                synonyms: ['big']
            })
        }
        Creator.addValuesToEntity('pizzaSize', sizes);
    }

    function createPizzaEntity(pizzasToMenu) {

        var pizzas = [];
        pizzasToMenu.forEach(function(pizza){
            pizzas.push({
                value: pizza,
                synonyms: [pizza]
            })
        });
        Creator.addValuesToEntity('pizzaType', pizzas);
    }

    function createSaucesEntity(selectedSauces) {

        var sauces = [];
        if (selectedSauces.includes('tomato')) {
            sauces.push({
                value: 'tomato',
                synonyms: ['tomato sauce']
            })
        }
        if (selectedSauces.includes('garlic')) {
            sauces.push({
                value: 'garlic',
                synonyms: ['garlic sauce']
            })
        }
        if (selectedSauces.includes('dill')) {
            sauces.push({
                value: 'dill',
                synonyms: ['dill sauce']
            })
        }
        Creator.addValuesToEntity('pizzaSauce', sauces);
    }

    function createCrustEntity(selectedCrusts) {

        var crust = [];
        if (selectedCrusts.includes('thin')) {
            crust.push({
                value: 'thin',
                synonyms: ['on thin', 'slim']
            })
        }
        if (selectedCrusts.includes('normal')) {
            crust.push({
                value: 'normal',
                synonyms: ['normal', 'mean']
            })
        }
        if (selectedCrusts.includes('thick')) {
            crust.push({
                value: 'thick',
                synonyms: ['big', 'large']
            })
        }
        Creator.addValuesToEntity('pizzaCrust', crust);
    }

    async function wait()
    {
        await new Promise(resolve => {setTimeout(resolve, 5000)});
    }
});

module.exports = router;
