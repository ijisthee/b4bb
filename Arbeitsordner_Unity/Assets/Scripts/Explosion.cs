// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System.Collections;

public class Explosion : MonoBehaviour {


	void  AddExplosion ( GameObject col ,   Vector3 hitPoint  ){

		float radius= 1.0f;


		// Applies an explosion force to all nearby rigidbodies
		// Vector3 explosionPos = transform.position;
		// Collider[] colliders = Physics.OverlapSphere (explosionPos, radius);

		// foreach(Collider hit in colliders) {
		// 	if (hit && hit.rigidbody)
		Vector3 explosionVector= hitPoint - transform.position;
		//		print(hit);
		col.GetComponent<Rigidbody>().AddForce(explosionVector.normalized * GetComponent<Rigidbody>().velocity.magnitude, ForceMode.Impulse);
	}	

}