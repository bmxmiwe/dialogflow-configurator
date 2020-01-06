var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    var Creator = new EntityCreator();
    var ICreator = new IntentCreator();
    var ETCreator = new EntityTypesCreator();
    var IUpdater = new IntentUpdater();



    var defaultResponse = "Hello This is pepe pizzeria. Our menu is: 1. Margherita 2. Capriciosa 3.Napoletana 4.Marinara";
    IUpdater.updateDefaultIntent(defaultResponse);

    createEntities();
    wait();
    console.log('wait');
    createIntents();
    res.render('index', {title: 'Express'});

    async function wait()
    {
        await new Promise(resolve => {setTimeout(resolve, 5000)});
    }

    function createEntities()
    {

        var sizes = [
            {
                value: 'small',
                synonyms: ['little', 'minor', 'tiny']
            },
            {
                value: 'medium',
                synonyms: ['average', 'middle-sized', 'medium-sized']
            },
            {
                value: 'big',
                synonyms: ['large']
            }
        ];
        Creator.addValuesToEntity('pizzaSize', sizes);

        var pizzas = [
            {
                value: 'margherita',
                synonyms: ['margerita']
            },
            {
                value: 'capriciosa',
                synonyms: ['capri']
            },
            {
                value: 'napoletana',
                synonyms: ['napoli']
            },
            {
                value: 'marinara',
                synonyms: ['marine']
            }
        ];
        Creator.addValuesToEntity('pizzaType', pizzas);
        var sauces = [
            {
                value: 'tomato',
                synonyms: ['tomato sauce']
            },
            {
                value: 'garlic',
                synonyms: ['garlic sauce']
            },
            {
                value: 'dill',
                synonyms: ['dill sauce']
            },
        ];
        Creator.addValuesToEntity('pizzaSauce', sauces);
        var crust = [
            {
                value: 'thin',
                synonyms: ['on thin', 'slim']
            },
            {
                value: 'average',
                synonyms: ['normal', 'mean']
            },
            {
                value: 'thick',
                synonyms: ['big', 'large']
            },
        ];
        Creator.addValuesToEntity('pizzaCrust', crust);
    }

    function createIntents() {
        ICreator.createPizzaTypeIntent();
    }
});

module.exports = router;
