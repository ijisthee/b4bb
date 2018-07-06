#pragma strict

function LerpCollision (col: GameObject) {
	
		var fromScale = Vector3(transform.localScale.x, transform.localScale.y, transform.localScale.z);
		var toScale = Vector3(transform.localScale.x + col.transform.localScale.x*0.2, transform.localScale.y + col.transform.localScale.y*0.2, transform.localScale.y + col.transform.localScale.y*0.2);
		var elapsedTime : float = 0;
		var time : float = 0.2;
		
		while  (elapsedTime < time) {
			transform.localScale = Vector3.Lerp(fromScale, toScale, elapsedTime/ time);
			elapsedTime += Time.deltaTime;
			if (col) {
				col.transform.localScale = Vector3.Lerp(Vector3(col.transform.localScale.x, col.transform.localScale.y, col.transform.localScale.z), Vector3(0,0,0), elapsedTime/ time);
				yield;
			}
		}
		if (col == GameObject.Find("Spieler")) {//Application.LoadLevel(Application.loadedLevel);
		} 
		else Destroy (col); 
		
	Destroy(gameObject.GetComponent(SphereCollider));
    gameObject.AddComponent(SphereCollider);
}
