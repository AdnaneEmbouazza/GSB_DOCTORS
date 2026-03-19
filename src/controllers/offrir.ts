import { Request, Response } from "express";
import * as offrirService from "../services/offrir";

export async function listAllOffre (req : Request , res : Response) : Promise<void> {
    const offre = await offrirService.getAllOffre();
    if(offre){
        res.json(offre);
    }
    else{
        res.status(404).json({ message: "Aucune offre trouvée" });
    }
};

export async function listOffreByID (req : Request , res: Response) : Promise<void> {
    const {id} = req.params;
    const offre = await offrirService.getOffreByID(id);
    if(offre){
        res.json(offre);
    }
    else{
        res.status(404).json({ message: "Offre non trouvée" });
    }
};

export async function createOffre(req : Request , res:Response) : Promise<void> {
    const data = req.body;
    const offre = await offrirService.createOffre(data);

    if(offre){
        res.json(offre);
    }
    else{
        res.status(500).json({ message: "Erreur lors de la création de l'offre" });
    }
};

export async function updateOffreByID(req: Request , res: Response) : Promise<void> {
    const {id} = req.params;
    const data = req.body;
    const offre = await offrirService.updateOffreById(id , data);

    if (offre){
        res.json(offre);
    }
    else{
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'offre" });
    }
};

export async function deleteOffreByID(req : Request , res: Response) : Promise<void> {
    const {id} = req.params;
    const offre = await offrirService.deleteOffreByID(id);

    if(offre){
        res.json(offre);
    }
    else {
        res.status(500).json({ message: "Erreur lors de la suppression de l'offre" });
    }
};