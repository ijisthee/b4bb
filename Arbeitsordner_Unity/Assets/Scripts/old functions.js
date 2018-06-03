// Einstellungen
var enemyCount : int = 500; // Anzahl der Gegner
var gegner: GameObject; // GegnerPREFAB
var spielerScore: GameObject;
var difficulty : int = 0; // Schwierigkeitsgrad
var winLoose : GameObject; // Gewonnen/ Verloren Anzeige
var indgroesse : float = 2.5; // Je größer der Wert, desto kleiner die Indikatoren

// HUD Nachrichten Gewinnen/ Verlieren
var looseMsg: String = "GAME OVER!!! -- X DRÜCKEN FÜR NEUSTART";
var winMsg: String = "GEWONNEN!!! -- X DRÜCKEN FÜR NEUSTART";

// Variablen zum Prüfen ob der Indikator bereits gesetzt wurde
var checkLeft = true;
var checkRight = true;
var checkTop = true;
var checkBottom = true;

var checkLeftTop = true;
var checkRightTop = true;
var checkLeftBottom = true;
var checkRightBottom = true;

public var form : int = 0;
public var farbe: int = 0;
public var sound: int = 0;
public var scale: float = 0;

var maxRange : int = 1000;
var speed : int = 10;

var bounce =0;


function EnemyMove() { // Aufruf findet nur alle 0,5-2 Sekunden statt
	
	if ((gameObject.GetComponent(PolygonCollider2D))) {
		// Rigidboy Komponente an force übergeben	
		var force = gameObject.GetComponent(Rigidbody2D);
		var spieler = GameObject.Find("Spieler");
		var magMax : int = 7; // Maximalgeschwindigkeit
		var fleeRange : float = 5; // Radius ab dem geflohen wird 
		
		// Wenn ich mich außerhalb der Range befinde, begebe ich mich Richtung 0,0
		if (transform.position.x > maxRange 	|| 
			transform.position.x < -maxRange 	|| 
			transform.position.y > maxRange 	|| 
			transform.position.y < -maxRange) 
			force.AddForce(Vector2(-transform.position.x/transform.localScale.x/10,-transform.position.y/transform.localScale.x/10));

		// Werte für die Distanz zum Spieler ermitteln
		var heading = transform.position - spieler.transform.position;
		var distance = heading.magnitude;
		var direction = heading/distance;
		var difficulty : float = GameObject.Find("Settings").GetComponent(Settings).difficulty;
			
		// Wenn der Spieler zu nah an mich heran kommt, haue ich ab
		if (distance < (fleeRange + transform.localScale.x/2)){
			if (gameObject.GetComponent(Rigidbody).velocity.magnitude < magMax + difficulty) {
				gameObject.GetComponent(Rigidbody).AddForce(direction * 15 * sound * difficulty * transform.localScale.x/2);
			}		
		}
		

		// Wenn ich mich innerhalb der Range befinde bewege ich mich Random
		if (transform.position.x < maxRange 	&&
			transform.position.x > -maxRange 	&&
			transform.position.y < maxRange 	&&
			transform.position.y > -maxRange) {
			force.AddForce(Vector2(Random.Range(-speed * transform.localScale.x,transform.localScale.x * speed+1), Random.Range(-speed * transform.localScale.x,transform.localScale.x * speed+1)));
		}
	}	else gameObject.AddComponent(PolygonCollider2D);
	
	// Abstand zum Gegner prüfen und vom nahesten Gegner abhauen 
								
}

function EnemyHunt () {

	var fleeRange : float = 2; // Radius ab dem geflohen wird
	var enemys = GameObject.FindGameObjectsWithTag("Gegner");
	var enemyDistance = fleeRange;
	var fleeEnemy : GameObject;
	var magMax : int = 3; // Maximalgeschwindigkeit
	
	
	for (var i = 0; i < enemys.Length; i++) {
		var enemy = enemys[i];
		if (enemy.name != name) {
			if (enemy) {
				var enemyPos = enemy.transform.position;
				var heading = transform.position - enemyPos;
				var distance = heading.magnitude;
				if (distance <= enemyDistance && distance != 0) {fleeEnemy = enemy; enemyDistance = distance;}
				
			}
		}	
		if (fleeEnemy) {
			enemyPos = fleeEnemy.transform.position;
			heading = transform.position - enemyPos;
			distance = heading.magnitude;        
			var direction = heading / distance;
			if (distance < (fleeRange + transform.localScale.x/2)) {
				if (gameObject.GetComponent(Rigidbody).velocity.magnitude < magMax) {				
					GetComponent(Rigidbody).AddForce(direction * 0.5 * transform.localScale.x);
				}	
			}
		}
	}
}

function SSPES (spieler: GameObject, gegner: GameObject) {
	
	var player = spieler.GetComponent(Spieler);
	var enemy = gegner.GetComponent(Enemy);
	var msg = winLoose.GetComponent(UI.Text);
	msg.text = "";
	
	// Objekte Zerstören bei WIN anschalten (Siehe Spielerscript)
	spieler.GetComponent(Spieler).bounce = 0;
		
	// Gegnerwerte abfragen
	var formE = enemy.form; // Gegnergarbe
	var farbeE = enemy.farbe; // Gegnergarbe
	var soundE = enemy.sound; // Gegenersound
	var scaleE = enemy.scale; // Gegnergröße
	
	// Spielerwerte abfragen
	var form = player.form; // Gegnergarbe
	var farbe = player.farbe; // Gegnergarbe
	var sound = player.sound; // GegenersoundAbteilungsfestplatte
	var scale = player.scale; // Gegnergröße
	
	// Gegnerindikatoren finden
	var indLeft = GameObject.Find("IndLeft");
	var indRight = GameObject.Find("IndRight");
	var indTop = GameObject.Find("IndTop");
	var indBottom = GameObject.Find("IndBottom");
	var indLeftTop = GameObject.Find("IndLeftTop");
	var indLeftBottom = GameObject.Find("IndLeftBottom");
	var indRightTop = GameObject.Find("IndRightTop");
	var indRightBottom = GameObject.Find("IndRightBottom");
	
	// Text für Feedback **START**
	var txtFarbe : String = "";
	var txtFarbeE : String = "";
	

	switch (farbe) {
		case 1: txtFarbe = "Stone"; break;
		case 2: txtFarbe = "Paper"; break;
		case 3: txtFarbe = "Scissors"; break;
		case 4: txtFarbe = "Lizard"; break;
		case 5: txtFarbe = "Spock"; break;								
	}
	switch (farbeE) {
		case 1: txtFarbeE = "Stone"; break;
		case 2: txtFarbeE = "Paper"; break;
		case 3: txtFarbeE = "Scissors"; break;
		case 4: txtFarbeE = "Lizard"; break;
		case 5: txtFarbeE = "Spock"; break;								
	}
	// Text für Feedback **ENDE**
	
	/* GRÖSSENVERGLEICH START */
	var scaleCompare = scale - scaleE;
	
	// RandomScale errechnen, wenn der Spieler nur etwas kleiner oder größer dem Gegner ist
	if (scaleCompare <= 0.3 && scaleCompare > -0.3) {scaleCompare = Random.Range(-0.5, 0.5);}
	
	// Spieler ist größer
	if ((scaleCompare) > 0 ) {
		player.scale += 0.2; 
		Camera.main.orthographicSize += player.scale/2;
		msg.text = "You were bigger";
		player.form = formE;
	}
		
		
	// Spieler ist kleiner
	else if ((scaleCompare) < 0) {msg.text = "Careful - one point lost "+player.loose+" point(s) left";
	
		if (
			(farbe == 1 && farbeE == 3) ||
			(farbe == 1 && farbeE == 4) ||
			(farbe == 2 && farbeE == 5) ||
			(farbe == 2 && farbeE == 1) ||
			(farbe == 3 && farbeE == 4) ||
			(farbe == 3 && farbeE == 2) ||
			(farbe == 4 && farbeE == 5) ||
			(farbe == 4 && farbeE == 2) ||
			(farbe == 5 && farbeE == 1) ||
			(farbe == 5 && farbeE == 3)) {
			
			msg.text = txtFarbe+" beats "+txtFarbeE; player.form = formE;
			player.scale += 0.2; 
			Camera.main.orthographicSize += player.scale/2;
		}
		else {
			player.loose--;
			msg.text = "Careful - one point lost "+player.loose+" point(s) left";
			// bounce(spieler, gegner);Destroy(gegner.GetComponent(PolygonCollider2D));	
		}
	
		if (farbe == farbeE) {
			// bounce(spieler, gegner);
			Destroy(gegner.GetComponent(PolygonCollider2D));
		}
	} 
	
	/* GRÖSSENVERGLEICH ENDE */		
	
}
/*
function EnemyOutOfSight() {

	// Anzahl der Gegner heraus finden
	var enemys = GameObject.FindGameObjectsWithTag("Gegner");
	var spieler = GameObject.Find("Spieler");
	
	// Gegnerindikatoren finden
	var indLeft = GameObject.Find("IndLeft");
	var indRight = GameObject.Find("IndRight");
	var indTop = GameObject.Find("IndTop");
	var indBottom = GameObject.Find("IndBottom");
	var indLeftTop = GameObject.Find("IndLeftTop");
	var indLeftBottom = GameObject.Find("IndLeftBottom");
	var indRightTop = GameObject.Find("IndRightTop");
	var indRightBottom = GameObject.Find("IndRightBottom");
	
	// Bildschirmgrenze herausfinden	
	var dist = (spieler.transform.position - Camera.main.transform.position).z;
	var leftBorder = Camera.main.ViewportToWorldPoint(Vector3(0,0,dist)).x;
	var rightBorder = Camera.main.ViewportToWorldPoint(Vector3(1,0,dist)).x;
	var topBorder = Camera.main.ViewportToWorldPoint(Vector3(1,1,dist)).y;
	var botBorder = Camera.main.ViewportToWorldPoint(Vector3(1,0,dist)).y;
	// print (leftBorder);

	// Distanz zwischen Top und Bottom Border heraus finden
	var horizontalMid = Vector3.Distance(Camera.main.ViewportToWorldPoint(Vector3(0,1,dist)), Camera.main.ViewportToWorldPoint(Vector3(0,0,dist)));
	var verticalMid = Vector3.Distance(Camera.main.ViewportToWorldPoint(Vector3(1,1,dist)), Camera.main.ViewportToWorldPoint(Vector3(0,1,dist)));
	
	// Indikatoralpha
	var indRend = 0.4;

	// Gegnerindikatoren aktivieren
	if (!checkLeft)	indLeft.GetComponent(SpriteRenderer).color.a = indRend;	
	else indLeft.GetComponent(SpriteRenderer).color.a = 0;
	
	if (!checkRight) indRight.GetComponent(SpriteRenderer).color.a = indRend;	
	else indRight.GetComponent(SpriteRenderer).color.a = 0;
	
	if (!checkTop) indTop.GetComponent(SpriteRenderer).color.a = indRend;	
	else indTop.GetComponent(SpriteRenderer).color.a = 0;
	
	if (!checkBottom) indBottom.GetComponent(SpriteRenderer).color.a = indRend;	
	else indBottom.GetComponent(SpriteRenderer).color.a = 0;
	
	if (!checkLeftTop) indLeftTop.GetComponent(SpriteRenderer).color.a = indRend;	
	else indLeftTop.GetComponent(SpriteRenderer).color.a = 0;
	
	if (!checkLeftBottom) indLeftBottom.GetComponent(SpriteRenderer).color.a = indRend;	
	else indLeftBottom.GetComponent(SpriteRenderer).color.a = 0;
	
	if (!checkRightTop) indRightTop.GetComponent(SpriteRenderer).color.a = indRend;	
	else indRightTop.GetComponent(SpriteRenderer).color.a = 0;
	
	if (!checkRightBottom) indRightBottom.GetComponent(SpriteRenderer).color.a = indRend;	
	else indRightBottom.GetComponent(SpriteRenderer).color.a = 0;
	
	// Gegnerindikatoren mittig platzieren
	indLeft.transform.position = Vector3(leftBorder+1, topBorder - horizontalMid/2);
	indRight.transform.position = Vector3(rightBorder-1, topBorder - horizontalMid/2);
	indTop.transform.position = Vector3(rightBorder - verticalMid/2, topBorder-1);
	indBottom.transform.position = Vector3(rightBorder - verticalMid/2, botBorder+1);
	
	// Diagonale Gegnerindikatoren in den Ecken platzieren
	indLeftTop.transform.position = Vector3(leftBorder+1, topBorder-1);
	indLeftBottom.transform.position = Vector3(leftBorder+1, botBorder+1);
	indRightTop.transform.position = Vector3(rightBorder-1, topBorder-1);
	indRightBottom.transform.position = Vector3(rightBorder-1, botBorder+1);
	
	
	// Größe der Indikatoren an Spieler anpassen
	indLeft.transform.localScale = 			spieler.transform.localScale / 2; 
	indRight.transform.localScale = 		spieler.transform.localScale / 2; 
	indTop.transform.localScale = 			spieler.transform.localScale / 2; 
	indBottom.transform.localScale = 		spieler.transform.localScale / 2; 
	indLeftTop.transform.localScale = 		spieler.transform.localScale / 2; 
	indLeftBottom.transform.localScale = 	spieler.transform.localScale / 2; 
	indRightTop.transform.localScale = 		spieler.transform.localScale / 2; 
	indRightBottom.transform.localScale = 	spieler.transform.localScale / 2;
	
	
	// Variablen zum Prüfen ob der Indikator bereits gesetzt wurde
	checkLeft = true;
	checkRight = true;
	checkTop = true;
	checkBottom = true;

	checkLeftTop = true;
	checkRightTop = true;
	checkLeftBottom = true;
	checkRightBottom = true;

	
	// Schleife zum Prüfen ob sich ein Gegner außerhalb des Bildschirms befindet
	for (var i = 0; i < enemys.Length; i++) {
		var enemy = enemys[i];
		if (enemy) {						
				// Indikatoren an den KANTEN einschalten, wenn sich etwas außerhalb des Bildschirms befindet
				var enemyPos = enemy.transform.position; // Position des Gegners heraus finden				
				
				if	((enemyPos.x <= leftBorder) && 
					(enemyPos.y <= topBorder) && 
					(enemyPos.y >= botBorder)) { checkLeft = false;} // Gegner befindet sich links
				
				if	((enemyPos.x >= rightBorder) &&
					 (enemyPos.y <= topBorder) && 
					 (enemyPos.y >= botBorder)) { checkRight = false;} // Gegner befindet sich rechts
					 
				if(	(enemyPos.y >= topBorder) &&
				 	(enemyPos.x <= rightBorder) &&
				 	(enemyPos.x >= leftBorder)) { checkTop = false;} // Gegner befindet sich oben

				if	((enemyPos.y <= botBorder) &&
					(enemyPos.x <= rightBorder) &&
					(enemyPos.x >= leftBorder)) { checkBottom = false;} // Gegner befindet sich unten
				
				// Indikatoren in den ECKEN einschalten, wenn sich etwas außerhalb des Bildschirms befindet
				if (enemyPos.x <= leftBorder &&
					enemyPos.y <= botBorder) { checkLeftBottom = false;} // Gegner befindet sich links unten
					
				if (enemyPos.x >= rightBorder && 
					enemyPos.y <= botBorder) { checkRightBottom = false;} // Gegner befindet sich rechts unten
				
				if (enemyPos.x <= leftBorder && 
					enemyPos.y >= topBorder) { checkLeftTop = false;} // Gegner befindet sich links oben
					
				if (enemyPos.x >= rightBorder && 
					enemyPos.y >= topBorder) { checkRightTop = false;} // Gegner befindet sich rechts oben
			}		
		}
}*/