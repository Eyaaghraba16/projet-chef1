const express = require('express');
const router = express.Router();
const { EmploiTemps } = require('../models/emploiTemps');
const { Op } = require('sequelize');

// GET emploi du temps pour un étudiant
router.get('/student/:id', async (req, res) => {
  const idGroupe = req.params.id;
  try {
    const emploi = await EmploiTemps.findAll({ where: { id_groupe: idGroupe } });
    res.json(emploi);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST ajouter une séance
router.post('/', async (req, res) => {
  const newSeance = req.body;

  try {
    const conflit = await EmploiTemps.findOne({
      where: {
        date: newSeance.date,
        heure_debut: { [Op.lt]: newSeance.heure_fin },
        heure_fin: { [Op.gt]: newSeance.heure_debut },
        [Op.or]: [
          { id_salle: newSeance.id_salle },
          { id_enseignant: newSeance.id_enseignant },
          { id_groupe: newSeance.id_groupe }
        ]
      }
    });

    if (conflit) return res.status(400).json({ message: "Conflit détecté !" });

    const seance = await EmploiTemps.create(newSeance);
    res.status(201).json(seance);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT modifier une séance
router.put('/:id', async (req, res) => {
  try {
    await EmploiTemps.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Séance modifiée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE supprimer une séance
router.delete('/:id', async (req, res) => {
  try {
    await EmploiTemps.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Séance supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
