// controllers/clienteController.js
const cache = require('../configs/cache');
const db = require('../configs/db');
const logger = require('../configs/logger'); // Você pode configurar um logger usando a biblioteca winston ou qualquer outra

exports.getAllClientes = (req, res, next) => {
  const cachedData = cache.get('clientes');

  if (cachedData) {
    logger.info('Serving from cache');
    return res.json(cachedData);
  }

  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return next(err);
    cache.set('clientes', results);
    logger.info('Serving from database');
    res.json(results);
  });
};

// O restante das funções para POST, PUT, DELETE deve invalidar o cache
exports.addCliente = (req, res, next) => {
  const { nome, sobrenome, email, idade } = req.body;
  db.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade], (err, results) => {
    if (err) return next(err);
    cache.del('clientes'); // Invalida o cache
    res.status(201).json({ id: results.insertId, nome, sobrenome, email, idade });
  });
};

exports.updateCliente = (req, res, next) => {
  const { id } = req.params;
  const { nome, sobrenome, email, idade } = req.body;
  db.query('UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?', [nome, sobrenome, email, idade, id], (err, results) => {
    if (err) return next(err);
    cache.del('clientes'); // Invalida o cache
    res.status(200).json({ id, nome, sobrenome, email, idade });
  });
};

exports.deleteCliente = (req, res, next) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
    if (err) return next(err);
    cache.del('clientes'); // Invalida o cache
    res.status(204).send();
  });
};
