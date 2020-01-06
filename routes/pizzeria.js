var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('pizzeria', {title: 'Pizzeria'});
});

module.exports = router;
