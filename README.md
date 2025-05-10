# 🍳 Cookify

Cookify est une application web fullstack pour créer, gérer et consulter des recettes de cuisine. Chaque recette inclut un titre, une description, des ingrédients et des étapes de préparation.

## 🔧 Stack technique

- **Frontend** : Vue 3, Vite, Tailwind CSS, DaisyUI
- **Backend** : Node.js, Express
- **Base de données** : MongoDB
- **Authentification** : JWT (via cookies HTTPOnly)
- **Autres outils** : Axios, ESLint, Vite

## 📦 Installation

### Prérequis

- Node.js ≥ 16
- MongoDB

### Étapes

```bash
git clone https://github.com/Theo-Muyard/Cookify.git
cd Cookify

# Backend
cd backend
npm install
# Crée un fichier .env avec MONGODB_URI, JWT_SECRET
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```
