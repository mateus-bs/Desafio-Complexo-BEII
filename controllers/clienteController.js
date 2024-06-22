// controllers/clienteController.js
const db = require('../configs/db');
const NodeCache = require('node-cache');
const cache = new NodeCache();

exports.getAllClientes = (req, res, next) => {
  const cachedClientes = cache.get('clientes');
  if (cachedClientes) {
    console.log('Cache hit for /clientes');
    return res.json(cachedClientes);
  } else {
    console.log('Cache miss for /clientes');
    db.query('SELECT * FROM clientes', (err, results) => {
      if (err) return next(err);
      cache.set('clientes', results);
      res.json(results);
    });
  }
};

exports.createCliente = (req, res, next) => {
  const { nome, sobrenome, email, idade } = req.body;
  db.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade], (err, results) => {
    if (err) return next(err);
    cache.del('clientes');
    res.status(201).json({ id: results.insertId, nome, sobrenome, email, idade });
  });
};

exports.updateCliente = (req, res, next) => {
  const { id } = req.params;
  const { nome, sobrenome, email, idade } = req.body;
  db.query('UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?', [nome, sobrenome, email, idade, id], (err, results) => {
    if (err) return next(err);
    cache.del('clientes');
    res.json({ id, nome, sobrenome, email, idade });
  });
};

exports.deleteCliente = (req, res, next) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
    if (err) return next(err);
    cache.del('clientes');
    res.status(204).send();
  });
};
