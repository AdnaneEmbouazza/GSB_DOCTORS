import { Request, Response } from "express";
import * as medicamentsServices from "../services/medicaments";
import { NotFoundError, BadRequestError } from "../error";
import logger from "../utils/logger";

export async function listAllMedicaments(req: Request, res: Response): Promise<void> {
    const medicaments = await medicamentsServices.getAllMedicaments();
    logger.info(`${medicaments.length} médicaments récupérés`);
    res.status(200).json(medicaments);
}

export async function listMedicamentsByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const medicament = await medicamentsServices.getMedicamentByID(id);
    
    if (!medicament) {
        logger.warn(`Tentative d'accès à un médicament inexistant : ${id}`);
        throw new NotFoundError('Médicament non trouvé');
    }
    
    logger.info(`Médicament ${id} récupéré`);
    res.status(200).json(medicament);
}

export async function createMedicament(req: Request, res: Response): Promise<void> {
    const data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données du médicament sont requises');
    }
    
    const newMedicament = await medicamentsServices.createMedicament(data);
    logger.info(`Nouveau médicament créé`);
    res.status(201).json(newMedicament);
}

export async function updateMedicamentByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const updatedMedicament = await medicamentsServices.updateMedicamentByID(id, data);
    
    if (!updatedMedicament) {
        throw new NotFoundError('Médicament non trouvé');
    }
    
    logger.info(`Médicament ${id} mis à jour`);
    res.status(200).json(updatedMedicament);
}

export async function deleteMedicamentByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    const deleteMedicamentByID = await medicamentsServices.deleteMedicamentByID(id);
    
    if (!deleteMedicamentByID) {
        throw new NotFoundError('Médicament non trouvé');
    }
    
    logger.info(`Médicament ${id} supprimé`);
    res.status(200).json(deleteMedicamentByID);
}