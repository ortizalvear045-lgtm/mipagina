Evidencia de despliegue y verificación

URL pública del proyecto:
https://mipagina-alpha.vercel.app

Verificación rápida desde terminal:

1) Comprobar que la página responde (frontend):

curl -I https://mipagina-alpha.vercel.app

2) Comprobar endpoint de salud (backend):

curl https://mipagina-alpha.vercel.app/api/health

Respuesta esperada (JSON):
{
  "ok": true,
  "message": "API funcionando",
  "timestamp": 1699084800000
}

3) Enviar un registro de ejemplo al endpoint de registro:

curl -X POST https://mipagina-alpha.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","document":"12345678","birthdate":"1990-01-01","phone":"+56911111111","email":"juan@example.com","address":"Calle Falsa 123","symptoms":"Dolor de cabeza","doctor":"Dr. Gómez"}'

Respuesta esperada: JSON con success true y objeto `patient`.

Incluir este archivo en el repositorio es evidencia clara de la URL y cómo verificar el servicio.

Si además despliegas el backend en Render, verifica también:

URL del backend en Render (ejemplo): https://<tu-servicio>.onrender.com

Comprobar health en Render:

curl https://<tu-servicio>.onrender.com/health

Enviar registro de ejemplo a Render:

curl -X POST https://<tu-servicio>.onrender.com/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Prueba","document":"0000","birthdate":"2000-01-01","phone":"+56900000000","doctor":"Dr. Prueba"}'