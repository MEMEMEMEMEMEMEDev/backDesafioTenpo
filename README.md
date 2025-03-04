# 🏗️ DESAFÍO TENPO BACK

## 🚀 Instalación y ejecución

1. Crea un archivo `.env` en la raíz del backend y agrega lo siguiente:

```env
# Configuración de JWT
JWT_SECRET=jwtSecreto
JWT_EXPIRES_IN=15m
REFRESH_SECRET=refreshSecreto
REFRESH_EXPIRES_IN=7d
PORT=3000
FRONTEND_URL=http://localhost:5173
```

2. Instala las dependencias:

```sh
   npm install
```

3. Inicia el backend:

```sh
   npm run start
```

## 📡 Endpoints principales

### 🔹 Autenticación

- `POST /auth/register` → Registro de usuario.
- `POST /auth/login` → Iniciar sesión.
- `POST /auth/logout` → Cerrar sesión.
- `POST /auth/refresh` → Renovar accessToken.

### 🔹 Usuarios

- `GET /users` → Obtener lista de usuarios (requiere autenticación).
- `GET /users/profile` → Obtener perfil del usuario autenticado.
