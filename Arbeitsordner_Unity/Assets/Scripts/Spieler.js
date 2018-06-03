#pragma strict

var scale : float = 1;
var loose : float = 3;
var gameManager: GameObject;
var gravitationRange : float; // Gravitationsradius

function Start () {
	gravitationRange = GameObject.Find("Settings").GetComponent(Settings).gravitationRange; // Gravitationsradius
	gameManager.GetComponent(CheckApperiance).CheckForScale(scale, gameObject);
	loose = 3;
}

function Update () {
	if (transform.localScale.x > 0) {
		// Kameraposition an Spielerposition anpassen
		Camera.main.transform.position.x = transform.position.x;
		Camera.main.transform.position.y = transform.position.y;	
	}
	
} 

function FixedUpdate () {
	GetComponent(GravitationScript).Gravitation(gravitationRange);
}

function OnCollisionEnter(col: Collision) {
	
	GetComponent(CollisionCheckScript).CollisionCheck(col);
	
}