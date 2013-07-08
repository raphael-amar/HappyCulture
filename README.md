HappyCulture
============

HappyCulture est un site responsive qui présente les événements culturels de la ville de Montpellier.

### Mise en route :

HappyCulture utilise des scripts php qui vont chercher les informations du site internet de l'office du tourisme et de l'api de Cibul. Pour que ces scripts écrivent correctement dans les dossiers correspondants du projets, vous devez changer les droits du dossier cache ainsi que des sous dossier : 

Si vous êtes sous Unix : 

* chown -R www-data:www-data cache

Si vous êtes sous Windows :

* changez dans l'onglet securité (clic droit, propriété sur votre dossier) les droits d'écriture en les attribuants à tous les utilisateur.

### Fonctionnement général des scripts :

Le script ot_parse.php va récupérer les informations contenus dans le site internet de l'office du tourisme et remplir un fichier otcache.json se trouvant dans cache/JSON les informations au format json contenues dans ce fichier suivent une structure semblable à celle de l'api de cibul.net

Le script cibul_parse.php va utiliser l'api offerte pour les développeurs de Cibul et à partir d'un rayon et d'une intervalle de distance donnée (10000 Mètres), nous allons récupérer tous les spectacles de ce rayon à partir d'une longitude et latitude de départ (equivalent du centre de Montpellier). Il va ensuite remplir le fichier cibulcache.json se trouvant dans cache/JSON.

Le script fileSynchronise.php va se charger de synchroniser tous les fichiers contenus dans cache/JSON pour en faire un seul fichier se trouvant dans cache/ et se nommant allcontent.json.

Enfin, le controller.php sera utilisés avec deux paramètre ("row_count" et "offset") qui permettra de renvoyer à partir du fichier allcontent.json un nombre d'évènements (row_count) à partir de l'élément (offset).

Si vous voulez rajouter d'autres scripts php, il vous suffit juste de se conformer à la syntaxe générale des fichiers et mettre un fichier .json dans cache/JSON et fileSynchonise se chargera du reste. 

Pour mettre à jour les informations d'HappyCulture, il faut automatiser l'appel aux scripts php. il faut savoir que fileSynchonise.php attend la fin de ot_parse.php et cibul_parse.php avant de se lancer. Si une thread est en cours, fileSynchronise se met en attente pendant 10 secondes afin d'attendre que les parseurs aient finit leurs taches.

Pour le crontab, il faut appeller ot_parse.php | cibul_parse.php | fileSynchronise.php. A vous de définir la durée de mise à jour des scripts.

### Fonctionnement général du site : 

Le site internet est entièrement configurable. Le nom des catégories et le tri par catégorie est modifiable grâce à un plugin interne Jquery :

### pour rajouter une catégorie, il faut : 

1) rajouter dans index.html dans la balise d'id "options" une ligne de ce type :

<li><a href="#filter" data-option-value="macategorie" class="selected button orange glo\
ssy">Ma catégorie</a></li>
le data-option-value permettra de mettre en place les filtres dans le plugin isotope. 

2) Définir lors de la génération des évènements de façon dynamique dans le fichier js/sorting.js ligne 337 la catégorie auquel appartient votre évènement. Si cela est une catégorie "macatégorie", il n'y aura qu'à mettre "macategorie" ( exemple : data-categorie="macategorie" dans un div )

### Modèle de donée 

Toutes les données qui proviennent du fichier allcontent.json ou d'autres fichiers que vous apportez dans l'application dans le but de rajouter du contenu sont modifiables en local. 

Voici l'exemple d'un modèle de donnée dans HappyCulture :

var structureCibulEventObject = {
	"uid"	: "id",
	"freeText fr" : "subdescription",
	"description fr" : "description",
	"tags fr" : "tags",
	"title fr" : "title",
	"image" : "picture"
};

var structureCibulLocationObject = {
	"placename" : "placename",
	"longitude" : "longitude",
	"latitude" 	: "latitude"
};


var relations = {
	"locations": "FormatedLocations",
	"dates" : "FormatedDates"
};

function FormatedLocations() {
	this.placename;
	this.longitude;
	this.latitude;
	this.dates = new Array();
	this.relations = relations;
	this.structure = structureCibulLocationObject;
}

function FormatedEvent() {
	this.id;
	this.title = "Titre en cours de construction";
	this.subtitle = "Pas encore de sous titre pour cet évènement";
	this.description = "Pas encore de description";
	this.subdescription = "Pas encore de description secondaire";
	this.tags;
	this.picture = "img/default.jpg";
	this.smallpicture;
	this.locations = new Array();
	this.relations = relations;
	this.structure = structureCibulEventObject;
	this.isSet = function (field) {
		if (field === "undefined" || (field.length && field.length == 0))
			return false;
		return true;
	};
}

Il faut obligatoirement définir les relations dans le cas ou un objet à des relations avec un autre objet. 
dans le stuctureCibulEventObject, le premier paramètre est le champs attendu. pour "freeText fr" cela signifie que l'objet freeText contient un objet fr. Lorsque l'on associe cela à subdescription, l'algorithme de modélisation d'objet va récupérer le contenu de l'objet fr dans l'objet freeText et l'assigner au champ subdescription de l'objet FormatedEvent. Pour les relations multiple, il faut de la même façon définir le modèle de donnée et tout est configurable de la même manière que pour l'objet FormatedEvent.


### Génération de contenu dynamiquement

Pour pouvoir dynamiquement générer du contenu dans HappyCulture, rendez vous dans js/sorting.js à partir de la ligne 251. Les fonctions generateHTMLEvents génèrent le code html à partir d'un objet formaté précédemment (cf : formatAjaxData) et la fonction getAjaxData permet de récupérer les données non formatées renvoyées par le controller.php vu précédemment.

### Gestion du cache

Le cache se met en place dynamiquement au fur et à mesure que le client parcourt les évènements. Ceci se fait dans le localStorage à partir de la ligne 256 dans le fichier js/sorting.js