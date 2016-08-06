var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	return res.sendFile('index.html', { root: __dirname + '/../../public' });
});

router.get('/template/:name', function(req, res, next) {
	return res.sendFile(req.params.name + '.html', { root: __dirname + '/../../public' });
});

module.exports = router;