import { Request, Response } from "express";
import * as familleService from "../services/famille";

export async function listAllFamilles(req: Request, res: Response) : Promise<void>{
  const familles = await familleService.getAllFamilles();
  if(familles){
    res.json(familles);
  }
  else{
    res.status(404).json({ message: "Aucune famille trouvée" });
  }
};

export async function listFamilleByID(req: Request, res: Response) : Promise<void>{
    const {id} = req.params;
    const famille = await familleService.getFamilleByID(id);
    if (famille) {
        res.json(famille);
    } else {
        res.status(404).json({ message: "Famille non trouvée" });
    }
};

export async function createFamille (req: Request, res: Response) : Promise<void>{
    const data = req.body;
    const newFamille = await familleService.createFamille(data);
    if (newFamille) {
        res.json(newFamille);
    }
    else{
        res.status(500).json({ message: "Erreur lors de la création de la famille" });
    }
};

export async function updateFamilleByID (req: Request, res: Response) : Promise<void>{
    const {id} = req.params;
    const data = req.body;
    const updatedFamille = await familleService.updateFamilleByID(id, data);
    if (updatedFamille) {
        res.json(updatedFamille);
    } else {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la famille" });
    }
};

export async function deleteFamilleByID (req: Request , res: Response) : Promise<void>{
    const {id} = req.params;
    const deleteFamilleByID = await familleService.deleteFamilleByID(id);
    if (deleteFamilleByID) {
        res.json(deleteFamilleByID);
    } else {
        res.status(500).json({ message: "Erreur lors de la suppression de la famille" });
    }
};