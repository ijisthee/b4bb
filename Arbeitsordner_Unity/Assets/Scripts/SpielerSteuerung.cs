// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System.Collections;

public class SpielerSteuerung : MonoBehaviour {


	public float speed= 5;
	public float moveSpeed= 2.0f;  // Units per second
	int deathCam= 0;
	void  Start (){

	}

	void  FixedUpdate (){

		Camera.main.orthographic = true;
		// Keyboardsteuerung (WASD, Pfeiltasten)
		Vector2 directionVector= new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
		if (directionVector != Vector2.zero) {
			gameObject.GetComponent<Rigidbody>().AddForce(new Vector3(Input.GetAxis("Horizontal") * GetComponent<Rigidbody>().mass, Input.GetAxis("Vertical") * GetComponent<Rigidbody>().mass));
		}

		// Maussteuerung (Linke Maustaste)
		if (Input.GetMouseButton(0)) {

			Vector3 targetPos= Input.mousePosition;
			targetPos.z = Mathf.Abs(0.0f - Camera.main.transform.position.z);
			targetPos = Camera.main.ScreenToWorldPoint(targetPos);
			Vector3 mouseDir= targetPos - transform.position;
			mouseDir = mouseDir.normalized;
			gameObject.GetComponent<Rigidbody>().AddForce(mouseDir * GetComponent<Rigidbody>().mass*2) ;
		}


		// rechte Maustaste --> Rauszoomen
		if (Input.GetKeyDown(".")){
			StartCoroutine(CameraZoom(false));;
		}
		else if (Input.GetKeyDown(",")) {
			if (Camera.main.orthographicSize > 10) {
				StartCoroutine(CameraZoom(true));
			}
		}



	}

	IEnumerator  CameraZoom ( System.Boolean i  ){

		float elapsedTime = 0;
		float time = 0.2f;
		float waitTime = 0;
		if (deathCam == 1) time = 2; else time = 0.2f;


		while  (elapsedTime < time) {
			if (i) {
				Camera.main.orthographicSize--;
				elapsedTime += Time.deltaTime;
				yield return new WaitForSeconds (waitTime);

			} else {
				Camera.main.orthographicSize++;
				elapsedTime += Time.deltaTime;
				yield return new WaitForSeconds (waitTime);
			}


		}
	}
}