const express = require('express');
const router = express.Router();
const pool = require('../db'); // ✅ on importe la connexion MySQL

// 🧑‍🎓 GET emploi du temps pour un étudiant (par groupe)
router.get('/student/:id', async (req, res) => {
  const idGroupe = req.params.id;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM emploi_temps WHERE id_groupe = ?',
      [idGroupe]
    );
    res.json(rows);
  } catch (err) {
    console.error('Erreur GET /student/:id =>', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ➕ POST ajouter une séance
router.post('/', async (req, res) => {
  const { date, heure_debut, heure_fin, id_salle, id_enseignant, id_groupe, matiere } = req.body;

  try {
    // Vérification de conflit
    const [conflits] = await pool.query(
      `SELECT * FROM emploi_temps 
       WHERE date = ? 
       AND heure_debut < ? 
       AND heure_fin > ? 
       AND (id_salle = ? OR id_enseignant = ? OR id_groupe = ?)`,
      [date, heure_fin, heure_debut, id_salle, id_enseignant, id_groupe]
    );

    if (conflits.length > 0) {
      return res.status(400).json({ message: "Conflit détecté !" });
    }

    // Ajout de la séance
    await pool.query(
      `INSERT INTO emploi_temps (date, heure_debut, heure_fin, id_salle, id_enseignant, id_groupe, matiere)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [date, heure_debut, heure_fin, id_salle, id_enseignant, id_groupe, matiere]
    );

    res.status(201).json({ message: "Séance ajoutée avec succès" });
  } catch (err) {
    console.error('Erreur POST /emploi-du-temps =>', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✏️ PUT modifier une séance
router.put('/:id', async (req, res) => {
  const { date, heure_debut, heure_fin, id_salle, id_enseignant, id_groupe, matiere } = req.body;
  const { id } = req.params;

  try {
    await pool.query(
      `UPDATE emploi_temps 
       SET date=?, heure_debut=?, heure_fin=?, id_salle=?, id_enseignant=?, id_groupe=?, matiere=? 
       WHERE id=?`,
      [date, heure_debut, heure_fin, id_salle, id_enseignant, id_groupe, matiere, id]
    );

    res.json({ message: 'Séance modifiée' });
  } catch (err) {
    console.error('Erreur PUT /emploi-du-temps/:id =>', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ❌ DELETE supprimer une séance
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM emploi_temps WHERE id=?', [id]);
    res.json({ message: 'Séance supprimée' });
  } catch (err) {
    console.error('Erreur DELETE /emploi-du-temps/:id =>', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
