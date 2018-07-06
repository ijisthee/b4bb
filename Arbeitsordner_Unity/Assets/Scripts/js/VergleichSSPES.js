#pragma strict

// Farben:
// 1 = Lila
// 2 = Blau
// 3 = Grün
// 4 = Gelb
// 5 = Rot

var resetMsg = 0;

var winLoose : GameObject; // Statusanzeige 



function bounce (spieler: GameObject, gegner: GameObject) {

	// **** SPIELERABBRALL ANFANG ****
	// Bewegungsrichtung heraus finden
	var heading = gegner.transform.position - spieler.transform.position;
	var distance = heading.magnitude;
	var direction = heading/distance;
	
	// Bewegungsrichtung umkehren
	direction.x *= -1;
	direction.y *= -1;
	
	// Spieler an Objekt abprallen lassen
	spieler.GetComponent(Rigidbody2D).AddForce(direction * 35);
	// **** SPIELERABBRALL ENDE ****
			
	// **** GEGNERABPRALL ANFANG ****
	heading = spieler.transform.position - gegner.transform.position;
	distance = heading.magnitude;
	direction = heading/distance;
	
	// Bewegungsrichtung umkehren
	direction.x *= -1;
	direction.y *= -1;
	
	// Gegner an Objekt abprallen lassen
	gegner.GetComponent(Rigidbody2D).AddForce(direction * 35);
	// **** GEGNERABPRALL ENDE ****
	
	// Objekte NICHT Zerstören (Siehe Spielerscript)
// 	spieler.GetComponent(Spieler).bounce = 1;
// 	gegner.GetComponent(Spieler).bounce = 1;

}