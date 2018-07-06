using UnityEngine;
using System.Collections;

public class Spieler : MonoBehaviour {


	public float scale = 1f;
	public float loose;
	public GameObject gameManager;
	public float gravitationRange; // Gravitationsradius

	void  Start (){
		gravitationRange = Settings.settings.gravitationRange; // Gravitationsradius
		// Spielerpositiongenerieren
		transform.position = new Vector3 (0, 0, 0);
	}

	void  Update (){
		if (transform.localScale.x > 0) {
			// Kameraposition an Spielerposition anpassen
			Vector3 updatedPosition = new Vector3(transform.position.x, transform.position.y, -100f);
			Camera.main.transform.position = updatedPosition;
		}
	}
}