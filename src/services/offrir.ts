import { Offrir } from '../client/generated/prisma';
//import {prisma} from "prisma";
import { CreateOffrirDTO , UpdateOffrirDTO} from '../models/offrir';

export function getAllOffre(): Promise<Offrir[]> {

};

export function getOffreByID (idrapport: number, idmedicament: string): Promise<Offrir> {

};

export function createOffre (data: CreateOffrirDTO): Promise<Offrir> {

};

export function updateOffreById (idrapport: number, idmedicament: string, data: UpdateOffrirDTO): Promise<Offrir> {

};

export function deleteOffreByID (idrapport: number, idmedicament: string): Promise<Offrir> {

};
