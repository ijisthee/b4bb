#pragma strict

internal var enemys: int;
internal var spieler: GameObject;
internal var indLeft: GameObject;
internal var indRight: GameObject;
internal var indTop: GameObject;
internal var indBottom: GameObject;

function Start () {

	// Anzahl der Gegner heraus finden
	enemys = GameObject.FindGameObjectsWithTag("Gegner").Length;
	spieler = GameObject.Find("Spieler");
	
	// Position der Gegnerindikatoren finden
	indLeft = GameObject.Find("IndLeft");
	indRight = GameObject.Find("IndRight");
	indTop = GameObject.Find("IndTop");
	indBottom = GameObject.Find("IndBottom");
}

function Update () {

	
	
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
	
	// Gegnerindikatoren mittig platzieren
	indLeft.transform.position = Vector3(leftBorder-1, topBorder - horizontalMid/2);
	indRight.transform.position = Vector3(rightBorder+1, topBorder - horizontalMid/2);
	indTop.transform.position = Vector3(rightBorder - verticalMid/2, topBorder+1);
	indBottom.transform.position = Vector3(rightBorder - verticalMid/2, botBorder-1);

	// Variablen zum Prüfen ob der Indikator bereits gesetzt wurde
	var checkLeft = true;
	var checkRight = true;
	var checkTop = true;
	var checkBottom = true;
	
	// Schleife zum Prüfen ob sich ein Gegner außerhalb des Bildschirms befindet
	var i = enemys; // Zählervariable für die Schleife
	while (i >= 0) {
		var enemy = GameObject.Find("Gegner"+(i-1));
			if (enemy) {
				
				// Indikatoren.Glow einschalten, wenn sich etwas außerhalb des Bildschirms befindet
				var enemyPos = enemy.transform.position;
				if(enemyPos.x <= leftBorder) {if (checkLeft) indLeft.transform.position.x += 5; checkLeft = false;}
				if(enemyPos.x >= rightBorder) {if (checkRight) indRight.transform.position.x -= 5; checkRight = false;}
				if(enemyPos.y >= topBorder) {if (checkTop) indTop.transform.position.y -= 5; checkTop = false;}
				if(enemyPos.y <= botBorder) {if (checkBottom) indBottom.transform.position.y += 5; checkBottom = false;}
				
			}		
		i--;
	}	
	
	

}

function EnemeyOutOfSight() {

}