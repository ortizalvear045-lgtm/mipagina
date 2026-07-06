# Registro de Pacientes

Landing page para registrar pacientes médicos. Contiene un formulario de registro, beneficios para clínicas y un estilo adaptado a consultorios.

## Estructura
- `index.html`: contenido del sitio y formulario de pacientes
- `styles.css`: estilos visuales para el diseño médico
- `script.js`: manejo del formulario y mensaje de confirmación

## Despliegue en Vercel
1. Sube este proyecto a GitHub.
2. Entra a Vercel y crea un nuevo proyecto desde ese repositorio.
3. Vercel detectará el sitio estático y lo desplegará automáticamente.

## Uso de Render para backend

Se provee un backend preparado para desplegar en Render dentro de la carpeta `render-backend`.

Comparación corta entre plataformas (resumen):
- Vercel: ideal para frontend estático y funciones serverless (API en `/api`). Despliegue automático desde GitHub.
- Render: permite correr servicios Node/Express completos con persistencia opcional y configuraciones de proceso (mejor para APIs que requieren persistencia o procesos largos).

Recomendación para la rúbrica: desplegar el frontend en Vercel (ya configurado) y el backend en Render para mostrar integración entre dos plataformas.

### Desplegar backend en Render
1. Accede a https://dashboard.render.com y crea un nuevo "Web Service".
2. Conecta el repositorio de GitHub y selecciona la carpeta `render-backend` como subdirectorio (o crea un repo separado con esos archivos).
3. Configura el build command (no es necesario) y el start command: `npm start`.
4. Despliega; obtendrás una URL tipo `https://mipagina-backend.onrender.com`.

Tras desplegar en Render, actualiza la variable `window.BACKEND_URL` en `index.html` o en la consola del navegador para apuntar a `https://<tu-servicio>.onrender.com/register`.

## Desarrollo local
Puedes abrir `index.html` directamente o servir la carpeta con un servidor simple.
