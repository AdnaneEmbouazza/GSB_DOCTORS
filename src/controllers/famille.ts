import { Request, Response } from "express";
import * as familleService from "../services/famille";
import { NotFoundError, BadRequestError } from "../error";
import { UpdateFamilleDTO , CreateFamilleDTO } from "../models/famille";
import logger from "../utils/logger";

export async function listAllFamilles(req: Request, res: Response): Promise<void> {
    const familles = await familleService.getAllFamilles();
    logger.info(`${familles.length} familles récupérées`);
    res.status(200).json(familles);
};

export async function listFamilleByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    const famille = await familleService.getFamilleByID(id);
    
    // gestion erreur 404 (non trouvé)
    if (!famille) {
        logger.warn(`Tentative d'accès à une famille inexistante : ${id}`);
        throw new NotFoundError('Famille non trouvée');
    }
    
    logger.info(`Famille ${id} récupérée`);
    res.status(200).json(famille);
};

export async function createFamille(req: Request, res: Response): Promise<void> {
    const data : CreateFamilleDTO = req.body;

    if( !data.id || !data.libelle ) {
        throw new BadRequestError('Les champs id et libelle sont requis');
    }
    
    // Gestion erreur 400 (donnés manquantes ou invalides)
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de la famille sont requises');
    }
    
    const newFamille = await familleService.createFamille(data);
    logger.info(`Nouvelle famille créée`);
    res.status(201).json(newFamille);
};

export async function updateFamilleByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    const data : UpdateFamilleDTO = req.body;
    
    // Gestion erreur 400 (donnés manquantes ou invalides)
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const updatedFamille = await familleService.updateFamilleByID(id, data);
    
    // gestion erreur 404 (non trouvé)
    if (!updatedFamille) {
        throw new NotFoundError('Famille non trouvée');
    }
    
    logger.info(`Famille ${id} mise à jour`);
    res.status(200).json(updatedFamille);
};

export async function deleteFamilleByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    
    const deletedFamille = await familleService.deleteFamilleByID(id);
    
    // gestion erreur 404 (non trouvé)
    if (!deletedFamille) {
        throw new NotFoundError('Famille non trouvée');
    }
    
    logger.info(`Famille ${id} supprimée`);
    res.status(200).json(deletedFamille);
};