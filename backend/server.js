// Importation des modules nécessaires
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importation des routes
const authRoutes = require('./routes/auth');
const emploiRoutes = require('./routes/emploi');
const absencesRoutes = require('./routes/absences');
const notesRoutes = require('./routes/notes');
const notificationsRoutes = require('./routes/notifications');
const rattrapagesRoutes = require('./routes/rattrapages');
const messagesRoutes = require('./routes/messages');
const referentielsRoutes = require('./routes/referentiels');

// Création de l'application Express
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/emploi-du-temps', emploiRoutes); // ✅ Sprint 3
app.use('/api/absences', absencesRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/rattrapages', rattrapagesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api', referentielsRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de gestion universitaire' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 API disponible sur http://localhost:${PORT}`);
});
