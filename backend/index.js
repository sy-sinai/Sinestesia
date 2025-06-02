const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas (comenta o elimina las que no tengas)
const movieRoutes = require('./routes/movieRoutes');
const musicRoutes = require('./routes/musicRoutes');
const foodRoutes = require('./routes/foodRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');

// Conexión a MongoDB
const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
  console.error('❌ Error: La variable MONGODB_URI no está definida en .env');
  process.exit(1); // termina la app si no hay URI
}

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // termina la app si falla la conexión
});

// Usar rutas
app.use('/api/movies', movieRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

// Manejo de rutas 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
