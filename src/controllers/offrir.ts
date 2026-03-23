import { Request, Response } from "express";
import * as offrirService from "../services/offrir";
import { NotFoundError, BadRequestError } from "../error";
import { CreateOffrirDTO, UpdateOffrirDTO } from "../models/offrir";
import logger from "../utils/logger";

// à redéfinir : cette table est une table de liaison entre les médicaments et les rapports, elle n'a pas d'identifiant propre, 

export async function listAllOffre(req: Request, res: Response): Promise<void> {
    const offre = await offrirService.getAllOffre();
    logger.info(`${offre.length} offres récupérées`);
    res.status(200).json(offre);
};

export async function listOffreByID(req: Request, res: Response): Promise<void> {
    const idrapport = Number(req.params.idrapport);
    const idmedicament = req.params.idmedicament as string;
    const offre = await offrirService.getOffreByID(idrapport, idmedicament);
    
    if (!offre) {
        logger.warn(`Tentative d'accès à une offre inexistante : ${idrapport}-${idmedicament}`);
        throw new NotFoundError('Offre non trouvée');
    }
    
    logger.info(`Offre ${idrapport}-${idmedicament} récupérée`);
    res.status(200).json(offre);
};

export async function createOffre(req: Request, res: Response): Promise<void> {
    const data : CreateOffrirDTO = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de l\'offre sont requises');
    }
    
    const offre = await offrirService.createOffre(data);
    logger.info(`Nouvelle offre créée`);
    res.status(201).json(offre);
};

export async function updateOffreByID(req: Request, res: Response): Promise<void> {
    const idrapport = Number(req.params.idrapport);
    const idmedicament = req.params.idmedicament as string;
    const data : UpdateOffrirDTO = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const offre = await offrirService.updateOffreById(idrapport, idmedicament, data);
    
    if (!offre) {
        throw new NotFoundError('Offre non trouvée');
    }
    
    logger.info(`Offre ${idrapport}-${idmedicament} mise à jour`);
    res.status(200).json(offre);
};

export async function deleteOffreByID(req: Request, res: Response): Promise<void> {
    const idrapport = Number(req.params.idrapport);
    const idmedicament = req.params.idmedicament as string;
    
    const offre = await offrirService.deleteOffreByID(idrapport, idmedicament);
    
    if (!offre) {
        throw new NotFoundError('Offre non trouvée');
    }
    
    logger.info(`Offre ${idrapport}-${idmedicament} supprimée`);
    res.status(200).json(offre);
};