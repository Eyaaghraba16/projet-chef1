const express = require('express');
const router = express.Router();
const pool = require('../db');

// ==========================
// 🔹 DEPARTEMENTS
// ==========================
router.get('/departements', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM departements');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors du chargement des départements' });
  }
});

router.post('/departements', async (req, res) => {
  try {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ message: 'Nom requis' });

    const [result] = await pool.query('INSERT INTO departements (nom) VALUES (?)', [nom]);
    res.json({ id: result.insertId, nom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du département' });
  }
});

// ==========================
// 🔹 ETUDIANTS
// ==========================
router.get('/etudiants', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, d.nom AS departement
      FROM etudiants e
      LEFT JOIN departements d ON e.departement_id = d.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors du chargement des étudiants' });
  }
});

router.post('/etudiants', async (req, res) => {
  try {
    const { nom, prenom, email, departement_id } = req.body;
    if (!nom || !prenom || !email || !departement_id)
      return res.status(400).json({ message: 'Tous les champs sont requis' });

    const [result] = await pool.query(
      'INSERT INTO etudiants (nom, prenom, email, departement_id) VALUES (?, ?, ?, ?)',
      [nom, prenom, email, departement_id]
    );
    res.json({ id: result.insertId, nom, prenom, email, departement_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'étudiant' });
  }
});

module.exports = router;
