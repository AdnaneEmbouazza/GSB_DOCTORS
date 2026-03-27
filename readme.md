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

Créer un fichier `.env` à la racine du projet (optionnel avec Docker Compose, qui gère les variables) :

```env
# Base de données
DB_HOST=db
DB_NAME=gsbrapports
DB_USER=ADN
DB_PASSWORD=FeKl%KfF*Bp6J:p$:%NF
DB_PORT=3306
DATABASE_URL="mysql://ADN:FeKl%KfF*Bp6J:p$:%NF@db:3306/gsbrapports"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
```

### 2. Base de données avec Docker Compose (recommandé)

**Démarrer l'infrastructure complète :**

```bash
docker-compose up -d
```

Cette commande crée :
- **db** (MySQL 8.0) : Base de données `gsbrapports` 
  - Utilisateur : `ADN`
  - Mot de passe : `FeKl%KfF*Bp6J:p$:%NF`
  - Port : `3306`
  - **Les tables et données sont initialisées automatiquement** via le dump SQL (`/docker-entrypoint-initdb.d`)
  
- **app** (Node.js 22) : Serveur application
  - Port : `3000`
  - Lance automatiquement : `npm install && npx prisma generate && npm run dev`
  
- **adminer** : Interface web pour gérer la BDD
  - URL : `http://localhost:8080`

### 3. Configuration locale (sans Docker)

Si vous préférez MySQL en local :

```bash
# Créer la base de données
mysql -h localhost -u root -p < script_sql/gsbrapports.sql

# Installer les dépendances et lancer
npm install
npx prisma generate
npm run dev
```

## 🚀 Démarrage

### Avec Docker Compose (recommandé)

```bash
cd GSB_DOCTORS_Back-End

# Démarrer tous les services (db, app, adminer)
docker-compose up -d

# Vérifier que tout est prêt
docker-compose logs -f app
```

L'application sera disponible sur :
- 🌐 **API** : `http://localhost:3000`
- 📚 **Swagger** : `http://localhost:3000/api-docs`
- 🗄️ **Adminer** : `http://localhost:8080` (user: `ADN`, pass: `FeKl%KfF*Bp6J:p$:%NF`, db: `gsbrapports`)

### Sans Docker (développement local)

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Démarrer le serveur
npm run dev
```

Le serveur démarre sur `http://localhost:3000` et la documentation Swagger sur `http://localhost:3000/api-docs`

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
npx prisma generate         # Générer le client (automatique avec Docker)
npx prisma db push          # Synchroniser le schéma avec la DB
npx prisma studio          # Interface graphique (http://localhost:5555)
npx prisma migrate reset   # Réinitialiser DB (supprime les données)
```

### Initialisation de la base de données

**Avec Docker Compose** (automatique) :
- Le fichier `script_sql/gsbrapports.sql` est copié dans `/docker-entrypoint-initdb.d/`
- MySQL l'exécute automatiquement au premier démarrage du conteneur
- Aucune action manuelle requise

**Sans Docker** (local) :
```bash
mysql -h localhost -u root -p < script_sql/gsbrapports.sql
```

### Script init-db.sh

Le script `scripts/init-db.sh` est **optionnel** et ne s'exécute plus automatiquement avec Docker Compose. 

Il reste disponible pour :
- Regénérer le client Prisma : `npx prisma generate`
- Lancer l'app en développement local : `npm run dev`

Utilisation manuelle :
```bash
bash scripts/init-db.sh
```

## 🐳 Docker & Docker Compose

### Architecture

Le fichier `docker-compose.yml` orchestre 3 services :

```yaml
db          # MySQL 8.0 - Gère l'import SQL automatiquement
├─ Volumes: ./script_sql:/docker-entrypoint-initdb.d
└─ MySQL exécute auto tous les fichiers .sql au premier démarrage

app         # Node.js 22 - Application Express/Prisma
├─ Dépend de: db (condition: service_healthy)
├─ Command: npm install && npx prisma generate && npm run dev
└─ Attend que la DB soit prête via healthcheck

adminer     # Interface web pour gérer la BDD
├─ Dépend de: db
└─ Port: 8080
```

### Commandes essentielles

```bash
# Démarrer tous les services en arrière-plan
docker-compose up -d

# Voir les logs en direct
docker-compose logs -f           # tous les services
docker-compose logs -f app       # juste l'app
docker-compose logs -f db        # juste la db

# Arrêter proprement
docker-compose down

# Arrêter ET supprimer les données
docker-compose down --volumes

# Redémarrer avec rebuild (après changement du code)
docker-compose up --build

# Vérifier l'état
docker-compose ps
```

### Structure des volumes

```
script_sql/                          # Dossier local
├── gsbrapports.sql                  
└── ...
    ↓
/docker-entrypoint-initdb.d/         # Inside container
```

MySQL exécute automatiquement tous les fichiers `.sql` du dossier `initdb.d` au **premier démarrage seulement**. 

**Important** : Le dossier `db_data` (volume persistant) conserve les données même après `docker-compose down`. Pour un reset complet : `docker-compose down --volumes --remove-orphans`

### Résolution de problèmes Docker

```bash
# Logs complets (avec erreurs MySQL)
docker-compose logs db

# Vérifier que les fichiers SQL sont bien répliqués
docker-compose exec db ls -la /docker-entrypoint-initdb.d

# Accéder au conteneur
docker-compose exec app bash
docker-compose exec db mysql -u ADN -p gsbrapports

# Nettoyer complètement (si l'état est corrompu)
docker system prune -af --volumes
docker-compose up --build
```

## ✅ Commandes npm

```bash
npm run dev      # Développement
npm run build    # Build
npm start        # Production
```

## 🚀 Déploiement en production

### Avec Docker Compose (recommandé)

La configuration `docker-compose.yml` est prête pour un déploiement simple :

```bash
# Clone et démarrage
git clone <repo-url>
cd GSB_DOCTORS_Back-End
docker-compose up -d

# Vérifier la santé
docker-compose ps
docker-compose logs app
```

### Dockerfile personnalisé (optionnel)

Si vous préférez un build custom :

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm ci --omit=dev

# Copier le code et Prisma
COPY . .
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
```

Build et run :

```bash
docker build -t gsb-doctors-api .
docker run -p 3000:3000 --env-file .env gsb-doctors-api
```

### Variables d'environnement production

```env
NODE_ENV=production
DATABASE_URL=mysql://ADN:FeKl%KfF*Bp6J:p$:%NF@db-hostname:3306/gsbrapports
JWT_SECRET=your-long-random-secret-key-with-enough-entropy-for-production
```

## 📝 Logs

Les logs sont stockés dans le dossier `logs/`

## 📄 Licence

MIT
