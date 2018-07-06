#pragma strict

function AddExplosion (col: GameObject, hitPoint: Vector3) {

	var radius = 1.0;

	
	// Applies an explosion force to all nearby rigidbodies
	// var explosionPos : Vector3 = transform.position;
	// var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
	
	// for (var hit : Collider in colliders) {
	// 	if (hit && hit.rigidbody)
			var explosionVector = hitPoint - transform.position;
	//		print(hit);
			col.GetComponent.<Rigidbody>().AddForce(explosionVector.normalized * GetComponent.<Rigidbody>().velocity.magnitude, ForceMode.Impulse);
	}	
