// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour {
	
	public GameObject gegner; // GegnerPREFAB
	public GameObject spielerScore;
	public GameObject winLoose; // Gewonnen/ Verloren Anzeige
	public float indgroesse = 2.5f; // Je größer der Wert, desto kleiner die Indikatoren

	// HUD Nachrichten Gewinnen/ Verlieren
	public string looseMsg = "GAME OVER!!! -- X DRÜCKEN FÜR NEUSTART";
	public string winMsg = "GEWONNEN!!! -- X DRÜCKEN FÜR NEUSTART";

	// Variablen zum Prüfen ob der Indikator bereits gesetzt wurde
	public bool checkLeft= true;
	public bool checkRight= true;
	public bool checkTop= true;
	public bool checkBottom= true;

	public bool checkLeftTop= true;
	public bool checkRightTop= true;
	public bool checkLeftBottom= true;
	public bool checkRightBottom= true;
	public int deathCam= 0;

	public float gravitationRange;

	public float collision = 0;


	void  Start (){

		gravitationRange = Settings.settings.gravitationRange; // Gravitationsradius

		// Hud einmal pro Sekunde updaten
		InvokeRepeating("HUD", 0, 0.2f);
		// InvokeRepeating("EnemyOutOfSight", 0, 1);

		winLoose.GetComponent<Text>().text = "";
		// Camera.main.backgroundColor = Color.black;
	}


	void  FixedUpdate (){

		Spieler spieler= GameObject.Find("Spieler").GetComponent<Spieler>();
		int enemys= GameObject.FindGameObjectsWithTag("Gegner").Length;

		// Alle Gegner löschen und Loose Nachricht senden
		if (spieler.loose <= 0) { 
			for (int i= enemys; i>=0; i--) {
				Destroy(GameObject.FindGameObjectWithTag("Gegner"));
			}
			winLoose.GetComponent<Text>().text = looseMsg;
		} 
		// EnemyOutOfSight();

		if (Input.GetKeyDown("x")){ // reload the same level
			SceneManager.LoadScene ("Menu");
		}

		// rechte Maustaste --> Rauszoomen
		if (Input.GetKeyDown(".")){
			StartCoroutine(CameraZoom(false));
		}
		else if (Input.GetKeyDown(",")) {
			if (Camera.main.orthographicSize > 10) {
				StartCoroutine(CameraZoom(true));
			}
		}

		if (spieler.transform.localScale.x == 0){
			deathCam++;
		} 
		if (deathCam == 1) {StartCoroutine(CameraZoom(false));}

	}
	void  Update (){

		// Kameradrehung verhindern
//		Camera.main.transform.rotation = new Vector3(0, 0, 0);
//		if (Camera.main.transform.rotation.x != 0 ||
//			Camera.main.transform.rotation.y != 0 ||
//			Camera.main.transform.rotation.z != 0) {
//			Vector3 rotation = new Quaternion (0, 0, 0);
//			Camera.main.transform.rotation = rotation;
//		}

	}


	void  HUD (){

		// Anzahl der Gegner heraus finden
		GameObject[] enemys= GameObject.FindGameObjectsWithTag("Gegner");
		Spieler spieler= GameObject.Find("Spieler").GetComponent<Spieler>();

		int bigger= 0;
		int smaller= 0;

		for (int i= 0; i < enemys.Length; i++) {
			GameObject enemy= enemys[i];
			if (enemy) {
				if (enemy.transform.localScale.x > 
					spieler.transform.localScale.x) bigger++;
				if (enemy.transform.localScale.x < 
					spieler.transform.localScale.x) smaller++;
			}			
		}

		if (enemys.Length == 0) winLoose.GetComponent<Text>().text = winMsg;

		// Vector3 heading= spieler.transform.position - bigBang.transform.position;
		// int distance = heading.magnitude;
		// HUD Text im Spiel
		spielerScore.GetComponent<Text>().text = 
			"Press X for Restart n" + 
			"Press . for ZoomOut n" +
			"Press , for ZoomIn n" +
			"  n" +
			"Bigger than you: " + bigger + "n" +
			"Smaller than you: " + smaller + "n" +
			"n" +
			"Collision Angle: " + collision + "n" +
			"n" +
			"Count of enemys: " + enemys.Length;
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