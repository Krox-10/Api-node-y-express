require('dotenv').config();

const express = require('express');
const db = require('./src/config/dbConfig');

const personaRoutes = require('./src/routes/personaRoutes');
const guardiaRoutes = require('./src/routes/guardiaRoutes');
const servicioRoutes = require('./src/routes/servicioRoutes');
const puestoRoutes = require('./src/routes/puestoRoutes');
const turnoRoutes = require('./src/routes/turnoRoutes');
const novedadRoutes = require('./src/routes/novedadRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ruta inicial para comprobar que la API está activa
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API de Seguridad Privada funcionando correctamente'
    });
});

// Rutas de cada recurso
app.use('/api/personas', personaRoutes);
app.use('/api/guardias', guardiaRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/puestos', puestoRoutes);
app.use('/api/turnos', turnoRoutes);
app.use('/api/novedades', novedadRoutes);

// Ruta para endpoints inexistentes
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Manejo general de errores de Express
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});

db.connect((err) => {
    if (err) {
        console.error('No fue posible conectar con MySQL:', err.message);
        process.exit(1);
    }

    console.log('Conexión MySQL exitosa');
    app.listen(port, () => {
        console.log(`Servidor iniciado en http://localhost:${port}`);
    });
});
