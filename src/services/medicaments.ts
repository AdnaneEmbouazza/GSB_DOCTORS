import { Medicament } from '../client/generated/prisma';
//import {prisma} from "prisma";
import { CreateMedicamentDTO , UpdateMedicamentDTO} from '../models/medicaments';

export function getAllMedicaments(): Promise<Medicament[]> {

};

export function getMedicamentByID (id: string): Promise<Medicament> {

};

export function createMedicament (data: CreateMedicamentDTO): Promise<Medicament> {

};

export function updateMedicamentByID (id: string, data: UpdateMedicamentDTO): Promise<Medicament> {

};

export function deleteMedicamentByID (id: string ): Promise<Medicament> {

};


