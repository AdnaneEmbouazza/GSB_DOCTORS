import { Request, Response } from "express";
import * as medecinService from "../services/medecin";

export async function listAllMedecins(req: Request , res:Response) : Promise<void>{
    const medecins = await medecinService.getAllMedecins();
    if (medecins){
        res.json(medecins);
    }
    else{
        res.status(404).json({ message: "Aucun médecin trouvé" });
    }
};

export async function listMedecinsByID(req : Request , res:Response) : Promise<void>{
    const id = req.params.id;
    const medecin = await medecinService.getMedecinByID(id);
    if(medecin){
        res.json(medecin);
    }
    else{
        res.status(404).json({ message: "Médecin non trouvé" });
    }
};

export async function createMedecin(req: Request , res:Response) : Promise<void>{
    const data = req.body;
    const newMedecin = await medecinService.createMedecin(data);
    if (newMedecin) {
        res.json(newMedecin);
    }
    else{
        res.status(500).json({ message: "Erreur lors de la création du médecin" });
    }
};

export async function updateMedecinByID(req: Request , res:Response) : Promise<void>{
    const id = req.params.id;
    const data = req.body;
    const updateMedecin = await medecinService.updateMedecinByID(id, data);
    if (updateMedecin) {
        res.json(updateMedecin);
    }
    else{
        res.status(500).json({ message: "Erreur lors de la mise à jour du médecin" });
    }
};

export async function deleteMedecinByID(req: Request , res:Response) : Promise<void>{
    const id = req.params.id;
    const deleteMedecin = await medecinService.deleteFamilleByID(id);
    if(deleteMedecin){
        res.json(deleteMedecin);
    }
    else{
        res.status(500).json({ message: "Erreur lors de la suppression du médecin" });
    }
};