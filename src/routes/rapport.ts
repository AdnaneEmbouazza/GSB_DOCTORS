import { Router } from "express";
import * as rapportControleur from "../controllers/rapport";

const router = Router();

router.get('/rapports' , rapportControleur.listAllRapport)

router.get('/rapport/:id' , rapportControleur.listRapportByID)

router.post('/rapport' , rapportControleur.createRapport)

router.put('/rapport/:id' , rapportControleur.updateRapportByID)

router.delete('/rapport/:id' , rapportControleur.deleteRapportByID)

export default router;