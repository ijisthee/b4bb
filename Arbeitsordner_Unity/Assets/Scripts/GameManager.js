#pragma strict

// Einstellungen
var enemyCount : int = 500; // Anzahl der Gegner
var gegner: GameObject; // GegnerPREFAB
var spielerScore: GameObject;
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
var deathCam = 0;

var gravitationRange :int;

public var collision : float = 0;


function Start () {
	
	gravitationRange = GameObject.Find("Settings").GetComponent(Settings).gravitationRange; // Gravitationsradius
	
	// Hud einmal pro Sekunde updaten
	InvokeRepeating("HUD", 0, 0.2);
	// InvokeRepeating("EnemyOutOfSight", 0, 1);
	
	winLoose.GetComponent(UI.Text).text = "";
	// Camera.main.backgroundColor = Color.black;
	GetComponent(CreateEnemysScript).CreateEnemys(gegner, gravitationRange);
}


function FixedUpdate() {

	var spieler = GameObject.Find("Spieler").GetComponent(Spieler);
	var enemys = GameObject.FindGameObjectsWithTag("Gegner").Length;
	
	// Alle Gegner löschen und Loose Nachricht senden
	if (spieler.loose <= 0) { 
		for (var i = enemys; i>=0; i--) {
			Destroy(GameObject.FindGameObjectWithTag("Gegner"));
		}
		winLoose.GetComponent(UI.Text).text = looseMsg;
	} 
	// EnemyOutOfSight();
	     
     if (Input.GetKeyDown("x")){ // reload the same level
		Application.LoadLevel(Application.loadedLevel);
     }
     
     // rechte Maustaste --> Rauszoomen
	if (Input.GetKeyDown(".")){
		StartCoroutine(CameraZoom(false));;
	}
    else if (Input.GetKeyDown(",")) {
     	if (Camera.main.orthographicSize > 10) {
			StartCoroutine(CameraZoom(true));
		}
	}
    
    if (spieler.transform.localScale.x == 0){
		deathCam++;
	} 
	if (deathCam == 1) {StartCoroutine(CameraZoom(false));}
	
}
function Update () {
	
	// Kameradrehung verhindern
	Camera.main.transform.rotation = Quaternion.identity;
	if (Camera.main.transform.rotation.x != 0 ||
		Camera.main.transform.rotation.y != 0 ||
		Camera.main.transform.rotation.z != 0) {
			Camera.main.transform.rotation.x = 0;
			Camera.main.transform.rotation.y = 0;
			Camera.main.transform.rotation.z = 0;
		}
	
}


function HUD () {
	
	// Anzahl der Gegner heraus finden
	var enemys = GameObject.FindGameObjectsWithTag("Gegner");
	var spieler = GameObject.Find("Spieler").GetComponent(Spieler);
	var bigBang = GameObject.Find("BigBang");
	
	var bigger = 0;
	var smaller = 0;
		
	for (var i = 0; i < enemys.Length; i++) {
		var enemy = enemys[i];
		if (enemy) {
			if (enemy.transform.localScale.x > 
				spieler.transform.localScale.x) bigger++;
			if (enemy.transform.localScale.x < 
				spieler.transform.localScale.x) smaller++;
		}			
	}
	
	if (enemys.Length == 0) winLoose.GetComponent(UI.Text).text = winMsg;
				
	// var heading = spieler.transform.position - bigBang.transform.position;
	// var distance : int = heading.magnitude;
	// HUD Text im Spiel
	spielerScore.GetComponent(UI.Text).text = 
	"Press X for Restart \n" + 
	"Press . for ZoomOut \n" +
	"Press , for ZoomIn \n" +
	"  \n" +
	"Bigger than you: " + bigger + "\n" +
	"Smaller than you: " + smaller + "\n" +
	"\n" +
	"Collision Angle: " + collision + "\n" +
	"\n" +
	"Count of enemys: " + enemys.Length;
}


function CameraZoom (i : System.Boolean) {
	
	var elapsedTime : float = 0;
	var time : float = 0.2;
	if (deathCam == 1) time = 2; else time = 0.2;
		
	
	while  (elapsedTime < time) {
		if (i) {
			Camera.main.orthographicSize--;
			elapsedTime += Time.deltaTime;
			yield;
			
		} else {
			Camera.main.orthographicSize++;
			elapsedTime += Time.deltaTime;
			yield;
		}
		
		
	}
}