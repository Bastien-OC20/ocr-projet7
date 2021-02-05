# Réseau social d'entreprise Groupomania

## Groupomania API

Cette api qui permet de:

- S'inscrire et de rejoindre le réseau social de l'entreprise Groupomania
- se connecter
- ajouter un messages avec média
- modifier un message
- ajouter un commentaire
- modifier un commentaire
- accèder à son compte
- supprimer son compte

## Comment utiliser cette API?

clonner cet repository :

      git clone https://github.com/Bastien-OC20/ocr-projet7.git

## Pour lancer le serveur Nodejs

Executez ces lignes dans le terminal :

      cd backend/
      npm install
      node server

## Pour lancer le projet back-end

Dans un second terminal, executez ces lignes :

      cd Back-end/
      npm install
      npm run server

## Technique utilise

Cette api est développé sur NODEJS en utilisant ExpressJS.
la Base de donnée : MySql

## les routes/url et endpoints de l'API

### - POST : /api/auth/signup {email, password}

        : Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données
        > message: 'Nouvel(le) utilisateur(rice) créé(e) !'

### - POST : /api/auth/login {email, password, username}

        : Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé (contenant également l'identifiant userID)
        > message: 'Utilisateur(rice) connecté(e) !'

### - GET : /api/messages

        : Renvoie le tableau de toutes les messages dans la base de données
        > tableau des messages

### - GET : /api/users/:id

        : renvoie au profil avec l'ID fourni
        > profil unique

### - PUT : /api/users/:id

        : Modifie le profil de l'utilisateur'

### - DELETE : /api/users/:id

        : supprimer la profil avec l'ID fourni
        > message: 'compte supprimé !'

### - POST : /api/messages/:id/comment

        : Ajout d'un commentaire

#### project backend

     https://github.com/OpenClassrooms-Student-Center/dwj-projet7
