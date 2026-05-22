# 🌌 Cita Abismal: Cosmos Trivia

Aplicación web interactiva desarrollada con **React + TypeScript** como proyecto de aprendizaje, inspirada en una experiencia temática cósmica donde los usuarios pueden explorar frases, interactuar con una trivia y navegar por diferentes secciones dentro de una interfaz moderna.

El proyecto integra navegación, manejo de estado, formularios y consumo de datos para crear una experiencia dinámica y entretenida.

---

## 🚀 Características

- Sistema de navegación entre múltiples vistas.
- Registro e inicio de sesión.
- Gestión del estado del usuario.
- Trivia interactiva con puntuación.
- Visualización de frases aleatorias.
- Experiencia visual temática espacial.
- Componentes reutilizables.
- Diseño responsive.
- Persistencia de sesión usando almacenamiento local.

---

## 🛠️ Tecnologías utilizadas

- **React**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **React Query**
- **React Hook Form**
- **Zod**
- **Zustand**
- **JSON Server**
- **Radix UI**
- **Lucide React**

---

## 📁 Estructura del proyecto

```plaintext
cita-abismal-cosmos-Trivia/
│
├── public/
│   ├── frases.json
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FraseCard.tsx
│   │   ├── GatoPresenter.tsx
│   │   └── LoginModal.tsx
│   │
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── Welcome.tsx
│   │   ├── Inicio.tsx
│   │   ├── Login.tsx
│   │   ├── Registro.tsx
│   │   ├── Grimorio.tsx
│   │   ├── Juego.tsx
│   │   └── NotFound.tsx
│   │
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── db.json
├── server.ts
├── package.json
└── README.md
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/cita-abismal-cosmos-trivia.git
```

### 2. Entrar al proyecto

```bash
cd cita-abismal-cosmos-trivia
```

### 3. Instalar dependencias

```bash
npm install
```

---

## ▶️ Ejecutar el proyecto

Iniciar frontend:

```bash
npm run dev
```

Ejecutar frontend + servidor local:

```bash
npm run dev:all
```

Abrir en:

```plaintext
http://localhost:5173
```

---

## 🎮 Funcionalidades principales

✨ Explorar frases temáticas  
🧠 Resolver preguntas en la trivia  
👤 Registro e inicio de sesión  
📚 Navegación entre pantallas  
🐱 Retroalimentación visual durante el juego  

---

## 🧩 Arquitectura del proyecto

El proyecto está organizado por módulos para facilitar mantenimiento y escalabilidad:

- **Pages** → Pantallas principales.
- **Components** → Componentes reutilizables.
- **Services** → Comunicación con datos.
- **Store** → Estado global.
- **Hooks** → Lógica reutilizable.
- **Types** → Tipado centralizado.

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado como práctica para fortalecer conocimientos en:

- React y TypeScript.
- Manejo de estado global.
- Formularios y validaciones.
- Consumo de datos.
- Diseño de interfaces.
- Navegación SPA.

---

## 📄 Licencia

Proyecto desarrollado con fines educativos y de aprendizaje.
