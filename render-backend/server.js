const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const sendHealth = (req, res) => {
  res.json({ ok: true, message: 'API funcionando (Render)', timestamp: Date.now() });
};

app.get('/health', sendHealth);
app.get('/api/health', sendHealth);

const registerPatient = (req, res) => {
  const body = req.body || {};
  const { name, document, birthdate, phone, doctor } = body;

  if (!name || !document || !birthdate || !phone || !doctor) {
    res.status(400).json({ error: 'Faltan campos obligatorios.' });
    return;
  }

  const patientRecord = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    name,
    document,
    birthdate,
    phone,
    email: body.email || '',
    address: body.address || '',
    symptoms: body.symptoms || '',
    doctor,
  };

  // Aquí solo simulamos persistencia en memoria; para producción usar BD.
  res.json({ success: true, message: 'Paciente registrado correctamente (Render).', patient: patientRecord });
};

app.post('/register', registerPatient);
app.post('/api/register', registerPatient);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Render backend listening on port ${port}`);
});
