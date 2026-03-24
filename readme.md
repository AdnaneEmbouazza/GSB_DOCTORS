# API Gestion Rapports Médicaux - GSB Doctors

API REST complète pour gérer les rapports de visite médicale des visiteurs, les médecins et les familles de médicaments. Construite avec **Node.js**, **Express**, **TypeScript** et **Prisma ORM**.

## 📋 Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Architecture](#architecture)
- [Endpoints](#endpoints)
- [Documentation API](#documentation-api)
- [Authentification](#authentification)

## 🔧 Prérequis

- **Node.js** >= 16
- **npm** 
- **Docker** et **Docker Compose** (recommandé pour la base de données)

## 📦 Installation

```bash
# Cloner le repository
git clone <repo-url>
cd GSB_DOCTORS_Back-End

# Installer les dépendances
npm install
```

## ⚙️ Configuration

### 1. Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Base de données
DB_HOST=localhost
DB_NAME=gsbrapports
DB_USER=ADN
DB_PASSWORD=FeKl%KfF*Bp6J:p$:%NF
DB_PORT=3306
DATABASE_URL="mysql://ADN:FeKl%KfF*Bp6J:p$:%NF@localhost:3306/gsbrapports"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
```

### 2. Base de données avec Docker Compose

Lancer la base de données MySQL dans un conteneur Docker :

```bash
docker-compose up -d
```

Cette commande crée un conteneur MySQL avec :
- **Base de données** : `gsbrapports`
- **Utilisateur** : `ADN`
- **Mot de passe** : `FeKl%KfF*Bp6J:p$:%NF`
- **Port** : `3306`

### 3. Synchroniser le schéma Prisma

Appliquer les migrations Prisma :

```bash
npx prisma db push
```

## 🚀 Démarrage

**Démarrer le serveur de développement :**

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

**Accéder à la documentation Swagger :**

```
http://localhost:3000/api-docs
```

## 🏗️ Architecture

```
GSB_DOCTORS_Back-End/
├── src/
│   ├── controllers/       # Logique des requêtes HTTP
│   ├── routes/            # Définition des endpoints
│   ├── services/          # Logique métier et accès aux données
│   ├── models/            # Interfaces et types TypeScript
│   ├── middleware/        # Middleware Express
│   ├── db/                # Configuration BDD
│   ├── utils/             # Utilitaires
│   ├── swagger.ts         # Configuration Swagger/OpenAPI
│   ├── error.ts           # Classes d'erreurs
│   └── prisma.ts          # Client Prisma
├── prisma/
│   └── schema.prisma      # Schéma de la base de données
├── logs/                  # Fichiers de logs
├── docker-compose.yml     # Configuration Docker Compose
└── package.json
```

## 📡 Endpoints

### Authentification & Visiteurs (`/api/visiteurs`)
- `POST /api/visiteurs/login` - Connexion
- `POST /api/visiteurs/inscription` - Création compte
- `GET /api/visiteurs/account/:id` - Récupérer infos (protégé)
- `PUT /api/visiteurs/account/:id` - Modifier compte (protégé)
- `DELETE /api/visiteurs/account/:id` - Supprimer compte (protégé)
- `GET /api/visiteurs` - Lister tous (protégé)
- `GET /api/visiteurs/:id` - Détails (protégé)

### Familles de médicaments (`/api/familles`)
- `GET /api/familles` - Lister toutes
- `GET /api/familles/:id` - Détails
- `POST /api/familles` - Créer
- `PUT /api/familles/:id` - Modifier
- `DELETE /api/familles/:id` - Supprimer

### Médicaments (`/api/medicaments`)
- `GET /api/medicaments` - Lister tous
- `GET /api/medicaments/:id` - Détails
- `POST /api/medicaments` - Créer
- `PUT /api/medicaments/:id` - Modifier
- `DELETE /api/medicaments/:id` - Supprimer

### Médecins (`/api/medecins`)
- `GET /api/medecins` - Lister tous (public)
- `GET /api/medecins/:id` - Détails
- `POST /api/medecins` - Créer
- `PUT /api/medecins/:id` - Modifier
- `DELETE /api/medecins/:id` - Supprimer

### Rapports de visite (`/api/rapports`)
- `GET /api/rapports` - Lister tous
- `GET /api/rapports/:id` - Détails
- `POST /api/rapports` - Créer
- `PUT /api/rapports/:id` - Modifier
- `DELETE /api/rapports/:id` - Supprimer

### Offres de médicaments (`/api/offres`)
- `GET /api/offres` - Lister toutes
- `GET /api/offres/:id` - Détails
- `POST /api/offres` - Créer
- `PUT /api/offres/:id` - Modifier
- `DELETE /api/offres/:id` - Supprimer

## 📚 Documentation API

La documentation interactive est disponible via **Swagger UI** :

```
http://localhost:3000/api-docs
```

## 🔐 Authentification

L'API utilise **JWT (JSON Web Tokens)**. 

**Routes publiques :**
- `GET /api/medecins`
- `POST /api/visiteurs/login`
- `POST /api/visiteurs/inscription`

**Routes protégées** : Nécessitent un token JWT valide `Authorization: Bearer <token>`

Les mots de passe sont hashés avec **bcrypt**.

## 🗄️ Base de données avec Prisma

### Modèles de données

- **Famille** : Catégories de médicaments
- **Medicament** : Médicaments disponibles
- **Medecin** : Médecins
- **Visiteur** : Représentants commerciaux
- **Rapport** : Rapports de visite
- **Offrir** : Médicaments offerts (clé composée)

### Commandes Prisma

```bash
npx prisma db push          # Appliquer migrations
npx prisma generate         # Générer client
npx prisma studio          # Interface graphique
npx prisma migrate reset   # Réinitialiser DB
```

## 🐳 Docker & Docker Compose

```bash
docker-compose up -d        # Démarrer
docker-compose down         # Arrêter
docker-compose logs db      # Voir logs
docker-compose restart db   # Redémarrer
```

## ✅ Commandes npm

```bash
npm run dev      # Développement
npm run build    # Build
npm start        # Production
```

## 🚀 Déploiement Docker

Exemple de **Dockerfile** :

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Logs

Les logs sont stockés dans le dossier `logs/`

## 📄 Licence

MIT
