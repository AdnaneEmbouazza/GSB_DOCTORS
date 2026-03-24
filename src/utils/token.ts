import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const TOKEN_EXPIRY = '15m'; // 15 minutes

export interface TokenPayload {
    id: number;
    login: string;
}

/**
 * Génère un token JWT d'accès
 * @param payload - données à encoder dans le token
 * @returns token JWT signé
 */
export function generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRY,
        algorithm: 'HS256'
    });
}

/**
 * Vérifie et décode un token JWT
 * @param token - token à vérifier
 * @returns payload décodé si valide
 * @throws erreur si token invalide ou expiré
 */
export function verifyAccessToken(token: string): TokenPayload {
    try {
        // Vérifier le token et décoder le payload => valider la signature et vérifier l'expiration
        const decoded = jwt.verify(token, JWT_SECRET, {
            algorithms: ['HS256']
        });
        
        // TypeScript assertion
        return decoded as TokenPayload;
        
        //gestion erreur 401 (token invalide ou expiré)
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expiré');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token invalide');
        }
        throw error;
    }
}

/**
 * Extrait le token du header Authorization
 * @param authHeader - valeur du header Authorization (ex: "Bearer token...")
 * @returns token sans le "Bearer " prefix
 */
export function extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) return null;
    
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
        return parts[1];
    }
    
    return null;
}
