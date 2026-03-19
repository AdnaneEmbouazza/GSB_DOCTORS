import { Request, Response } from "express";
import * as medicamentsServices from "../services/medicaments";

export async function listAllMedicaments(req: Request , res:Response) : Promise<void>{
    const medicaments = await medicamentsServices.getAllMedicaments();
    if (medicaments){
        res.json(medicaments);
    }
    else{
        res.status(404).json({ message: "Aucun médicament trouvé" });
    }
};

export async function listAllMedicamentsByID(req: Request , res:Response) : Promise<void>{
    const {id} = req.params;
    const medicament =await medicamentsServices.getMedicamentByID(id);
    if (medicament){
        res.json(medicament);
    }
    else{
        res.status(404).json({ message: "Médicament non trouvé" });
    }
};

export async function createMedicament(req: Request , res:Response) : Promise<void>{
    const data = req.body;
    const newMedicament = await medicamentsServices.createMedicament(data);
    if (newMedicament){
        res.json(newMedicament);
    }
    else{
        res.status(500).json({ message: "Erreur lors de la création du médicament" });
    }
};

export async function updateMedicamentByID(req: Request , res:Response) : Promise<void>{
    const {id} = req.params;
    const data = req.body;
    const updatedMedicament = await medicamentsServices.updateMedicamentByID(id, data);
    if (updatedMedicament){
        res.json(updatedMedicament);
    }
    else{
        res.status(500).json({ message: "Erreur lors de la mise à jour du médicament" });
    }
};

export async function deleteMedicamentByID(req: Request , res:Response) : Promise<void>{
    const {id} = req.params;
    const deleteMedicamentByID = await medicamentsServices.deleteMedicamentByID(id);
    if(deleteMedicamentByID){
        res.json(deleteMedicamentByID);
    }
    else{
        res.status(500).json({ message: "Erreur lors de la suppression du médicament" });
    }
};