const API_BASE = 'http://localhost:3000/api';

// Login
async function handleLogin(e) {
    e.preventDefault();
    
    const login = document.getElementById('login-username').value.trim();
    const mdp = document.getElementById('login-password').value.trim();
    
    if (!login || !mdp) {
        showError('login-error', 'Veuillez remplir tous les champs');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/visiteurs/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ login, mdp })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('login-error', 'Connexion réussie! Redirection...');
            // Le token est automatiquement enregistré dans un cookie HttpOnly par le serveur
            // Pas besoin de localStorage
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showError('login-error', data.message || 'Identifiants invalides');
        }
    } catch (error) {
        showError('login-error', 'Erreur de connexion: ' + error.message);
    }
}

// Signup
async function handleSignup(e) {
    e.preventDefault();
    
    const login = document.getElementById('signup-login').value.trim();
    const mdp = document.getElementById('signup-password').value.trim();
    const mdpConfirm = document.getElementById('signup-password-confirm').value.trim();
    const nom = document.getElementById('signup-nom').value.trim();
    const prenom = document.getElementById('signup-prenom').value.trim();
    const adresse = document.getElementById('signup-adresse').value.trim();
    const cp = document.getElementById('signup-cp').value.trim();
    const ville = document.getElementById('signup-ville').value.trim();
    
    // Validation
    if (!login || !mdp) {
        showError('signup-error', 'Login et mot de passe sont obligatoires');
        return;
    }
    
    if (mdp !== mdpConfirm) {
        showError('signup-error', 'Les mots de passe ne correspondent pas');
        return;
    }
    
    if (mdp.length < 4) {
        showError('signup-error', 'Le mot de passe doit faire au moins 4 caractères');
        return;
    }
    
    try {
        const payload = { login, mdp };
        if (nom) payload.nom = nom;
        if (prenom) payload.prenom = prenom;
        if (adresse) payload.adresse = adresse;
        if (cp) payload.cp = cp;
        if (ville) payload.ville = ville;
        
        const response = await fetch(`${API_BASE}/visiteurs/inscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('signup-error', 'Inscription réussie! Redirection vers la connexion...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            showError('signup-error', data.message || 'Erreur lors de l\'inscription');
        }
    } catch (error) {
        showError('signup-error', 'Erreur: ' + error.message);
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        element.className = 'form-message error';
    }
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        element.className = 'form-message success';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});
