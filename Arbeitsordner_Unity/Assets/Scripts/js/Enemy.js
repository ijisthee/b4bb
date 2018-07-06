#pragma strict

var scale: float = 0;
var gravitationRange: float;
var gameManager: GameObject;

function Start () {
	gravitationRange = GameObject.Find("Settings").GetComponent(Settings).gravitationRange; // Gravitationsradius
	gameManager = GameObject.Find("GameManager");
}

function FixedUpdate () {

	

	
}

function Update () {
	GetComponent(GravitationScript).Gravitation(gravitationRange);
}

function OnCollisionEnter(col: Collision) {
	GetComponent(CollisionCheckScript).CollisionCheck(col);
}

function OnCollisionStay(collisionInfo : Collision) {
		// Debug-draw all contact points and normals
		for (var contact : ContactPoint in collisionInfo.contacts) {
			Debug.DrawRay(contact.point, contact.normal * 10, Color.white);
		}
	}