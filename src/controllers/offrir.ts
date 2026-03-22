import { Request, Response } from "express";
import * as offrirService from "../services/offrir";
import { NotFoundError, BadRequestError } from "../error";
import logger from "../utils/logger";

export async function listAllOffre(req: Request, res: Response): Promise<void> {
    const offre = await offrirService.getAllOffre();
    logger.info(`${offre.length} offres récupérées`);
    res.status(200).json(offre);
}

export async function listOffreByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const offre = await offrirService.getOffreByID(id);
    
    if (!offre) {
        logger.warn(`Tentative d'accès à une offre inexistante : ${id}`);
        throw new NotFoundError('Offre non trouvée');
    }
    
    logger.info(`Offre ${id} récupérée`);
    res.status(200).json(offre);
}

export async function createOffre(req: Request, res: Response): Promise<void> {
    const data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de l\'offre sont requises');
    }
    
    const offre = await offrirService.createOffre(data);
    logger.info(`Nouvelle offre créée`);
    res.status(201).json(offre);
}

export async function updateOffreByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const offre = await offrirService.updateOffreById(id, data);
    
    if (!offre) {
        throw new NotFoundError('Offre non trouvée');
    }
    
    logger.info(`Offre ${id} mise à jour`);
    res.status(200).json(offre);
}

export async function deleteOffreByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    const offre = await offrirService.deleteOffreByID(id);
    
    if (!offre) {
        throw new NotFoundError('Offre non trouvée');
    }
    
    logger.info(`Offre ${id} supprimée`);
    res.status(200).json(offre);
}