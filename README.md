 Sinestesia (Review Platform)

Review Platform es una aplicación web fullstack que revoluciona la forma en que las personas descubren y comparten experiencias sobre entretenimiento y gastronomía. A diferencia de las plataformas tradicionales que se enfocan en un solo tipo de contenido, nuestra aplicación permite a los usuarios crear reseñas interconectadas que reflejan cómo realmente experimentamos la cultura: combinando películas, música y comida en experiencias memorables.
La característica distintiva de la plataforma es el sistema de recomendaciones cruzadas. Cuando un usuario reseña una película, puede simultáneamente recomendar una canción que complementa la experiencia y un plato de comida que considera perfecto para acompañar la película. Esta funcionalidad reconoce que nuestras experiencias culturales raramente ocurren en aislamiento.
 Funcionalidades Principales

 1. Sistema de Autenticación 
- Registro seguro: Los usuarios crean cuentas con validación de email único
- Inicio de sesión: Autenticación mediante JWT tokens

2. Catálogo Integral de Contenido
   Películas
- Información detallada: título, descripción, género, director, año de lanzamiento
- Páginas individuales con toda la información relevante
- Sistema de calificaciones promedio automático

  Música
- Datos completos: nombre de la canción, artista, álbum, género, año
- Organización por artista y álbum
- Integración con el sistema de reseñas

  Comida
- Descripción gastronómica: nombre, descripción, país de origen
- Lista detallada de ingredientes
- Categorización por origen geográfico

3. Sistema Avanzado de Reseñas
Recomendaciones Cruzadas:Crea experiencias completas vinculando contenido relacionado crenado un descubrimiento orgánico a través de experiencias de otros.

4. Sistema de Nominaciones y Rankings
   Rankings que exponen las mejores peliculas, musica y comidas basado en la calificación puesta en reseñas y el numero de reseñas por película.
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)

 Descripción

Review Platform es una aplicación web fullstack que permite a los usuarios descubrir, reseñar y recomendar películas, música y comida. La característica única del sistema es la capacidad de crear recomendaciones cruzadas entre diferentes tipos de contenido, permitiendo a los usuarios vincular una película con una canción y un plato de comida en una sola reseña.

 Características Principales

- Autenticación completa: Sistema de registro e inicio de sesión con JWT
- Gestión de contenido: CRUD completo para películas, música y comida
- Sistema de reseñas: Calificaciones de 1-5 estrellas con comentarios detallados
- Recomendaciones cruzadas: Vincula diferentes tipos de contenido en una sola reseña
- Sistema de nominaciones: Rankings automáticos basados en calificaciones promedio
- Filtros por fecha: Filtra nominaciones por períodos específicos
- Gestión personal: Página dedicada para administrar las reseñas propias
- Diseño responsivo: Optimizado para dispositivos móviles y desktop
- Interfaz moderna: UI elegante construida con Tailwind CSS y shadcn/ui

 Stack Tecnológico

Frontend
- Next.js 14 con App Router
- TypeScript para tipado estático
- Tailwind CSS para estilos
- shadcn/ui para componentes de interfaz
-Lucide React para iconografía

 Backend
- Node.js con Express.js
- MongoDB Atlas como base de datos
- JWT para autenticación
- bcryptjs para encriptación
- express-validator para validación de datos
- CORS configurado para comunicación frontend-backend

 Instalación y Configuración

 Prerrequisitos
- Node.js 18 o superior
- npm o yarn
- Cuenta de MongoDB Atlas

 Configuración del Proyecto

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/review-platform.git
cd review-platform


Estructura del proyecto
review-platform/
├── models/
│   ├── User.js              # Modelo de usuario
│   ├── Movie.js             # Modelo de película
│   ├── Music.js             # Modelo de música
│   ├── Food.js              # Modelo de comida
│   └── Review.js            # Modelo de reseña
├── routes/
│   ├── auth.js              # Rutas de autenticación
│   ├── movies.js            # Rutas de películas
│   ├── music.js             # Rutas de música
│   ├── food.js              # Rutas de comida
│   └── reviews.js           # Rutas de reseñas
├── middleware/
│   └── auth.js              # Middleware de autenticación
├── frontend/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/       # Página de inicio de sesión
│   │   │   └── register/    # Página de registro
│   │   ├── movies/[id]/     # Página de detalle de película
│   │   ├── music/[id]/      # Página de detalle de música
│   │   ├── food/[id]/       # Página de detalle de comida
│   │   ├── nominations/     # Página de nominaciones
│   │   ├── my-reviews/      # Página de reseñas personales
│   │   └── page.tsx         # Página principal
│   └── components/
│       ├── auth-provider.tsx    # Proveedor de autenticación
│       ├── navigation.tsx       # Componente de navegación
│       ├── review-form.tsx      # Formulario de reseñas
│       ├── review-list.tsx      # Lista de reseñas
│       └── client-layout.tsx    # Layout del cliente
├── server.js                # Servidor principal
├── package.json
└── README.md
