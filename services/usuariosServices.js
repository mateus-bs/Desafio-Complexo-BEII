const db = require('../configs/db');

function getAllUsuarios() {
  return db.query('SELECT * FROM usuarios');
}

function addUsuario(usuario, senha, token) {
  return db.query('INSERT INTO usuarios (usuario, senha, token) VALUES (?, ?, ?)', [usuario, senha, token]);
}

function deleteUsuario(id) {
  return db.query('DELETE FROM usuarios WHERE id = ?', [id]);
}

module.exports = {
  getAllUsuarios,
  addUsuario,
  deleteUsuario
  // Outras funções exportadas aqui, se necessário
};
