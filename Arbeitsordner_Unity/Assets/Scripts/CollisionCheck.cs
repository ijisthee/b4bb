using UnityEngine;
using System.Collections;

public class CollisionCheck : MonoBehaviour {

	Collision collision;
	public bool checkForDestroy;

	public void  OnCollisionEnter ( Collision col  ){
		
		collision = col;

		if (ownScaleSmaller() 
			) {
			DestroyMyself ();
		}

		// Darf Prüfung durchführen wenn Geschwindigkeit höher ist
//		if (isOwnSpeedHigher()) {
//			checkForDestroy = true;
//			Debug.Log ("OwnSpeedHigher: " + isOwnSpeedHigher());
//			if (relativeMovementAngle() < 70) {
//				Debug.Log ("relativeMovementAngle: " + relativeMovementAngle());
//				// checkForDestroy = false;
//			}
//			if (collisionAngle() > 80 && collisionAngle() < 100) {
//				Debug.Log ("collisionAngle: " + collisionAngle());
//				checkForDestroy = false;	
//			}
//			if ((relativeSpeed() < 1) && ((relativeSpeed() > -1))) {
//				DestroyMyself ();
//			}
//		}
//		else {
//			checkForDestroy = false;
//		}
	}

	private void DestroyMyself() {
		collision.rigidbody.mass += GetComponent<Rigidbody>().mass;
		collision.gameObject.GetComponent<CollisionCheck> ().LerpCoroutine (gameObject);
		Destroy(GetComponent<Collider>());
		Destroy(GetComponent<Rigidbody>());
		Destroy (gameObject);
	}
		
	private bool isOwnSpeedHigher () {
		float ownMagnitude = GetComponent<Rigidbody>().velocity.magnitude;
		float collisionMagnitude = collision.rigidbody.velocity.magnitude;
		return ownMagnitude > collisionMagnitude;
	}

	private bool ownMassHigherOrEqual () {
		return GetComponent<Rigidbody>().mass >= collision.rigidbody.mass;
	}

	private bool ownMassLower () {
		return GetComponent<Rigidbody>().mass < collision.rigidbody.mass;
	}

	private bool ownScaleSmaller () {
		return transform.localScale.x < collision.transform.localScale.x;
	}

	private float collisionAngle() {
		return Vector3.Angle(orthogonalVector(), oppositeVelocity());
	}

	private Vector3 orthogonalVector () {
		return transform.position - collision.contacts[0].point;
	}

	private Vector3 oppositeVelocity () {
		return GetComponent<Rigidbody>().velocity * -1;
	}

	private float relativeMovementAngle () {
		return Vector3.Angle(GetComponent<Rigidbody>().velocity, collision.rigidbody.velocity);
	}

	private float relativeSpeed () {
		return GetComponent<Rigidbody>().velocity.magnitude - collision.rigidbody.velocity.magnitude;
	}

	public void LerpCoroutine (GameObject obj) {
		StartCoroutine(LerpCollision(obj));
	}

	public IEnumerator LerpCollision ( GameObject obj  ){

		Vector3 fromScale = transform.localScale;
		float toScaleX = transform.localScale.x + obj.transform.localScale.x * 0.2f;
		float toScaleY = transform.localScale.y + obj.transform.localScale.y * 0.2f;
		float toScaleZ = transform.localScale.z + obj.transform.localScale.z * 0.2f;
		Vector3 toScale = new Vector3 (toScaleX, toScaleY, toScaleZ);
		float elapsedTime = 0;
		float time = 0.2f;

		while  (elapsedTime < time) {
			transform.localScale = Vector3.Lerp(fromScale, toScale, elapsedTime/ time);
			elapsedTime += Time.deltaTime;
			if (obj) {
				obj.transform.localScale = Vector3.Lerp(
					obj.transform.localScale, 
					new Vector3(0,0,0), 
					elapsedTime/ time);
				yield return new WaitForSeconds(0);
			}
		}
	}
}
