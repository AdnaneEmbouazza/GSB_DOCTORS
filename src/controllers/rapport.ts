import { Request, Response } from "express";
import * as rapportService from "../services/rapport";

export async function listAllRapport (req:Request , res : Response) : Promise<void> {
    const rapport = await rapportService.getAllRapports();
    if(rapport){
        res.json(rapport);
    }
    else{
        res.status(404).json({ message: "Aucun rapport trouvé" });
    }
};

export async function listRapportByID(req : Request , res : Response) : Promise<void> {
    const {id} = req.params;
    const rapport = await rapportService.getRapportByID(id);

    if (rapport){
        res.json(rapport);
    }
    else {
        res.status(404).json({ message: "Rapport non trouvé" });
    }
};

export async function createRapport(req : Request , res : Response) : Promise<void> {
    const data = req.body;
    const rapport = await rapportService.createRapport(data);

    if (rapport){
        res.json(rapport);
    }
    else {
        res.status(500).json({ message: "Erreur lors de la création du rapport" });
    }
};

export async function updateRapportByID(req : Request , res : Response) : Promise<void> {
    const {id} = req.params;
    const  data =req.body;
    const rapport = await rapportService.updateRapportByID(id , data);

    if (rapport){
        res.json(rapport);
    }
    else {
        res.status(500).json({ message: "Erreur lors de la mise à jour du rapport" });
    }
};

export async function deleteRapportByID(req: Request , res:Response) : Promise<void> {
    const {id} = req.params;
    const rapport = await rapportService.deleteRapportByID(id);

    if (rapport){
        res.json(rapport);
    }
    else {
        res.status(500).json({ message: "Erreur lors de la suppression du rapport" });
    }
};