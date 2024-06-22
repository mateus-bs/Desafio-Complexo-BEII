const db = require('../configs/db');

function getAllProdutos() {
  return db.query('SELECT * FROM produtos');
}

function addProduto(nome, descricao, preco, data_atualizado) {
  return db.query('INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)', [nome, descricao, preco, data_atualizado]);
}

function deleteProduto(id) {
  return db.query('DELETE FROM produtos WHERE id = ?', [id]);
}

module.exports = {
  getAllProdutos,
  addProduto,
  deleteProduto
  // Outras funções exportadas aqui, se necessário
};
