export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    message: 'API funcionando',
    timestamp: Date.now(),
  });
}
module.exports = (req, res) => {
  res.status(200).json({ ok: true, message: 'API funcionando', timestamp: Date.now() })
}
