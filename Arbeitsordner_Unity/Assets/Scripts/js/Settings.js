#pragma strict

var formen :GameObject;

static public var enemyCount : int = 500; // Anzahl der Gegner
static public var gravitationRange : int = 5; // Gravitationsradius

function Start () {

	if (Application.loadedLevelName == "Game") Camera.main.backgroundColor = Color.black;
	
}

function Update () {
	
	// Wenn das Menu geladen ist
	if (Application.loadedLevelName == "Menu") {
		enemyCount = GameObject.Find("Gegner").GetComponent(UI.Slider).value;
		gravitationRange = GameObject.Find("Gravity").GetComponent(UI.Slider).value;
		
		GameObject.Find("GravitiyValue").GetComponent(UI.Text).text = ""+gravitationRange;
		GameObject.Find("GegnerWert").GetComponent(UI.Text).text = ""+enemyCount;
	}
}

function LoadLevel() {
	Application.LoadLevel("Game");
}

function LoadMenu() {
	Application.LoadLevel("Menu");
}

function Quit() {
	Application.Quit();
}