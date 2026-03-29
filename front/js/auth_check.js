// Gestion de la navbar selon l'état d'authentification

async function checkAuthStatus() {
    try {
        // Appeler la route protégée /api/visiteurs/account pour vérifier l'authentification
        // Cette route utilise le middleware isLoggedOn et retourne 401 si non authentifié
        const response = await fetch('http://localhost:3000/api/visiteurs/account', {
            method: 'GET',
            credentials: 'include', // Envoie les cookies (token)
            headers: { 'Content-Type': 'application/json' }
        });
        
        return response.ok; // true si authentifié (200), false sinon (401, etc)
    } catch (error) {
        console.error('Erreur lors de la vérification d\'authentification:', error);
        return false;
    }
}

async function updateNavbarAuth() {
    const isAuthenticated = await checkAuthStatus();
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const accountBtn = document.getElementById('account-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (isAuthenticated) {
        // Utilisateur connecté
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
        if (accountBtn) accountBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        // Utilisateur déconnecté
        if (loginLink) loginLink.style.display = 'block';
        if (signupLink) signupLink.style.display = 'block';
        if (accountBtn) accountBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

function handleLogout() {
    // Confirmation avant déconnexion
    if (!confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        return; // Annuler la déconnexion
    }
    
    fetch('http://localhost:3000/api/visiteurs/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    }).then(() => {
        updateNavbarAuth();
        window.location.href = 'index.html';
    }).catch(error => {
        console.error('Erreur lors de la déconnexion:', error);
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavbarAuth();
    
    const accountBtn = document.getElementById('account-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Bouton Mon Compte - redirection vers la page compte
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            window.location.href = 'account.html';
        });
    }
    
    // Bouton Déconnexion
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
