// controllers/produtoController.js
const db = require('../configs/db');

exports.getAllProdutos = (req, res, next) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

exports.createProduto = (req, res, next) => {
  const { nome, descricao, preco, data_atualizado } = req.body;
  db.query('INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)', [nome, descricao, preco, data_atualizado], (err, results) => {
    if (err) return next(err);
    res.status(201).json({ id: results.insertId, nome, descricao, preco, data_atualizado });
  });
};

exports.updateProduto = (req, res, next) => {
  const { id } = req.params;
  const { nome, descricao, preco, data_atualizado } = req.body;
  db.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?', [nome, descricao, preco, data_atualizado, id], (err, results) => {
    if (err) return next(err);
    res.json({ id, nome, descricao, preco, data_atualizado });
  });
};

exports.deleteProduto = (req, res, next) => {
  const { id } = req.params;
  db.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
    if (err) return next(err);
    res.status(204).send();
  });
};
