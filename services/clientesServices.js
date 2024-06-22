const db = require('../configs/db');

function getAllClientes() {
  return db.query('SELECT * FROM clientes');
}

function addCliente(nome, sobrenome, email, idade) {
  return db.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade]);
}

function deleteCliente(id) {
  return db.query('DELETE FROM clientes WHERE id = ?', [id]);
}

module.exports = {
  getAllClientes,
  addCliente,
  deleteCliente
  // Outras funções exportadas aqui, se necessário
};
