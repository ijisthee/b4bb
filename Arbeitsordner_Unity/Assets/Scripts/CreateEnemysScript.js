#pragma strict

function CreateEnemys(gegner: GameObject, gravitationRange: int) {
	// Einstellungen aus den Settings holen
	var enemyCount : int = GameObject.Find("Settings").GetComponent(Settings).enemyCount;
	
	// Spieler finden
	var spieler = GameObject.Find("Spieler").GetComponent(Spieler);
	var c = 1; // Hilfsvariable zum Kreieren von Gegnern
	
	// Startwerte des Spielers festlegen
	spieler.scale = 1.01;
	
	var newPosition = NewPosition(gravitationRange);
				
	// Gegner generieren (enemycount = Anzahl der Gegner)
	for (var i : int = 0; i<enemyCount; i++) {
		
		// Werte für x und y Position für Gegnerkreation
		var x = Random.Range(-i/10,i/10);
		var y = Random.Range(-i/10,i/10);
		
		// *** PRÜFUNG OB GEGNER IM WEG BEGIN ***
		var enemys = GameObject.FindGameObjectsWithTag("Gegner");
		if (enemys) {
			for (var e = 0; e < enemys.Length; e++) {
				
				// Zufallsposition generieren
				newPosition = NewPosition(gravitationRange);
								
				if ((spieler.transform.position.x >= x-10 && spieler.transform.position.x <= x+10) &&
					(spieler.transform.position.y >= y-10 && spieler.transform.position.y <= y+10))
					 {
					 newPosition = NewPosition(gravitationRange);	 
					 }
					 
				if ((enemys[e].transform.position.x >= x  && enemys[e].transform.position.x <= x ) &&
					(enemys[e].transform.position.y >= y  && enemys[e].transform.position.y <= y ))
					 {
					 newPosition = NewPosition(gravitationRange);
					 }
			} 
		}
		// *** PRÜFUNG OB GEGNER IM WEG END ***
		
		var enemy = Instantiate(gegner, Vector3 (newPosition.x, newPosition.y, 0), Quaternion.identity) as GameObject;
		
		// Spielerposition zuletzt generieren
		newPosition = NewPosition(gravitationRange);
		if (i == enemyCount-1) spieler.transform.position = Vector3 (newPosition.x, newPosition.y, 0);
		
		// Dem Gegnerobjekt einen Namen geben
		enemy.name = "Gegner"+i;
		
		// EnemyScript auslesem
		var enemyScript = enemy.GetComponent(Enemy);				
		
		// alle x Durchläufe die Größe und die Masse erhöhen
		// var g :float = i+1;
		// if (g % 100 == 0) c++;
		
		enemyScript.scale = 1;
		enemy.GetComponent.<Rigidbody>().mass = 1;
		
		// SphereCollider hinzufügen
		enemy.AddComponent(SphereCollider);
		
		// Collider anfügen
		GetComponent(CheckApperiance).CheckForScale(enemyScript.scale, enemy);
	}
}

function NewPosition (gravitationRange: int) {
	var enemyCount : int = GameObject.Find("Settings").GetComponent(Settings).enemyCount;
	var newPosition : Vector2 = Random.insideUnitCircle * (enemyCount / (enemyCount / 10) * gravitationRange);
	return newPosition;
}