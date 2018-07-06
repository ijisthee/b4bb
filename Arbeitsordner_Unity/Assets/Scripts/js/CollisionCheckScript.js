#pragma strict

function CollisionCheck (col: Collision) {

	var checkForDestroy = 0;
	
	var orthogonalVector = transform.position - col.contacts[0].point;
	var oppositeVelocity = GetComponent.<Rigidbody>().velocity * -1;
	var collisionAngle = Vector3.Angle(orthogonalVector, oppositeVelocity);
	var relativeMovementAngle = Vector3.Angle(GetComponent.<Rigidbody>().velocity, col.rigidbody.velocity);
	var relativeSpeed = GetComponent.<Rigidbody>().velocity.magnitude - col.rigidbody.velocity.magnitude;
	
	// Explosion ausführen
	GetComponent(ExplosionScript).AddExplosion(col.collider.gameObject, col.contacts[0].point);
	
	// Darf Prüfung durchführen wenn Geschwindigkeit höher ist
	if ((GetComponent.<Rigidbody>().velocity.magnitude > col.rigidbody.velocity.magnitude)) {
		checkForDestroy = 1; 
		if (collisionAngle > 80 && collisionAngle < 100) checkForDestroy = 0;
		else checkForDestroy = 1;
	}
	else {checkForDestroy = 0;}
	
	// Ist der Relative Bewegungswinkel größer als 70°
	if (relativeMovementAngle < 70) checkForDestroy = 1;
	
	// Ist die Relative Geschwindigkeit kleiner als 1
	if ((relativeSpeed < 1) && ((relativeSpeed > -1))) checkForDestroy = 1;

		// Prüfung nach Größe	
	if (checkForDestroy) {
		if (col.transform.localScale.x <= transform.localScale.x) {
			GetComponent.<Rigidbody>().mass += col.rigidbody.mass;
			StartCoroutine(GetComponent(CollisionLerpScript).LerpCollision(col.collider.gameObject));
			Destroy(col.collider);
		}
	}

}