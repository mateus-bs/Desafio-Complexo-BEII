// controllers/usuarioController.js
const db = require('../configs/db');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  const { usuario, senha } = req.body;
  db.query('SELECT * FROM usuarios WHERE usuario = ? AND senha = ?', [usuario, senha], (err, results) => {
    if (err) return next(err);
    if (results.length > 0) {
      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      db.query('UPDATE usuarios SET token = ? WHERE id = ?', [token, results[0].id], (err, _) => {
        if (err) return next(err);
        res.json({ token });
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};

exports.logout = (req, res, next) => {
  const { token } = req.body;
  db.query('UPDATE usuarios SET token = NULL WHERE token = ?', [token], (err, _) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Logged out successfully' });
  });
};
