import { Request, Response } from "express";
import * as medecinService from "../services/medecin.js";

export function listAllMedecins(req: Request , res:Response){
    const medecins = medecinService.getAllMedecins();
    if (medecins){
        res.json(medecins);
    }
};

export function listMedecinsByID(req : Request , res:Response){
    const id = req.params.id;
    const medecins = medecinService.getMedecinByID(id);
    if(medecins){
        res.json(medecins);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
};

export function createMedecin(req: Request , res:Response){
    const data = req.body;
    const newMedecin = medecinService.createMedecin(data);
    if (newMedecin) {
        res.json(newMedecin);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
};

export function updateMedecinByID(req: Request , res:Response){
    const id = req.params.id;
    const data = req.body;
    const updateMedecin = medecinService.updateMedecinByID(id, data);
    if (updateMedecin) {
        res.json(updateMedecin);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
};

export function deleteMedecinByID(req: Request , res:Response){
    const id = req.params.id;
    const deleteMedecin = medecinService.deleteFamilleByID(id);
    if(deleteMedecin){
        res.json(deleteMedecin);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
};