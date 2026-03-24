import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../error";
import { verifyAccessToken, extractTokenFromHeader, TokenPayload } from "../utils/token";

// Étendre le type Request pour ajouter les données du visiteur
declare global {
    namespace Express {
        interface Request {
            visiteur?: TokenPayload;
        }
    }
}

/**
 * MIDDLEWARE POUR VERIFIER SI L'UTILISATEUR EST CONNECTE AVANT D'ACCEDER A CERTAINES ROUTES
 * Extrait le token JWT du header Authorization et le valide
 * Ajoute les données du visiteur à req.visiteur si valide
 */
export const isloggedOn = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            throw new UnauthorizedError('Token d\'authentification manquant');
        }

        const payload = verifyAccessToken(token);
        req.visiteur = payload;
        
        next();
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            throw error;
        }
        throw new UnauthorizedError(error instanceof Error ? error.message : 'Authentification échouée');
    }
};
