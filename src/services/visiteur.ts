import { Visiteur } from "@prisma/client";
import prisma from "../prisma";
import {CreateVisiteurDTO , UpdateVisiteurDTO } from "../models/visiteur";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { generateAccessToken, verifyAccessToken, TokenPayload } from "../utils/token";
import { UnauthorizedError, NotFoundError } from "../error";

// getAllVisiteurs : renvoie une liste de tous les visiteurs
export function getAllVisiteurs(): Promise<Visiteur[]> {
    return prisma.visiteur.findMany();
}

// getCurrentVisiteur : renvoie le visiteur actuellement connecté en fonction de l'ID du token
export async function getCurrentVisiteur(payload: TokenPayload): Promise<Visiteur | null> {
    return prisma.visiteur.findUnique({
        where: { id: payload.id }
    });
}

// getVisiteurByID : renvoie un visiteur en fonction de son ID
export function getVisiteurByID (id: number): Promise<Visiteur | null> {
    return prisma.visiteur.findUnique({
        where: { id }
    });
}

// createVisiteur : crée un nouveau visiteur à partir des données fournies
export async function createVisiteur (data: CreateVisiteurDTO): Promise<Visiteur> {
    // Hasher le mot de passe avant de le stocker
    const hashedPassword = await hashPassword(data.mdp);
    
    return prisma.visiteur.create({
        data: {
            nom: data.nom,
            prenom: data.prenom,
            login: data.login,
            mdp: hashedPassword,
            adresse: data.adresse,
            cp: data.cp,
            ville: data.ville,
            dateembauche: data.dateembauche
        }
    });
}

// updateVisiteurByID : met à jour un visiteur existant en fonction de son ID et des données fournies
export function updateVisiteurByID (id: number, data: UpdateVisiteurDTO): Promise<Visiteur> {
    return prisma.visiteur.update({
        where: { id },
        data: {
            nom: data.nom,
            prenom: data.prenom,
            login: data.login,
            mdp: data.mdp,
            adresse: data.adresse,
            cp: data.cp,
            ville: data.ville,
            dateembauche: data.dateembauche
        }
    });
}

// deleteVisiteurByID : supprime un visiteur en fonction de son ID
export function deleteVisiteurByID (id: number): Promise<Visiteur> {
    return prisma.visiteur.delete({
        where: { id }
    });
}

// login : authentifie un visiteur avec login et mot de passe, retourne un token JWT
export async function login(login: string, mdp: string): Promise<string> {
    // Chercher le visiteur par login
    const visiteur = await prisma.visiteur.findUnique({
        where: { login }
    });

    if (!visiteur) {
        throw new UnauthorizedError('Login ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await comparePassword(mdp, visiteur.mdp);
    if (!isPasswordValid) {
        throw new UnauthorizedError('Mot de passe incorrect');
    }

    // Générer et retourner le token JWT
    const token = generateAccessToken({
        id: visiteur.id,
        login: visiteur.login
    });

    return token;
}