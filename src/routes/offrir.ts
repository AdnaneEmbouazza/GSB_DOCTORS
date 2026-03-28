import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as offrirControlleur from "../controllers/offrir";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/offrir:
 *   get:
 *     summary: Récupérer vos offres
 *     description: Retourne la liste de toutes les offres liées aux rapports de l'utilisateur connecté
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     responses:
 *       200:
 *         description: Liste des offres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idrapport:
 *                     type: integer
 *                   idmedicament:
 *                     type: string
 *                   quantite:
 *                     type: integer
 *       401:
 *         description: Non authentifié
 */
router.get('/offrir' ,isloggedOn , asyncHandler(offrirControlleur.listAllOffre));

/**
 * @swagger
 * /api/offrir/{idRapport}/{idMedicament}:
 *   get:
 *     summary: Récupérer une offre d'un de vos rapports
 *     description: Retourne les détails d'une offre si elle appartient à un de vos rapports
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     parameters:
 *       - in: path
 *         name: idRapport
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de votre rapport
 *       - in: path
 *         name: idMedicament
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du médicament
 *     responses:
 *       200:
 *         description: Offre récupérée avec succès
 *       404:
 *         description: Offre non trouvée
 *       401:
 *         description: Non authentifié ou offre n'appartient pas à vos rapports
 */
router.get('/offrir/:idRapport/:idMedicament' , isloggedOn , asyncHandler(offrirControlleur.listOffreByID));

/**
 * @swagger
 * /api/offrir:
 *   post:
 *     summary: Créer une offre pour un de vos rapports
 *     description: Crée une nouvelle offre (médicament offert) seulement pour vos propres rapports
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idrapport:
 *                 type: integer
 *                 description: ID de votre rapport
 *               idmedicament:
 *                 type: string
 *               quantite:
 *                 type: integer
 *             required:
 *               - idrapport
 *               - idmedicament
 *               - quantite
 *     responses:
 *       201:
 *         description: Offre créée avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié ou rapport n'appartient pas à l'utilisateur
 */
router.post('/offrir' , isloggedOn , asyncHandler(offrirControlleur.createOffre));

/**
 * @swagger
 * /api/offrir/{idRapport}/{idMedicament}:
 *   put:
 *     summary: Modifier une offre d'un de vos rapports
 *     description: Met à jour une offre seulement si elle appartient à un de vos rapports
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     parameters:
 *       - in: path
 *         name: idRapport
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de votre rapport
 *       - in: path
 *         name: idMedicament
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du médicament
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantite:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Offre modifiée avec succès
 *       404:
 *         description: Offre non trouvée
 *       401:
 *         description: Non authentifié ou offre n'appartient pas à vos rapports
 */
router.put('/offrir/:idRapport/:idMedicament' , isloggedOn , asyncHandler(offrirControlleur.updateOffreByID));

/**
 * @swagger
 * /api/offrir/{idRapport}/{idMedicament}:
 *   delete:
 *     summary: Supprimer une offre d'un de vos rapports
 *     description: Supprime une offre seulement si elle appartient à un de vos rapports
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     parameters:
 *       - in: path
 *         name: idRapport
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de votre rapport
 *       - in: path
 *         name: idMedicament
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du médicament
 *     responses:
 *       200:
 *         description: Offre supprimée avec succès
 *       404:
 *         description: Offre non trouvée
 *       401:
 *         description: Non authentifié ou offre n'appartient pas à vos rapports
 */
router.delete('/offrir/:idRapport/:idMedicament' , isloggedOn , asyncHandler(offrirControlleur.deleteOffreByID));
 

export default router;