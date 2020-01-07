var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('success', {title: 'Success page'});
});

module.exports = router;
