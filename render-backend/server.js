const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Configurar conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Crear tabla si no existe
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        document VARCHAR(50) NOT NULL UNIQUE,
        birthdate DATE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        address VARCHAR(255),
        symptoms TEXT,
        doctor VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Tabla de pacientes lista');
  } catch (error) {
    console.error('✗ Error al crear tabla:', error);
  }
};

initializeDatabase();

const sendHealth = (req, res) => {
  res.json({ 
    ok: true, 
    message: 'API funcionando (Render con PostgreSQL)', 
    timestamp: Date.now(),
    database: 'PostgreSQL'
  });
};

app.get('/health', sendHealth);
app.get('/api/health', sendHealth);

const registerPatient = async (req, res) => {
  const body = req.body || {};
  const { name, document, birthdate, phone, doctor } = body;

  if (!name || !document || !birthdate || !phone || !doctor) {
    res.status(400).json({ error: 'Faltan campos obligatorios.' });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO patients (name, document, birthdate, phone, email, address, symptoms, doctor)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        name,
        document,
        birthdate,
        phone,
        body.email || '',
        body.address || '',
        body.symptoms || '',
        doctor
      ]
    );

    res.json({ 
      success: true, 
      message: 'Paciente registrado correctamente (Render con PostgreSQL).', 
      patient: result.rows[0] 
    });
  } catch (error) {
    if (error.code === '23505') {
      res.status(400).json({ error: 'El documento ya está registrado.' });
    } else {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al registrar paciente.' });
    }
  }
};

app.post('/register', registerPatient);
app.post('/api/register', registerPatient);

// Endpoint para obtener todos los pacientes (para verificación)
app.get('/patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients ORDER BY created_at DESC LIMIT 50');
    res.json({ patients: result.rows, total: result.rows.length });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener pacientes.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Render backend listening on port ${port}`);
});
