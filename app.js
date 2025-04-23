import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; // Middleware para analizar el cuerpo de las solicitudes
import rutaTarea from './routes/rutaTarea.js'
import rutaSprints from './routes/rutaSprints.js'
import rutaBacklog from './routes/rutaBacklog.js'
const app = express();

// Middleware para manejar JSON en las solicitudes
app.use(bodyParser.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/gestor-tareas', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((err) => {
    console.error('Error de conexión:', err);
  });

// Configurar las rutas
app.use('/tarea', rutaTarea);  // Ruta para las tareas
app.use('/sprints', rutaSprints);  // Ruta para los sprints
app.use('/backlog', rutaBacklog);  // Ruta para el backlog

// Ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('API Rest - To Do List en funcionamiento');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
