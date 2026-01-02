# TaskFlow - Gestionnaire de Projets et Tâches

TaskFlow est une Single Page Application (SPA) développée avec Vue.js 3 qui permet aux utilisateurs de gérer leurs projets et tâches quotidiennes. L'application utilise Firebase pour l'authentification, la base de données et l'hébergement.
## URL de l'application 
L'application sera accessible sur https://vue-kanban-15ca8.web.app
## 🚀 Fonctionnalités

### Module d'Authentification
- ✅ Inscription/Connexion avec email et mot de passe
- ✅ Connexion sociale avec Google (Google Auth Provider)
- ✅ Protection des routes (Navigation Guards)
- ✅ Déconnexion sécurisée

### Tableau de Bord (Dashboard)
- ✅ Affichage de la liste des projets créés par l'utilisateur
- ✅ Création de nouveaux projets (Nom, Description, Couleur distinctive)
- ✅ Modification des métadonnées d'un projet
- ✅ Suppression de projets

### Gestion des Tâches
- ✅ Vue Kanban avec 3 colonnes : À faire (To Do), En cours (Doing), Terminé (Done)
- ✅ Ajout de tâches (Titre, description, date limite)
- ✅ Modification du statut d'une tâche
- ✅ Suppression de tâches
- ✅ Synchronisation en temps réel (Firestore onSnapshot)

## 🛠️ Technologies Utilisées

- *Vue.js 3* (Composition API, Script Setup)
- *Vue Router* pour la navigation
- *Pinia* pour la gestion d'état
- *Firebase Authentication* (Email/Password & Google)
- *Cloud Firestore* pour la base de données temps réel
- *Tailwind CSS* pour le style
- *Vite* comme outil de build

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Un compte Firebase avec un projet configuré

## 🔧 Installation

1. *Cloner le dépôt*
   bash
   ```
   git clone https://github.com/zineb-elarbaoui/TaskFlow-manager.git
   cd taskflow-starter
   ```

3. *Installer les dépendances*
   bash
   ```
   npm install
   ```


## 🚀 Lancement en Développement

bash
```
npm run dev
```

L'application sera accessible sur http://localhost:5173


## 📁 Structure du Projet

```
taskflow-starter/
├── src/
│   ├── assets/          # Fichiers statiques (CSS)
│   ├── components/      # Composants Vue réutilisables
│   │   ├── AppNavbar.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── ProjectModal.vue
│   │   └── TaskCard.vue
│   ├── firebase/        # Configuration Firebase
│   │   └── config.js
│   ├── router/          # Configuration Vue Router
│   │   └── index.js
│   ├── stores/          # Stores Pinia
│   │   ├── authStore.js
│   │   ├── projectStore.js
│   │   └── taskStore.js
│   ├── views/           # Vues (pages)
│   │   ├── AuthView.vue
│   │   ├── DashboardView.vue
│   │   ├── HomeView.vue
│   │   └── ProjectDetails.vue
│   ├── App.vue          # Composant racine
│   └── main.js          # Point d'entrée
├── index.html
├── package.json
├── vite.config.js
└── README.md
```


## 🎯 Utilisation

1. *Inscription/Connexion*
   - Accédez à la page d'authentification
   - Créez un compte ou connectez-vous avec email/mot de passe
   - Ou utilisez la connexion Google

2. *Créer un Projet*
   - Sur le Dashboard, cliquez sur "Nouveau Projet"
   - Remplissez le formulaire (nom, description, couleur)
   - Cliquez sur "Créer"

3. *Gérer les Tâches*
   - Ouvrez un projet depuis le Dashboard
   - Ajoutez des tâches avec le formulaire
   - Déplacez les tâches entre les colonnes (À faire, En cours, Terminé)
   - Supprimez les tâches terminées

## 🔄 Synchronisation Temps Réel

L'application utilise les onSnapshot de Firestore pour la synchronisation en temps réel. Si vous ouvrez l'application sur plusieurs onglets, les modifications apparaîtront immédiatement sur tous les onglets.

## 📝 Notes

- Les projets sont associés à l'utilisateur qui les crée
- Les tâches sont stockées dans une sous-collection de chaque projet
- Toutes les opérations sont sécurisées par les règles Firestore

