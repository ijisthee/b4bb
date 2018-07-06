// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Settings : MonoBehaviour {

	public static Settings settings;

	public float enemyCount  = 100f; // Anzahl der Gegner
	public float gravitationRange = 10f; // Gravitationsradius

	public GameObject gegnerSlider;
	public GameObject gravitySlider;

	private string activeScene;

	void Awake()
	{
		if (settings == null){
			DontDestroyOnLoad(gameObject);
			settings = this;
		}
		else if (settings != this) {
			Destroy (gameObject);
		}
	}


	void  Start (){
		activeScene = SceneManager.GetActiveScene ().name;

		if (activeScene == "Game") {
			Camera.main.backgroundColor = Color.black;
		}
	}

	void  Update (){
	}

	public void LoadLevel (string level){
		SceneManager.LoadScene (level);
	}

	public void LoadMenu (){
		SceneManager.LoadScene ("Menu");
	}

	public void Quit (){
		Application.Quit();
	}

	public void StoreSettings () {
		settings.enemyCount = gegnerSlider.GetComponent<Slider> ().value;
		settings.gravitationRange = gravitySlider.GetComponent<Slider> ().value;
	}
}