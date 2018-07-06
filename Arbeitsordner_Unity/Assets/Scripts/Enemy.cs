using UnityEngine;
using System.Collections;

public class Enemy : MonoBehaviour {


	public float scale = 0;
	public float gravitationRange;
	Vector3 forceVector;
	Vector3 forceVectorRotated;

	void  Start (){
		gravitationRange = Settings.settings.gravitationRange; // Gravitationsradius
		transform.localScale = new Vector3 (scale, scale, scale);
		Debug.Log ("Created: " + gameObject.name);
		AddPerpendicularForce ();
	}

	void  FixedUpdate (){
		
	}

	void OnDrawGizmosSelected() {
		Gizmos.color = Color.yellow;
		Gizmos.DrawWireSphere(transform.position, (gravitationRange * 2) * transform.localScale.x);
	}

	private void AddPerpendicularForce () {
		Vector2 toZero = new Vector3 (0, 0, 0) - transform.position;
		forceVector = toZero;//Quaternion.AngleAxis(90, Vector3.up) * toZero;
		forceVectorRotated = RotatePointAroundPivot (transform.position, forceVector, new Vector3(90, -90, 0));
		GetComponent<Rigidbody> ().AddForce (forceVectorRotated);
	}

	Vector3 RotatePointAroundPivot ( Vector3 point ,   Vector3 pivot ,   Vector3 angles  ){
		Vector3 dir = point - pivot; // get point direction relative to pivot
		dir = Quaternion.Euler(angles) * dir; // rotate it
		point = dir + pivot; // calculate rotated point
		return point; // return it
	}
}