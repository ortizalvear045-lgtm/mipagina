export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Solo se permite POST' });
    return;
  }

  let body = req.body;
  if (!body) {
    body = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch (error) {
          reject(error);
        }
      });
      req.on('error', reject);
    });
  }

  const { name, document, birthdate, phone, doctor } = body || {};

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

  res.status(200).json({
    success: true,
    message: 'Paciente registrado correctamente.',
    patient: patientRecord,
  });
}
