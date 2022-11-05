const canvas = document.querySelector('canvas')
const d =canvas.getContext('2d')
//création du score sur le document 
const scoreEL = document.querySelector('#scoreEL')
//définition de la taille de la zone de jeu
canvas.width = innerWidth
canvas.height = innerHeight

//classe bordures à la base de la création du labyrinthe
class bordures{
		static width = 40
		static height = 40
		constructor({position, image}){
			this.position = position
			this.width = 40
			this.height = 40
			this.image= image
	}
	//méthode pour afficher les images des assets
	dessin(){
		d.drawImage(this.image, this.position.x, this.position.y)	
		}
	}

//classe pac man qui crée le joueur avec ses différents paramètres
class pacman{
	constructor({position,mouvement}) {
		this.position= position
		this.mouvement= mouvement	
		this.radius= 15
		this.couleur= "#fff200"

	}
	dessin(){
		d.beginPath()
		d.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		d.fillStyle = this.couleur
		d.fill()
		d.closePath()
	}
	moving(){
		this.dessin()
		this.position.x += this.mouvement.x
		this.position.y += this.mouvement.y
	}
}

//classe pac gommes créant les boules servant à la victoire au jeu
class pac_gomme{
	constructor({position}) {
		this.position= position	
		this.radius= 3
		this.couleur= "#dca5be"
	}
	
	dessin(){
		d.beginPath()
		d.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		d.fillStyle = this.couleur
		d.fill()
		d.closePath()
	}
}

//classe fantôme qui définit les ennemis du jeu
class Fantome{
	static vitesse = 2
	constructor({position,mouvement,couleur="#f99c00"}) {
		this.position= position
		this.mouvement= mouvement	
		this.couleur = couleur
		this.radius= 15
		this.prevoir= []
		this.vitesse = 2
		this.mangeable = false

	}
	dessin(){
		d.beginPath()
		d.fillStyle = this.mangeable ? 'blue' : this.couleur
		d.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		d.fill()
		d.closePath()
	}
	moving(){
		this.dessin()
		this.position.x += this.mouvement.x
		this.position.y += this.mouvement.y
	}
}

//classe super pac gommes définissant les bon,us que le joueur a dans le labyrinthe
class super_pac_gomme{
	constructor({position}) {
		this.position= position	
		this.radius= 8
		this.couleur= "#dca5be"
	}
	
	dessin(){
		d.beginPath()
		d.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		d.fillStyle = this.couleur
		d.fill()
		d.closePath()
	}
}

//création des constantes et variables qui serviront au jeu
const pac_gommes = []
const bords = []
const superpacgommes= []
const joueur = new pacman({
	position: {
		x: bordures.width *8 + bordures.width/2,
		y:bordures.height *9 + bordures.height/2
	},
	mouvement: {
		x:0,
		y:0
	}
})
const fantomes= [
	blinky = new Fantome({
		position:{
			x: bordures.width *8 + bordures.width/2,
			y:bordures.height *7 + bordures.height/2
		},
		mouvement:{
			x:Fantome.vitesse,
			y:0
		},
		couleur: '#ed1b24'

	}),

	clyde = new Fantome({
		position:{
			x: bordures.width *8 + bordures.width/2,
			y:bordures.height *7 + bordures.height/2
		},
		mouvement:{
			x:Fantome.vitesse,
			y:0
		}

	}),
	inky = new Fantome({
		position:{
			x: bordures.width *8 + bordures.width/2,
			y:bordures.height *7 + bordures.height/2
		},
		mouvement:{
			x:-Fantome.vitesse,
			y:0
		},
		couleur: '#4adecb'

	}),
	pinky = new Fantome({
		position:{
			x: bordures.width *8 + bordures.width/2,
			y:bordures.height *7 + bordures.height/2
		},
		mouvement:{
			x:-Fantome.vitesse,
			y:0
		},
		couleur: '#feaec9'

	})

]

const touches={
	z: {
		pressed: false
	},
	q: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	}
}
let dertouche = ''
let score = 10

//définition du labyrinthe à base de symboles définis plus bas
const carte = [
	['1','x','x','x','x','x','x','x','w','x','x','x','x','x','x','x','2'],
	['|','.','.','.','.','.','.','.','|','.','.','.','.','.','.','.','|'],
	['|','.','<','>','.','<','>','.','v','.','<','>','.','<','>','.','|'],
	['|','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','|'],
	['|','.','<','>','.','^','.','<','w','>','.','^','.','<','>','.','|'],
	['|','.','.','.','.','|','.','.','|','.','.','|','.','.','.','.','|'],
	['|','o','5','6','.','g','>','.','v','.','<','h','.','5','6','o','|'],
	['|','.','8','7','.','v','.','.','.','.','.','v','.','8','7','.','|'],
	['|','.','.','.','.','.','.','<','x','>','.','.','.','.','.','.','|'],
	['i','n','n','6','.','^','.','.','.','.','.','^','.','5','n','n','k'],
	['j','u','u','7','.','v','.','<','w','>','.','v','.','8','u','u','l'],
	['|','.','.','.','.','.','.','.','|','.','.','.','.','.','.','.','|'],
	['|','o','<','2','.','<','>','.','v','.','<','x','x','w','>','o','|'],
	['|','.','.','|','.','.','.','.','.','.','.','.','.','|','.','.','|'],
	['c','>','.','v','.','^','.','<','w','>','.','^','.','v','.','<','h'],
	['|','.','.','.','.','|','.','.','|','.','.','|','.','.','.','.','|'],
	['|','.','<','x','x','m','>','.','v','.','<','m','x','x','>','.','|'],
	['|','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','|'],
	['4','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','3']
]

//idée de labyrinthe aléatoire non abouti pour le moment
const carte2 =[
	['1','x','x','x','x','x','x','x','w','x','x','x','x','x','x','x','2'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['|',creerlabyale(15),'|'],
	['4','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','3']
]

//fonction récupérant les images dans les assets pour créer la carte
function imagecarte(src){
	const image = new Image()
	image.src = src
	return image	
}

//définition de chaque caractère de la carte pouur chaque ligne et chaque i de cette ligne pour créer la carte avec des assets
//avec utilisation d'un switch case
carte.forEach((ligne,i)=>{
	ligne.forEach((symbole, j)=>{
		switch(symbole){ 
			case 'x':
				bords.push(
					new bordures({
						position: {
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/pipeHorizontal.png')
					})
				)
				break
			case '|':
				bords.push(
					new bordures({
						position: {
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/pipeVertical.png')
					})
				)
				break
			case '1':
				bords.push(
					new bordures({
						position: {
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/pipeCorner1.png')
					})
				)
				break
			case '4':
				bords.push(
					new bordures({
						position: {
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/pipeCorner4.png')
					})
				)
				break
			case '2':
				bords.push(
					new bordures({
						position: {
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/pipeCorner2.png')
					})
				)
				break
			case '3':
				bords.push(
					new bordures({
						position: {
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/pipeCorner3.png')
					})
				)
				break
			case '<':
				bords.push(
					new bordures({
						position: {
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/capLeft.png')
					})
				)
				break
			case '>':
				bords.push(
					new bordures({
						position: {
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/capRight.png')
					})
				)
				break
			case 'u':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeHorizontal.jpg')
					})
				)
				break
			case 'n':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeHorizontal2.jpg')
					})
				)
				break
			case '5':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeCorner1.jpg')
					})
				)
				break
			case '6':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeCorner2.jpg')
					})
				)
				break
			case '7':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeCorner3.jpg')
					})
				)
				break
			case '8':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeCorner4.jpg')
					})
				)
				break
			case 'j':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeVertical.jpg')
					})
				)
				break
			case 'i':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedInkedpipeVertical2.jpg')
					})
				)
				break
			case '^':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/capTop.png')
					})
				)
				break
			case 'c':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedInkedpipeVerticalg.jpg')
					})
				)
				break
			case 'v':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/capBottom.png')
					})
				)
				break
			case 'k':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeConnectorLefth.jpg')
					})
				)
				break
			case 'l':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeConnectorLeftb.jpg')
					})
				)
				break
			case 'h':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/pipeConnectorLeft.png')
					})
				)
				break
			case 'w':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/pipeConnectorBottom.png')
					})
				)
				break
			case 'm':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/pipeConnectorTop.png')
					})
				)
				break
			case 'g':
				bords.push(
					new bordures({
						position: {		
							x:bordures.width * j,
							y:bordures.height * i
						},
						image: imagecarte('./assets/InkedpipeVerticalg.jpg')
					})
				)
				break
			case '.':
				pac_gommes.push(
					new pac_gomme({
						position: {		
							x:bordures.width * j + bordures.width/2,
							y:bordures.height * i + bordures.height/2
						}
					})
				)
				break
			case 'o':
				superpacgommes.push(
					new super_pac_gomme({
						position:{
							x:bordures.width * j + bordures.width/2,
							y:bordures.height * i + bordures.height/2
						}
					})
				)
				break
						
		}
	})
})

//création de la fonction gérant les collisions au sein du jeu
function collisionpac({
	pac,
	cote
}) {
	const marge = bordures.width /2 - pac.radius - 1
	return(
		pac.position.y-pac.radius + pac.mouvement.y <= cote.position.y + cote.height + marge
		&& pac.position.x + pac.radius + pac.mouvement.x >= cote.position.x - marge
		&& pac.position.y + pac.radius + pac.mouvement.y >= cote.position.y - marge
		&& pac.position.x - pac.radius + pac.mouvement.x <= cote.position.x + cote.width + marge
	)
}

//fonction non aboutie qui allait créer un labyrinthe aléatoire
function creerlabyale(longueur) {
    var resultat           = "''";
    var caracteres       = '2341<>un5678ji^cvklhwmg.o';
    var longueurcle = caracteres.longueur;
    for ( var i = 0; i < longueur; i++ ) {
      resultat += caracteres.charAt(Math.floor(Math.random() * 
 longueurcle));
   }
   for( var j=0; j<= longueur; j++){
	resultat = ['resultat'];
	//console.log(resultat)
	return resultat
   }
}

//variable d'animation
let Animationid
//définition fonction d'animation du joueur, des fantômes et des pac gommes
function animation(){
	Animationid = requestAnimationFrame(animation)
	d.clearRect(0,0,canvas.width,canvas.height)
	//consitionnelle pour gérer le déplacement de pac man par rapport aux touches "pressed"
	if (touches.z.pressed && dertouche == 'z'){
		for(let i =0; i< bords.length; i++ ){
			const bordures = bords[i]
			if (
				collisionpac({
					pac: {
						...joueur,
						mouvement:{
						x:0,
						y:-5
					}
				},
				cote: bordures
				})
			) {
				joueur.mouvement.y=0
				break
			} 	else {
				joueur.mouvement.y=-5
			}
		}
		
	}else if (touches.d.pressed && dertouche == 'd'){
		for(let i =0; i< bords.length; i++ ){
			const bordures = bords[i]
			if (
				collisionpac({
					pac: {
						...joueur,
						mouvement:{
						x:5,
						y:0
					}
				},
				cote: bordures
				})
			) {
				joueur.mouvement.x=0
				break
			} 	else {
				joueur.mouvement.x=5
			}
		}
		
	}else if (touches.s.pressed && dertouche == 's'){
		for(let i =0; i< bords.length; i++ ){
			const bordures = bords[i]
			if (
				collisionpac({
					pac: {
						...joueur,
						mouvement:{
						x:0,
						y:5
					}
				},
				cote: bordures
				})
			) {
				joueur.mouvement.y=0
				break
			} 	else {
				joueur.mouvement.y=5
			}
		}

	}else if (touches.q.pressed && dertouche == 'q'){
		for(let i =0; i< bords.length; i++ ){
			const bordures = bords[i]
			if (
				collisionpac({
					pac: {
						...joueur,
						mouvement:{
						x:-5,
						y:0
					}
				},
				cote: bordures
				})
			) {
				joueur.mouvement.x=0
				break
			} 	else {
				joueur.mouvement.x=-5
			}
		}
	}

	//définition du contact entre le joueur et les fantômes
	//cela permet d'instaurer la défaite du joueur ou bien le bonus le permettant de manger les fnatômes
	for (let i = fantomes.length -1; 0<= i; i--){
		const fantome= fantomes[i]
		if(
			Math.hypot(
				fantome.position.x - joueur.position.x,
				fantome.position.y - joueur.position.y
			) <
				fantome.radius + joueur.radius
		)	{
		if(fantome.mangeable){
			fantomes.splice(i,1)
		} else{
			cancelAnimationFrame(Animationid)
			console.log("perdu")
		}
	}
	}

	//définition de la condition de victoire
	if (pac_gommes.length === 0 && superpacgommes.length === 0){
		cancelAnimationFrame(Animationid)
		console.log("You win")
		
	}

	//création des super pac gommes sur le terrain
	for (let i = superpacgommes.length -1; 0<= i; i--){
		const super_pac_gommes = superpacgommes[i]
		super_pac_gommes.dessin()
		//conditionelle permettant de supprimer les super pac gommes au contact du joueur et d'ajout de 100 au score
		if(
			Math.hypot(
				super_pac_gommes.position.x - joueur.position.x,
				super_pac_gommes.position.y - joueur.position.y
			) <
			super_pac_gommes.radius + joueur.radius
		)	{
			superpacgommes.splice(i, 1)
			score += 100
			scoreEL.innerHTML = score

			fantomes.forEach(fantome =>{
				fantome.mangeable = true
				console.log(fantome.mangeable)
				//définition du temps durant lequel le fantôme est mangeable lorsqu'une super pac gomme est récupérée
				setTimeout(()=>{
					fantome.mangeable = false
					console.log(fantome.mangeable)
				}, 3000)
			})
		}
	}

	//même chose pour les pac gommes cependant elle ne donne que 10 au score et ne permettent pas de manger les fantômes
	for (let i = pac_gommes.length -1; 0<= i; i--){
		const pac_gomme = pac_gommes[i]
		pac_gomme.dessin()
	
		if(
			Math.hypot(
				pac_gomme.position.x - joueur.position.x,
				pac_gomme.position.y - joueur.position.y
			) <
			pac_gomme.radius + joueur.radius
		)	{
			pac_gommes.splice(i, 1)
			score += 10
			scoreEL.innerHTML = score

		}
	}

	//création de chaque bordures avec gestion des collisions avec le joueur
	bords.forEach((bordures) =>{  
		bordures.dessin()
		if (
			collisionpac({
				pac: joueur,
				cote: bordures
			})
		)	{
			joueur.mouvement.x = 0
			joueur.mouvement.y = 0
		}
	})
	joueur.moving()

	//création des fantômes dans la labyrinthe
	fantomes.forEach((fantome) => {
		fantome.moving()

		
		
			//vérification des possibilités de mouvement pour le fantôme
			const collisions = []
		bords.forEach(bordures => {
			if (
				!collisions.includes('droit') &&
				collisionpac({
					pac: {
						...fantome,
						mouvement:{
						x:fantome.vitesse,
						y:0
					}
				},
				cote: bordures
				})
			) {
				collisions.push('droit')

			}

			if (
				!collisions.includes('gauche') &&
				collisionpac({
					pac: {
						...fantome,
						mouvement:{
						x:-fantome.vitesse,
						y:0
					}
				},
				cote: bordures
				})
			) {
				collisions.push('gauche')

			}

			if (
				!collisions.includes('haut') &&
				collisionpac({
					pac: {
						...fantome,
						mouvement:{
						x:0,
						y:-fantome.vitesse
					}
				},
				cote: bordures
				})
			) {
				collisions.push('haut')

			}

			if (
				!collisions.includes('bas') &&
				collisionpac({
					pac: {
						...fantome,
						mouvement:{
						x:0,
						y:fantome.vitesse
					}
				},
				cote: bordures
				})
			) {
				collisions.push('bas')

			}

		})
		//conditionnelle permettant ai fantôme de changer de direction tout seul sans assistance du joueur
		if (collisions.length > fantome.prevoir.length)
		fantome.prevoir = collisions

		if (JSON.stringify(collisions) !== JSON.stringify(fantome.prevoir)){
			////console.log('gogo')

			if (fantome.mouvement.x >0) fantome.prevoir.push('droit')

			else if (fantome.mouvement.x <0) fantome.prevoir.push('gauche')

			else if (fantome.mouvement.y <0) fantome.prevoir.push('haut')

			else if (fantome.mouvement.y >0) fantome.prevoir.push('bas')

			const chemin = fantome.prevoir.filter((collision) => {
				return !collisions.includes(collision)
			})
			
			//définition de la constante direction aléatoire qui va choisir parmis les directions possible aléatoirement excepté celle d'où il vient
			const directionale = chemin[Math.floor(Math.random() * chemin.length)]

			//switch case des directions possible et leur signification mathématique des coordonnées pour orienter les fantômes
			switch(directionale){
				case 'bas':
					fantome.mouvement.y = fantome.vitesse
					fantome.mouvement.x = 0
				break

				case 'haut':
					fantome.mouvement.y =-fantome.vitesse
					fantome.mouvement.x = 0
				break

				case 'droit':
					fantome.mouvement.y = 0
					fantome.mouvement.x = fantome.vitesse
				break

				case 'gauche':
					fantome.mouvement.y = 0
					fantome.mouvement.x = -fantome.vitesse
				break
			}
			fantome.prevoir = []
		}
	})
}

	
//appel de la fonction gérant le joueur, les fantômes et les pac gommes/super pac gommes
animation()



//gestion des touches appuyés pour le déplacement de pac man
addEventListener('keydown', ({key})=> {
	switch(key) {
		case 'z':
			touches.z.pressed = true
			dertouche= 'z'
			break
		case 'q':
			touches.q.pressed = true
			dertouche= 'q'
			break
		case 's':
			touches.s.pressed = true
			dertouche= 's'
			break
		case 'd':
			touches.d.pressed = true
			dertouche= 'd'
			break
	}

})
addEventListener('keyup', ({key})=> {
	switch(key) {
		case 'z':
			touches.z.pressed = false
			break
		case 'q':
			touches.q.pressed = false
			break
		case 's':
			touches.s.pressed = false
			break
		case 'd':
			touches.d.pressed = false
			break
	}

})