/**
 * Fonctions pour les appels API vers le backend GSB Doctors
 */

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Récupère tous les médecins
 * @returns {Promise<Array>} Liste de tous les médecins
 */
export async function fetchMedecins() {
    try {
        const response = await fetch(`${API_BASE_URL}/medecins`);
        
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des médecins:', error);
        throw error;
    }
}

/**
 * Récupère un médecin spécifique par son ID
 * @param {number} id - L'ID du médecin
 * @returns {Promise<Object>} Les données du médecin
 */
export async function fetchMedecinById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/medecins/${id}`);
        
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erreur lors de la récupération du médecin ${id}:`, error);
        throw error;
    }
}

/**
 * Recherche des médecins par nom
 * @param {string} nom - Le nom du médecin à rechercher
 * @returns {Promise<Array>} Liste des médecins correspondant à la recherche
 */
export async function searchMedecins(nom) {
    try {
        const response = await fetch(`${API_BASE_URL}/medecins/search?nom=${encodeURIComponent(nom)}`);
        
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erreur lors de la recherche des médecins:`, error);
        throw error;
    }
}
