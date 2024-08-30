latex leader:	mmd6-article-leader
latex begin:	mmd6-article-begin
latex footer:	mmd6-article-footer
Base Header level : 3

# Documentation du moteur d'altération


Le moteur d'altération permet au projet DApIA de générer des cas de tests. En
effet, le projet à pour but de détecter des attaques par injection de fausses
données dans le cadre du protocole ADS-B.
Pour pouvoir confirmer le bon fonctionnement des modèles de détection, il faut
pouvoir générer des données de tests, c'et-à-dire des fichiers ADS-B, dont les
données auraient été altérés. 

Le moteur d'altération sert donc à écrire les scénarios de générations des données altérées.
Celui-ci peut-être utilisé via une interface graphique, en utilisant un [>DSL],
ou directement via la librairie Typescript. 
Dans ce document, nous allons présenter son utilisation code source, via les
fonctionnalités offerte en Typescript.

## Utilisation du moteur en Typescript

Le moteur est basé sur un principe de primitives d'altérations qui sont combinées
pour créer des scénarios complexe d'attaque. 

Voici un exemple d'utilisation du moteur en Typescript : 
```Typescript
let engine = new Engine({
	actions : [
		replay({
			scope: timeWindow(start,end),
			source: source_adsb,
		}),
		alteration({
			scope: and(target("FA1312"), timeWindow(start, end)),
			property: "altitude",
			mode: AlterationMode.DRIFT,
			value -25,
		}),
]}).run(data)
```

Le moteur fonctionne en 2 temps, 
1. La déclaration des primitives d'altérations
2. L'exécution et le calcul des résultats

La déclaration se fait par la création d'un objet de type `Engine`. Pour
pouvoir créer cet objet, il faut lui définir des `actions` qui sont une liste
de primitives qui seront exécutés dans l'ordre.
La liste des fonctions de construction de primitive est présentée par la suite.

Une fois l'objet créé, la fonction `run(recording: Message[])` peut être appelée
sur un enregistrement représenté par une liste de messages. Cette fonction 
renvoie le résultat sous la forme d'un objet `EngineResult`. Cet objet offre
différentes fonctions de formatage pour pouvoir lire et obtenir l'enregistrement
altéré.

## Types de base du moteur

### Message 
Le type `Message` représente une entrée d'un fichier ADS-B. 
Il contient plusieurs champs détailés ci-dessous.
Pour plus d'information sur la signification de chaque champ, vous pouvez vous
renseigner sur [ce site](http://woodair.net/sbs/article/barebones42_socket_data.htm?fbclid=IwAR2lIfO8Del8pBA_L5mAZIwJGA8VIPwl6mLp8Gusd5dAvKijnnCARlzueOQ)

```Typescript
export type Message = {
	[index: string] : string | number | boolean | undefined, 

	messageType: 				string, 
	transmissionType: 	number, 
	sessionID: 					number,
	aircraftID: 				number,
	hexIdent: 					string,
	flightID: 					number
	timestampGenerated:	number, 
	timestampLogged: 		number,
	callsign?: 					string,
	altitude?: 					number,
	groundSpeed?: 			number,
	track?: 						number,
	latitude?: 					number,
	longitude?: 				number,
	verticalRate?: 			number,
	squawk?: 						number,
	alert?: 						boolean, 
	emergency?: 				boolean, 
	spi?: 							boolean,
	onGround?: 					boolean,
}
``` 
Un message peut facilement ajouter des champs, si ceux-ci sont définit dans le 
fichier ADS-B. 
La fonction `parse(source : string)` permet de transformer un enregistrement 
ADS-B, en une liste de messages.

### Scope

Le Scope est un type utilisé par les primitive d'altération pour savoir quel
message doit être ciblé ou non.
Voici la déclaration du type : 

``` 
export type Scope = (msg: Message) => boolean;
``` 

Il existe plusieurs scope prédéfinis, dont voici la liste : 

- `always : Scope` : cible tout les message
- `never : Scope` : ne cible aucun message
- `target(hexIdent: Icao): Scope` : permet de selectionner les message dont l'ICAO est équivalent à `hexIdent`
- `timeWindow(lower_bound: number, upper_bound: number): Scope` : permet de sélectionner les message dont la date 
d'émission (champ `timestampGenerated`) est comprise entre les deux bornes. Les valeurs de temps sont en milliseconde 
depuis Epoch
- `and(...scopes: Scope[]): Scope` : un message est ciblé, si l'ensemble des scopes en paramètre le cible
- `not(scope: Scope): Scope ` : un message est ciblé seulement si le scope en paramètre ne le cible pas

D'autre scope peuvent facilement être ajouté, en effet, le type Scope étant une fonction qui prend un message et renvoie
un booléen, l'utilisateurice peut facilement définir de nouveau Scope.

### Action

Le type `Action` est un type abstrait qui permet de représenter une primitive d'altération. 
Voici la déclaration du type : 

```Typescript
export type Action = {
	processing: (recording: Message[]) => Message[]
}
```

Pour le moment, une primitive d'altération est un objet qui possède au moins la méthode `processing()` qui 
prend un enregistrement, et retourne cet enregistrement altéré.

Pour définir une primitive d'altération, il faut donc renvoyer un objet contenant cette méthode.
Le code source peut servir d'exemple pour comprendre la logique interne de la librairie.

## Présentation des primitives d'altérations

Cette section présente les différentes primitives d'altération, qui combinées
permette de mettre en place un scénario d'altération.

### *alteration*, modification de propriété
La modification de propriété permet de modifier les valeurs des différents 
champs d'un enregistrement ciblé.

La fonction *alteration* permet de construire cette primitive. Celle-ci prend
en paramètre les variable de configuration suivante : 

```typescript
type AlterationConfig = {
	scope : Scope, 
	modifications: Modification[],
}

type Modification = {
	property: string, 
	value: number | string | boolean, 
	mode : AlterationMode,
}

enum AlterationMode = { REPLACE | OFFSET | DRIFT | NOISE }
``` 

La variable `property` permet de sélectionner le champ à modifier (voir la 
définition d'un message).
La variable `value` est la nouvelle valeur à utiliser, en fonction du mode
d'altération représenté par `mode`

Il existe 4 modes d'altérations : 

- **REPLACE** : remplace la valeur du champ par `value`;
- **OFFSET** : ajoute `value` au champ;
- **DRIFT** : fait "dévier" la valuer du champ de `value` à chaque pas de temps,
c'est-à-dire, ajouter au $i-ième$ message la valuer $i \times value$;
- **NOISE** : ajoute un bruit alératoire tiré entre $[-value, value]$.

### *creation*, création d'un avion fantôme
La création permet de calculer et de créer un avion "fantôme", qui suit une 
trajectoire paramétrée par des points de passages.

La fonction *creation()* permet de construire cette primitive. Celle-ci prend
en paramètre la configuration ci-dessous.

```Typescript
type CreationConfig = {
	start: number, 
	end: number, 
	tempalte: Template, 
	waypoints: Point[],

	timeOffset: () => number,
}
```

Les arguments `start` et `end` permettent de venir délimiter dans le temps la
création.
`template` permet de définir un pattern à respecter lors de la création d'un 
 nouveau message, cela permet de préremplir un champ pour les futurs messages.
`waypoints` est une liste de point de passage, définis par un quadruplet
`[lattitude, longitude, altitude, timestamp]`
`timeOffset` permet de définir la manière de décaler dans le temps les messages. 

### *cut*, suppression d'une sous-trajectoire, avec continuité
La primitive *cut* permet de supprimer une partie d'une trajectoire, et de
venir "recoller" la fin de la trajectoire juste avant la suppression.

La fonction `cut()` permet de construire cette primitive. Celle-ci prend en
paramètre la configuration ci-dessous.

```Typescript
type CutConfig = {
	start: number,
	end: number, 
	scope: Scope,
}
```

La fonction va supprimer les messages entre `start`et `end`, si ceux-ci sont 
ciblés par la fonction `scope`.

### *delete*, suppression de message
La suppression de message permet de retirer les messages ciblés à une certaine
fréquence.

La fonction `delete()` permet de construire cette primitive. Celle-ci prend en 
paramètre la configuration suivante : 

``` Typescript
type DeleteConfig = {
	scope: Scope, 
	frequency?: number,
}
``` 

Le paramètre `frequency` définit le nombre de message ciblé entre deux message
supprimé.


### *replay*, rejeu d'un enregistrement 
Le rejeu permet de réémettre des messages stockés dans un fichier ADS-B en 
adaptant la date d'émission pour coïncider avec le premier message ciblé.
Cela permet de venir faire croire qu'un aéronef refait un vol. Cette trame
peut être altérée par "modification de propriété" avant d'être inserée dans 
l'enregistrement cible.

La fonction `replay()` permet de construire cette primitive. Celle-ci prend
en paramètre la configuration suivante : 

```Typescript
type ReplayConfig = {
	scope: Scope, 
	source: readonly Message[],
	alterations?: readonly AlterationConfig[],
	offset?: number,
}
```

Les messages à rejouer sont stockés dans la variable `source`.
La variable `offset` permet de faire un décalage dans le temps par rapport au 
premier message ciblé par `scope`.
La variable `alterations` permet de définir plusieurs modifications de propriété
à appliquer avant l'insertion.


### *rotation*, faire pivoter la trajectoire
Pivoter une trajectoire permet de faire dévier la trajectoire cible d'un 
angle donné.

La fonction "rotation()" permet de construire cette primitive. Celle-ci 
prend en paramètres la configuration suivante :

```Typescript
type RotationConfig = {
	scope: Scope, 
	angle: number,
}
``` 

### *trajectoryModification*, détournement d'avion
Le détournement d'un avion permet de venir modifier la trajectoire de celui-ci,
pour le faire passer à certains points de passage.

La fonction `trajectoryModification()` permet de construire cette primitive. 
Celle-ci prend en paramètre la configuration suivante : 

```Typescript
type TrajectoryModificationConfig = {
	targets: string[],
	scope: Scope, 
	waypoints: Point[],
	allPlanes?: boolean
}
``` 

Les icaos avions ciblé par l'attaque sont contenus dans `targets`. Si `allPlanes`
est positionné à `true`, alors cette liste est ignorée et tout les avions
sont ciblés. 
Seuls les messages ciblés par `scope`, et dont l'ICAO est contenu dans la liste, 
seront modifiés.
Aucun nouveau message ne sera créé, seuls les messages existant seront modifiés
pour faire passer l'avion par les points de passages `waypoints`.


## Suites et améliorations du moteur d'altération

Le moteur d'altération est un outil intéressant pour analyser les données linéaire en ADS-B
et les altérées. Pour le moment le moteur avait pour but de venir remplacer une ancienne 
implémentation en Java. 

Il est cependant possible de penser à de nouvelles fonctionnalités et amélioration.

### Amélioration de l'existants

Certaines structures de données ont été choisie au début de l'implémentation du moteur et 
nécessiterait une refonte. 

Notamment les `Action` et `Scope` qui possède deux design différents. En effet, les `Action` sont
pensés comme étant des *commandes*, c'est-à-dire un objet qui contient les informations nécessaires
à une exécution. Cela permet de retarder l'exécution des primitives d'altération, de pouvoir garder
une trace des actions réalisés, des futures optimisations, etc ... 

À l'inverse, les `Scope` sont de simple fonction. Sachant que Typescript est un langage ayant 
des aspects fonctionnels, cela permet tout de même de stocker les informations 
nécessaires à l'exécution de la fonction, et de l'effectuer plus tard. Mais on perd
toute une couche d'information qui pourrait se révéler utile. 
De plus, il semble naturel d'essayer d'uniformiser les structures de données. 

### Tests du moteur : utilisation de test par proriétée

Actuellement le moteur possède une base de tests héritée de son ancienne implémentation en Java. 
Celle-ci possède des lacunes et, a surtout le rôle de tests de non-régression.

Apporter des tests unitaires solides est un défi, qui peut se révéler impossible, dû à la nature
des données (grandes données difficilement prédictibles, grande précision en nombre flotant, manque 
d'une définition formelle des primitives, etc ...). 

Il peut être alors intéressant d'effectuer des tests par propriétés. 
Une ébauche de cette technique est contenue dans la base de code. Cependant, cette exploration a permis
de soulever certains points de blocage pour l'utilisation ces tests : 

1. **Un code peu lisible** : les propriétés à tester étant complexe, le code du test doit se situer
entre (i) apporter la certitude que le test est conforme à la définition ; (ii) être lisible. 
Il se trouve que ces deux points se révèle antagoniste. En effet, pour apporter une certitude de 
conformité, il est intéressant d'utiliser le style fonctionnel proposé par Typescript, qui est 
plus difficile à lire. 
2. **Un problème pour générer les données** : les données d'entrées de tests sont difficiles à générer.
Il faudrait pour cela pouvoir créer une trace ADS-B et les paramètres de la primitive, dans des espaces
de possibilités immenses.
Il faut donc choisir des protocoles pour générer des cas de tests intéressants, en apportant une
couche logique à celle-ci (l'aléatoire ne suffit pas)

3. **Un manque de traçabilité des erreurs** : Une fois qu'une erreur a été détecté, la librairie de 
tests par propriétés (fast-check) nous renvoie la donnée générée qui a fait échouer le test. 
Cependant, cette donnée ne donne que peu d'information sur le test. Notamment, il manque : 
  - le message où le test échoue 
  - les actions qui ont été éxécutées sur ce message
  - les états intermédiaires des données altérées


Pour résoudre ces problèmes, il semblerait intéressant de développer une sur-couche autour de 
la librairie de test par propriété qui permettrait de résoudre ces points sans ajouter 
la charge redondante de les gérer à l'utilisateurice.
Cette sur-couche devrait pouvoir permettre de définir un test, avec des fonctions prédéfinies qui
permettent d'écrire de manière explicite le test. 
Et de manière cachée, gérer un journal qui gardera plus d'information sur le test que le fait 
fast-check par défaut, dans le but d'afficher ces informations si un test échoue.


### Ajout de template d'exécution 

Pour le moment, les actions ne peuvent s'exécuter que l'une à la suite de l'autre. 
Cependant, avec l'utilisation de **commandes** et de **template** il serait possible 
d'imaginer des flux d'exécution plus complexe (par exemple : deux suites d'actions 
s'exécutes sur la donnée d'entrée, puis sont assemblés par la suite, avec ou sans données 
partagées, etc ...)

Pour cela, il faudrait redéfinir des objets qui suivent le patron de conception **template**,
ou **visiteur**, c'est-à-dire, il faudrait stocker un arbre représentant un graph d'exécution 
de l'attaque, puis le parcourir pour produire le résultat.

### Optimisation par paralélisation des actions

Actuellement, les actions s'exécutent séquentiellement. Sachant que la plupart d'entre elles
n'ont besoin que du message courant pour faire leur attaque, il serait possible 
de faire s'exécuter une action dès que la précédente aurait produit un message. 

Pour cela, il faudrait modifier le type `Action` pour ajouter une fonction qui 
permettrait l'utilisation de données partagées, puis d'implémenter
pour chaque action une version paralèle. 
Ce travail devrait être faciliter si des **templates** ont été dévellopés avant (par exemple
pour la modification de propriété, ou la suppression, sont deux actions qui appliquent un 
même traitement à chaque message, c'est-à-dire une fonction *map*) 

