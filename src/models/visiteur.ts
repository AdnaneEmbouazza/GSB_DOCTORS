
export interface Visiteur {
  id: number;
  nom: string | null;
  prenom: string | null;
  login: string;
  mdp: string;
  adresse: string | null;
  cp: string | null;
  ville: string | null;
  dateEmbauche: Date | null;
  refreshToken: string | null;
};

export interface LoginDTO {
  login: string;
  mdp: string;
};

// Pour la création (POST)
export interface CreateVisiteurDTO {
  nom: string;
  prenom: string;
  login: string;
  mdp: string;
  adresse: string;
  cp: string;
  ville: string;
  dateEmbauche: string;
  // ID auto incrémenté
};

// Pour la modification (PUT/PATCH)
export interface UpdateVisiteurDTO {
  nom?: string;
  prenom?: string;
  login?: string;
  mdp?: string;
  adresse?: string;
  cp?: string;
  ville?: string;
  dateEmbauche?: string;
  // ID non modifiable
};