const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

// Données d'exemple pour les référentiels

// Départements
const departements = [
  { id: 1, nom: 'Technologies de l\'Information', code: 'TI' },
  { id: 2, nom: 'Génie Civil', code: 'GC' },
  { id: 3, nom: 'Génie Mécanique', code: 'GM' }
];

// Matières
const matieres = [
  { id: 1, nom: 'Programmation Web', code: 'PW', departementId: 1 },
  { id: 2, nom: 'Base de données', code: 'BD', departementId: 1 },
  { id: 3, nom: 'Réseaux informatiques', code: 'RI', departementId: 1 }
];

// Salles
const salles = [
  { id: 1, nom: 'Salle 101', capacite: 30, type: 'Cours' },
  { id: 2, nom: 'Salle 203', capacite: 25, type: 'TD' },
  { id: 3, nom: 'Lab 1', capacite: 20, type: 'TP' }
];

// GET - Départements
router.get('/departements', verifyToken, (req, res) => {
  try {
    res.json(departements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des départements' });
  }
});

// GET - Matières
router.get('/matieres', verifyToken, (req, res) => {
  try {
    res.json(matieres);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des matières' });
  }
});

// GET - Salles
router.get('/salles', verifyToken, (req, res) => {
  try {
    res.json(salles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des salles' });
  }
});

module.exports = router;
