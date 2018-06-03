#pragma strict

public var scale: float = 0;
var bounce : int = 0;
var gravitationRange: float;
var gameManager: GameObject;

function Start () {

	gravitationRange = GameObject.Find("Settings").GetComponent(Settings).gravitationRange; // Gravitationsradius
	// Gegner führt nur alle 0,5-2 Sekunden eine Bewegungsaktion aus
	// InvokeRepeating("EnemyMove", 0, Random.Range(0.5, 2));
	
	// Gegner führt nur alle 0,5-2 Sekunden eine Bewegungsaktion aus
	// InvokeRepeating("EnemyHunt", 0, Random.Range(2, 5));
	gameManager = GameObject.Find("GameManager");
}


function FixedUpdate () {

	

	
}


function Update () {

	var range = gravitationRange * transform.localScale.x/2;;
	var cols : Collider[] = Physics.OverlapSphere(transform.position, range);
	var rbs : Array = new Array();
	for (var c=0;c<cols.length;c++) {
		if (cols[c].attachedRigidbody && cols[c].attachedRigidbody != rigidbody) {
			var breaking :boolean = false;
			for (var r=0;r<rbs.length;r++) {
				if (cols[c].attachedRigidbody == rbs[r]) {
					breaking=true;
					break;
				}
			}
			if (breaking) continue;
			rbs.Add(cols[c].attachedRigidbody);
			var offset : Vector3 = (transform.position - cols[c].transform.position);
			var mag: float = offset.magnitude;
			cols[c].attachedRigidbody.AddForce((offset/mag/mag * (rigidbody.mass)));
		}
	}
	
}

function LerpCollision (col: GameObject) {

	// Debug.Log("Lerped   "+ name);
	if (!bounce) {// Zerstören, wenn kein Abprall stattfindet
	
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
	}
	Destroy(gameObject.GetComponent(SphereCollider));
    gameObject.AddComponent(SphereCollider);
}

function OnCollisionEnter(col: Collision) {
		
	var checkForDestroy = 0;
	
	var orthogonalVector = transform.position - col.contacts[0].point;
	var oppositeVelocity = rigidbody.velocity * -1;
	var collisionAngle = Vector3.Angle(orthogonalVector, oppositeVelocity);
	
	// Explosion ausführen
	AddExplosion(col.collider.gameObject, col.contacts[0].point);
	
	
	// Darf Prüfung durchführen wenn Geschwindigkeit doppelt so schnell
	if ((rigidbody.velocity.magnitude / 2 > col.rigidbody.velocity.magnitude)) {
		checkForDestroy = 1;
		if (collisionAngle < 70 + col.transform.localScale.x / 2 || collisionAngle > 110 - col.transform.localScale.x / 2) 
			{checkForDestroy = 1; }
		else {checkForDestroy = 0;}
	} else checkForDestroy = 0;
	
	// Wenn keiner der beiden Geschwindigkeiten doppelt so schnell ist, dürfen beide prüfen
	if ((rigidbody.velocity.magnitude / 2 - col.rigidbody.velocity.magnitude < col.rigidbody.velocity.magnitude / 2) && 
		(col.rigidbody.velocity.magnitude / 2 - rigidbody.velocity.magnitude < rigidbody.velocity.magnitude / 2))
		// Debug.Log("Keiner ist schneller -- "+gameObject.name);
		{checkForDestroy = 1;
		}	
		
	// Prüfung nach Größe	
	if (checkForDestroy) {
		if (col.transform.localScale.x <= transform.localScale.x) {
			rigidbody.mass += col.rigidbody.mass;
			StartCoroutine(LerpCollision(col.collider.gameObject));
			Destroy(col.collider);
		}
	}
	
	
}

function AddExplosion (col: GameObject, hitPoint: Vector3) {

	var radius = 1.0;

	
	// Applies an explosion force to all nearby rigidbodies
	// var explosionPos : Vector3 = transform.position;
	// var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
	
	// for (var hit : Collider in colliders) {
	// 	if (hit && hit.rigidbody)
			var explosionVector = hitPoint - transform.position;
	//		print(hit);
			col.rigidbody.AddForce(explosionVector.normalized * (transform.localScale.x + col.transform.localScale.x), ForceMode.Impulse);
	}	
