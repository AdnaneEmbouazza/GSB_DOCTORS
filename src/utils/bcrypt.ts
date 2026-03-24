import bcrypt from 'bcrypt';

// Nombre de rounds pour le salage du mot de passe
const SALT_ROUNDS = 10;

/**
 * Hash un mot de passe de base en clair
 * @param plainPassword - mot de passe non hashé
 * @returns mot de passe hashé
 */
export async function hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Compare un mot de passe en clair avec son hash
 * @param plainPassword - mot de passe en clair
 * @param hashedPassword - mot de passe hashé
 * @returns true si les mots de passe correspondent
 */
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}
