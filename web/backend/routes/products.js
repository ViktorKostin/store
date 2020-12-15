var express = require('express');
var router = express.Router();

var { products } = require('@controllers');
const { auth } = require("@express/middlewares");

router.get('/', (req, res) => {
	products.all().then(x => res.json(x));
});

router.get('/page/:pageNumber/perPage/:perPage', (req, res) => {
	products.pagination(req).then(x => res.json(x));
});

router.get('/count', (req, res) => {
	products.count().then(x => res.json(x))
})

router.get('/:productId', (req, res) => {
	products.findOne(req).then(x => res.json(x));
});

router.post('/', [auth.verifyToken, auth.isAdmin], (req, res) => {
	products.new(req).then(x => res.json(x));
});

router.delete('/delete/:productId', [auth.verifyToken, auth.isAdmin], (req, res) => {
  products.delete(req).then(x => res.json(x));
});

module.exports = router;
