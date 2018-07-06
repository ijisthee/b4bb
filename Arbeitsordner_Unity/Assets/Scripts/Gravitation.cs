using UnityEngine;
using System.Collections;

public class Gravitation : MonoBehaviour {

	private Rigidbody[] rbs;
	private Collider[] cols;
	private float gravitationRange;
	private float mass;
	private float range;
	private float mag;
	private Vector3 offset;

	void Start () {
		gravitationRange = Settings.settings.gravitationRange;
	}

	void FixedUpdate () {
		//gravitate (gravitationRange);
	}

	public void gravitate ( float gravitationRange  ){
		range = (gravitationRange * 2) * transform.localScale.x;
		cols = Physics.OverlapSphere(transform.position, range);
		mass = GetComponent<Rigidbody> ().mass;
		for (int c=0;c<cols.Length;c++) {
			if (cols[c].attachedRigidbody && cols[c].attachedRigidbody != GetComponent<Rigidbody>()) {
				offset = (transform.position - cols[c].transform.position);
				mag = offset.magnitude;
				cols[c].attachedRigidbody.AddForce(offset/mag/mag * mass);
			}
		}
	}
}