#!/bin/bash
set -e

# Script optionnel - l'import SQL est maintenant géré par Docker (db service)
# Ce script peut être utilisé pour regénérer le client Prisma et lancer l'app en local

echo "Generation du client Prisma..."
npx prisma generate

echo "Demarrage de l'application..."
npm run dev
