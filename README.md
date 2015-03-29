![open-beer logo](http://open-beer.kobject.net/img/logo.png "open-beer logo")
#my-open-beer-angular
AngularJs project with API Rest access
#Howto

- [x] fork your own copy of this repository.
- [x] read the project specifications : [Open-beer project specifications](http://slamwiki.kobject.net/slam4/richclient/angularjs/project/openbeerdatabase/)

Ce projet a Ã©tÃ© rÃ©alisÃ© par :
	Alexis Lagoutte (Pseudonyme GitHub : Senekfirst)
	Paul Lemesnager (Pseudonyme GitHub : PaulLmsg)
	
Tout d'abord, ayant eu de nombreux problèmes avec GitHub (Paul Lemesnager) les commits ont tous été effectué par Alexis, je lui passer mon travail par clé pour qu'il puisse mettre à jour le projet.

L'application my-open-beer-angular permet la consultation en ligne de plusieurs brasseries ainsi que les bières qu'elles proposent qui sont récupérées depuis une API REST en ligne. Lorque l'utilisateur est connecté il peut également ajouté des brasseries ou des bières. 

	
Nous allons maintenant détailler d'un point de vue technique puis fonctionnel les fonctionnalités implémentées dans l'application.
	
	- La structure :
	
	L'application respecte le modèle MVC, les traitements sont séparés de la vue. Chaque fonctionnalité implémentée l'est par un contrôleur javascript qui contient toutes les fonctions nécessaires. On a donc, par exemple, un contrôleur pour l'affichage d'une bière, beerShowController (de même pour une brasserie), et le formulaire, et donc la vue, qui correspond, beerShowForm. On retrouvera la même chose pour la modification et l'ajout de bière et de brasserie ainsi que pour la configuration et la sauvegarde
	
	- Les modules :
	
	
	
	- Les contrôleurs :
		
		Comme dit précédemment chaque fonctionnalité est représentée par un controller, ici vont être détaillés chacun d'entre eux.
		
		- [x] beerAddController et brewerieAddController :
			- Ces contrôleurs concerne l'ajout de bière et de brasserie dans la base :
				- [x] ils récupèrent les données concernant les bières et les brasseries
				- [x] ils déterminent le formulaire qui doit être afficher (beer ou brewerieForm)
				- [x] il redirige l'utilisateur selon l'action qu'il fait (ajout, annulation,...)
				- [x] il insère la bière ou la brasserie dans la base en vérifiant si elle existe déjà et permet la sauvegarde l'opération si la bière ou la brasserie n'existe pas.
				
		- [x] beerShowController et brewerieShowController :
			- Ces contrôleurs concerne l'affichage de bière et de brasserie :
				- [x] ils vérifient si une bière ou une brasserie est active, sélectionnée
				- [x] ils déterminent le formulaire qui doit être afficher (beer ou brewerieShowForm)
				- [x] ils affichent dans le formulaire correspond les données de la bière ou de la brasserie active
				
		- [x] beerUpdateController et brewerieUpdateController :
			- Ces contrôleurs concerne la modification de bière et de brasserie dans la base :
				- [x] ils vérifient si une bière ou une brasserie est active, sélectionnée
				- [x] ils déterminent le formulaire qui doit être afficher (beer ou brewerieShowForm)
				- [x] ils modifient la bière ou la brasserie sélectionnée avec les informations remplies dans le formulaire et sauvegarde l'opération
				
		- [x] beerController et brewerieController :
			- Ces contrôleurs concerne la liste de bières et de brasseries :
				- [x] ils récupèrent les données concernant les bières et les brasseries
				- [x] ils regroupent toutes les fonctions pour le listage des bières ou des brasseries :
						- [x] suppression d'une ou plusieurs bières ou brasseries
						- [x] le tri par brasserie dans la liste des bières
						- [x] la redirection vers les formulaires de modification et d'affichage en détail
						- [x] le compte des bières ou brasseries sélectionnées
						- [x] l'affichage de message d'erreurs, de confirmations, ...
						- [x] le raffraichissement de la liste
						- [x] la selection de toutes les données 
						- [x] le filtre par nom
						- [x] une fonction permettant de cacher ou d'afficher les données supprimées 
		
		- [x] configController :
			- Ce controlleur concerne la page de configuration de l'application
				- [x] il détermine le formulaire qui doit être afficher (config)
				- [x] copie la configuration située dans la factory
				- [x] permet la modification de ces paramètres
		
		- [x] saveController :
			- Ce controlleur concerne la sauvegarde des opérations effectuées
			
		- [x] securityController : 
			- Ce controlleur concerne la connexion à l'application :
				- [x] il récupère les champs et vérifie si ils sont correctent
				- [x] il permet la deconnexion 
				- [x] il affiche les messages lors de la connexion et de la deconnexion
				
		- [x] mainController :
			- Ce controlleur regroupe quelques fonctions concernant les opérations
			
			
			
			
	- Les vues :
		
		Les vues sont les formulaires et les pages que l'on affiche dans l'application.
		
		- [x] beerForm et brewerieForm :
			Ceux sont les formulaires utilisés pour l'ajout d'une bière ou d'une brasserie, on y retrouve les champs obligatoires pour l'ajout d'une données et la date de création entrée par l'horloge
				![open-beer formulaire](screenshots/beerFormulaire.png "open-beer form")
		
		- [x] beerShowForm et brewerieShowForm :
			Ceux sont les formulaires utilisés pour la modification et l'affichage en détail d'une bière ou d'une brasserie, on y retrouve tous les champs de ces données :
				![open-beer Showformulaire](screenshots/beerShowFormulaire.png "open-beer show")
				
		- [x] main (beers et breweries) :
			Ceux sont les formulaires utilisés pour lister les données, on y retrouve des boutons pour afficher en détail, modifier la donnée sélectionnée, le filtre... . Pour celui de de bières il y a aussi un tableau qui s'affiche lorsqu'on souhaite afficher par brasseries :
				![open-beer mainFormulaire](screenshots/mainFormulaire.png "open-beer main")
				
		- [x] main :
			C'est le formulaire de la page d'accueil avec les boutons pour accéder aux listes, aux ajouts des données, aux opérations en attente et à la configuration : 
				![open-beer accueil](screenshots/accueil.png "open-beer accueil")
		
		- [x] configuration :
			C'est le formulaire de la page de configuration, y est affichée la configuration actuelle et les boutons permettant le retour et celui de la sauvegarde en cas de modification
				![open-beer config](screenshots/configuration.png "open-beer config")
				
		- [x] saveMain :
			C'est le formulaire qui affiche les opérations en attentes et des données la concernant qui peuvent être filtrées. On peut confirmer ou supprimer l'opération avec les boutons correspondant :
				![open-beer save](screenshots/save.png "open-beer save")
				
	- Les services :
		
		Les services regroupent les fonctions que l'on utilise dans les contrôleurs.
		
		- [x] rest est le service pour l'accès aux données il contient les fonctions pour supprimer, récuperer et ajouter des données (ici des bières et des brasseries)
		
		- [x] save est le service regroupant les fonctions utilisées pour les opérations c'est à dire l'ajout et l'execution d'une ou plusieurs opérations.
		
	D'un point de vue fonctionnel :
	
	Voici toutes les fonctionnalités implémentées dans notre application :
		- [x]  l'affichage de la liste des biÃ¨res
		- [x]  l'ajout d'une biÃ¨re (il devrait fonctionner)
		- [x]  la modification d'une biÃ¨re
		- [x]  la suppression d'une biÃ¨re
		- [x]  l'affichage d'une biÃ¨re (avec son nom de brasserie)
		- [x]  la connexion (simulÃ©e, pas de base pour se connecter)
		- [x]  le vÃ©rouillage de certains boutons en cas de non-connexion
		- [x]  la dÃ©connexion
		
	