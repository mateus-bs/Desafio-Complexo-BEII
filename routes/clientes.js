// routes/clientes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const cacheMiddleware = require('../middlewares/cacheMiddleware');

router.get('/', jwtMiddleware, cacheMiddleware, clienteController.getAllClientes);
router.post('/', jwtMiddleware, clienteController.createCliente);
router.put('/:id', jwtMiddleware, clienteController.updateCliente);
router.delete('/:id', jwtMiddleware, clienteController.deleteCliente);

module.exports = router;
