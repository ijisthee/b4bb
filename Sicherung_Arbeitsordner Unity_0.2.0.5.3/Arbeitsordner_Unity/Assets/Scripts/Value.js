#pragma strict
/*
// Festlegen der Maximalwerte
var formMax: int = 10;
var farbeMax: int = 5;
var soundMax: int = 3;

// Festlegen der Minimalwerte
var formMin: int = 1;
var farbeMin: int = 1;
var soundMin: int = 1;

function Start () {

}

function Update () {

}

function NewValue (spieler: GameObject, gegner: GameObject) {

	
	var player = spieler.GetComponent(Spieler);
	var enemy = gegner.GetComponent(Enemy);
		
	// Gegnerwerte abfragen
	var formE = enemy.form; // Gegnerform
	var farbeE = enemy.farbe; // Gegnergarbe
	var soundE = enemy.sound; // Gegenersound
	
	// Spielerwerte abfragen
	var form = player.form; // Gegnerform
	var farbe = player.farbe; // Gegnergarbe
	var sound = player.sound; // Gegenersound
	
	var ownValue = form+ farbe + sound;
	
	// Gegnerwert berechnen
	var enemyValue = formE+farbeE+soundE;
	
	// Eigener Wert GRÖSSER als Gegenerwert 
	// Prüfung in folgender Reihenfolge: Sound, Farbe, Form
	if (ownValue > enemyValue) {
		if (Mathf.Max(formE, farbeE, soundE) == soundE) { // Wenn der Soundwert der höchste ist
			if (sound < soundMax) player.sound++;
			else if (farbe < farbeMax) player.farbe++;
			else if (form < formMax && form >= formMin) player.form++;
		}
		
		else if (Mathf.Max(formE, farbeE, soundE) == farbeE) { // Wenn der Farbwert der höchste ist
			if (farbe < farbeMax) player.farbe++;
			else if (form < formMax && form >= formMin) player.form++;
		}
		
		else if (Mathf.Max(formE, farbeE, soundE) == formE) { // Wenn der Formwert der höchste ist
			if (form < formMax && form >= formMin) player.form += form - formE;
		}
	}
	
	// Eigener Wert KLEINER als Gegnerwert
	// Prüfung in folgender Reihenfolge: Sound, Farbe, Form
	if (ownValue < enemyValue) {
		if (Mathf.Max(formE, farbeE, soundE) == soundE) { 
			// Wenn der Soundwert der höchste ist Abzug der Differenz
			// Soundwert Gegner - Soundwert Spieler
			if (sound >= soundMin) {
				player.sound = sound +(-(soundE - sound));
				if (sound <= soundMin) {
					player.sound = soundMin;
					player.farbe--;
					if (farbe <= farbeMin) {
						player.farbe = farbeMin;
						player.form--;
						if (form < formMin) {}
					}
				}
			}
		}
		
		else if (Mathf.Max(formE, farbeE, soundE) == farbeE) { 
			// Wenn der Farbwert der höchste ist Abzug der Differenz
			// Farbwert Gegner - Farbwert Spieler
			if (farbe >= farbeMin) {
				player.farbe = farbe +(-(farbeE - farbe));
				if (farbe <= farbeMin) {
					player.farbe = farbeMin;
					player.form--;
					if (form < formMin) {}
				}
			}
		}
		
		else if (Mathf.Max(formE, farbeE, soundE) == formE) {  // Wenn der Formwert der höchste ist
			if (form >= formMin) {
				player.form = form +(-(formE - form)/2);
				if (form < formMin) {}
			}
		}
	}
	
	// Eigener Wert GLEICH Gegnerwert
	// Prüfung in folgender Reihenfolge: Sound, Farbe, Form
	if (ownValue == enemyValue) {
		if (Mathf.Max(formE, farbeE, soundE) == soundE) { // Wenn der Soundwert der höchste ist
			if (sound >= soundMin) {
				player.sound--;
				if (sound <= soundMin) {
					player.sound = soundMin;
					player.farbe--;
					if (farbe <= farbeMin) {
						player.farbe = farbeMin;
						player.form--;
						if (form < formMin) {}
					}
				}
			}
		}
		
		else if (Mathf.Max(formE, farbeE, soundE) == farbeE) { // Wenn der Farbwert der höchste ist
			if (farbe >= farbeMin) {
				player.farbe--;
				if (farbe <= farbeMin) {
					player.farbe = farbeMin;
					player.form--;
					if (form < formMin) {}
				}
			}
		}
		
		else if (Mathf.Max(formE, farbeE, soundE) == formE) { // Wenn der Formwert der höchste ist
			if (form >= formMin) {
				player.form--;
				if (form < formMin) {}
			}
		}
	}
}
*/