/**
 * Expression régulière pour valider les mots de passe aux normes de sécurité
 * Critères :
 * - Minimum 12 caractères
 * - Au moins une majuscule
 * - Au moins une minuscule
 * - Au moins un chiffre
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/;

/**
 * Valide un mot de passe selon les critères de sécurité
 * @param password - mot de passe à valider
 * @returns true si le mot de passe respecte les critères, false sinon
 */
export function validatePassword(password: string): boolean {
    return PASSWORD_REGEX.test(password);
}

/**
 * Retourne un message d'erreur détaillé si le mot de passe ne respecte pas les critères
 * @param password - mot de passe à valider
 * @returns un objet avec isValid et un message d'erreur le cas échéant
 */
export function getPasswordValidationError(password: string): { isValid: boolean; message?: string } {
    if (!password) {
        return { isValid: false, message: 'Le mot de passe est requis' };
    }

    if (password.length < 12) {
        return { isValid: false, message: 'Le mot de passe doit contenir au minimum 12 caractères' };
    }

    if (!/[A-Z]/.test(password)) {
        return { isValid: false, message: 'Le mot de passe doit contenir au moins une majuscule' };
    }

    if (!/[a-z]/.test(password)) {
        return { isValid: false, message: 'Le mot de passe doit contenir au moins une minuscule' };
    }

    if (!/\d/.test(password)) {
        return { isValid: false, message: 'Le mot de passe doit contenir au moins un chiffre' };
    }

    return { isValid: true };
}
