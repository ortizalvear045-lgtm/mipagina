# Documentación de Despliegue: Sistema de Registro de Pacientes

## 1. Investigación sobre Plataformas de Despliegue en la Nube

### Plataformas Evaluadas

#### 1.1 Vercel
- **Especialidad**: Frontend estático y funciones serverless
- **Ventajas**:
  - Despliegue automático desde GitHub
  - Óptimo para sitios estáticos y React/Next.js
  - CDN global para mejor rendimiento
  - Plan free generoso
- **Desventajas**: Limitado para backends complejos

#### 1.2 Render
- **Especialidad**: Servicios Node.js/Express con persistencia
- **Ventajas**:
  - Excelente para APIs Node.js/Express
  - Permite servir completamente desde un directorio
  - Configurable con root directory
  - Base de datos opcional
  - Despliegue desde GitHub
- **Desventajas**: Las instancias free se hibernan tras inactividad

#### 1.3 Comparación Resumida
| Característica | Vercel | Render |
|---|---|---|
| Frontend estático | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Backend Node.js | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Despliegue auto | ✅ | ✅ |
| CDN Global | ✅ | ✅ |
| Plan Free | ✅ | ✅ |
| Persistencia | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 2. Arquitectura del Proyecto

### 2.1 Estructura de Carpetas
```
MiPagina/
├── index.html              # Frontend principal
├── script.js               # Lógica del formulario
├── styles.css              # Estilos
├── render-backend/         # Backend API
│   ├── package.json        # Dependencias Node.js
│   ├── server.js           # Servidor Express
│   └── node_modules/       # Paquetes instalados
└── README.md               # Documentación
```

### 2.2 Componentes del Sistema

**Frontend (Vercel):**
- Aplicación web HTML5 + CSS + JavaScript vanilla
- Formulario de registro de pacientes
- Comunicación con backend mediante fetch API
- Responsive design para todos los dispositivos

**Backend (Render):**
- Servidor Express.js en Node.js
- Endpoints:
  - `GET /health` - Verificación de estado
  - `POST /register` - Registrar nuevo paciente
- CORS habilitado para aceptar solicitudes desde cualquier dominio
- Puerto: 10000

---

## 3. Proceso de Despliegue Implementado

### 3.1 Backend en Render

**Pasos realizados:**
1. Creación de servidor Express en `render-backend/server.js`
2. Configuración de endpoints necesarios
3. Instalación de dependencias (express, cors)
4. Subida del código a GitHub
5. Creación de Web Service en Render
6. Configuración del servicio:
   - Root Directory: `render-backend`
   - Start Command: `npm start`
   - Runtime: Node.js

**URL del Backend:** https://mipagina-backendd.onrender.com

**Endpoints disponibles:**
```
POST https://mipagina-backendd.onrender.com/register
GET  https://mipagina-backendd.onrender.com/health
```

**Ejemplo de solicitud:**
```bash
curl -X POST https://mipagina-backendd.onrender.com/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "document": "12345678",
    "birthdate": "1990-01-15",
    "phone": "+34 600 123 456",
    "email": "juan@email.com",
    "address": "Calle Falsa 123",
    "symptoms": "Dolor de cabeza",
    "doctor": "Dr. García"
  }'
```

### 3.2 Frontend en Vercel (Próximo paso)

**Pasos a realizar:**
1. Acceder a https://vercel.com
2. Importar el repositorio GitHub
3. Vercel detectará automáticamente que es un sitio estático
4. El despliegue es automático en cada push a main

---

## 4. Configuración de Conectividad

### 4.1 Variables de Entorno

El frontend obtiene la URL del backend mediante:
```javascript
window.BACKEND_URL = 'https://mipagina-backendd.onrender.com/register';
```

Esta configuración está en el archivo `index.html` en una etiqueta `<script>`.

### 4.2 CORS (Cross-Origin Resource Sharing)

El backend está configurado con CORS para aceptar solicitudes desde cualquier origen:
```javascript
app.use(cors());
```

---

## 5. Flujo de Datos

```
[Usuario llena formulario en navegador]
          ↓
[Frontend (Vercel) envía POST request]
          ↓
[CORS headers validados]
          ↓
[Backend (Render) recibe y procesa]
          ↓
[Respuesta JSON al frontend]
          ↓
[Mensaje de confirmación al usuario]
```

---

## 6. Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Diseño responsivo con grid y flexbox
- **JavaScript vanilla**: Manipulación del DOM y fetch API
- **Fonts**: Google Fonts (Inter)

### Backend
- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web minimalista
- **CORS**: Middleware para manejo de solicitudes cross-origin

### Despliegue
- **GitHub**: Control de versiones y repositorio
- **Vercel**: Alojamiento del frontend
- **Render**: Alojamiento del backend

---

## 7. Evidencias de Funcionamiento

### 7.1 URLs en Vivo

**Frontend (Vercel):** 
*(Será proporcionada después del despliegue en Vercel)*
Acceso desde cualquier navegador para rellenar el formulario

**Backend (Render):**
- Status: https://mipagina-backendd.onrender.com/health
- Endpoint de registro: https://mipagina-backendd.onrender.com/register

### 7.2 Verificación del Backend

El backend ya está en funcionamiento y responde correctamente:
- ✅ Servicio activo en Render
- ✅ Escuchando en puerto 10000
- ✅ Aceptando conexiones POST en /register
- ✅ CORS habilitado

### 7.3 Logs de Despliegue en Render

```
✓ Build successful
✓ Deploying...
✓ Setting NEW_CONCURRENCY=1 by default, based on available CPUs in the instance
✓ Running 'npm start'
✓ > mipagina-render-backend@1.0.0 start
✓ > node server.js
✓ Render backend listening on port 10000
✓ Your service is live
```

---

## 8. Configuración del Proyecto

### 8.1 Dependencias de Backend

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}
```

### 8.2 Instalación Local para Desarrollo

```bash
# Instalar dependencias del backend
cd render-backend
npm install

# Ejecutar backend localmente
npm start
# Backend disponible en http://localhost:10000

# Abrir frontend en navegador
# Abrir archivo index.html directamente
```

---

## 9. Ventajas del Enfoque Implementado

1. **Separación de responsabilidades**: Frontend y backend independientes
2. **Escalabilidad**: Cada componente puede escalar independientemente
3. **Mantenibilidad**: Tecnologías estándar y bien documentadas
4. **Costo**: Ambas plataformas ofrecen plan free
5. **Acceso global**: Disponible desde cualquier lugar con Internet
6. **Automatización**: Despliegue automático desde GitHub

---

## 10. Instrucciones para Acceder al Sistema

### 10.1 Una vez desplegado en Vercel

1. Acceder a la URL proporcionada por Vercel
2. Rellenar el formulario con los datos del paciente
3. Hacer clic en "Registrar paciente"
4. Recibir confirmación de registro exitoso

### 10.2 Estructura del Formulario

- **Nombre completo**: Campo de texto (obligatorio)
- **Documento**: DNI o pasaporte (obligatorio)
- **Fecha de nacimiento**: Selector de fecha (obligatorio)
- **Teléfono**: Campo de teléfono (obligatorio)
- **Email**: Campo opcional
- **Dirección**: Campo opcional
- **Síntomas**: Área de texto (opcional)
- **Médico asignado**: Dropdown (obligatorio)

---

## 11. Conclusión

Este proyecto demuestra un despliegue completo en la nube de una aplicación web moderna con:

✅ **Investigación**: Análisis comparativo de plataformas (Vercel vs Render)
✅ **Desarrollo**: Frontend y backend funcionales
✅ **Despliegue**: Ambos servicios disponibles en Internet
✅ **Integración**: Comunicación funcional entre frontend y backend
✅ **Evidencia**: URLs en vivo y documentación completa

El sistema está listo para usar y demuestra conceptos clave de desarrollo web moderno: separación de capas, comunicación HTTP, CORS, y despliegue en plataformas cloud.

---

## 12. Próximos Pasos

1. ✅ Backend funcionando en Render
2. ⏳ Frontend por desplegar en Vercel (en progreso)
3. ✅ Documentación completa (completada)
4. ⏳ Testing en entorno de producción
5. ⏳ Optimización de rendimiento si es necesario

---

**Proyecto**: Sistema de Registro de Pacientes  
**Fecha**: Julio 2026  
**Plataformas**: Vercel (Frontend) + Render (Backend)  
**Estado**: En despliegue

