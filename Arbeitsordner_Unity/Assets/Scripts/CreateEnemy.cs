using UnityEngine;
using System.Collections;

public class CreateEnemy : MonoBehaviour {

	public GameObject gegner;

	private Settings settings;
	private float enemyCount;
	private float gravitationRange;

	void Start() {
		gravitationRange = Settings.settings.gravitationRange;
		enemyCount = Settings.settings.enemyCount;
		CreateEnemys ();
		Debug.Log (Settings.settings.enemyCount);
	}

	void FixedUpdate () {
		GameObject[] enemies = GameObject.FindGameObjectsWithTag ("Gegner");
		if (enemies.Length < enemyCount) {
			CreateEnemys ();
		}
	}

	public void  CreateEnemys (){
		GameObject[] enemies = GameObject.FindGameObjectsWithTag ("Gegner");
		// Gegner generieren (enemycount = Anzahl der Gegner)
		for (int i = enemies.Length; i < enemyCount; i++) {
			Vector2 newPosition = NewPosition(gravitationRange);
			GameObject enemy = Instantiate(gegner, new Vector3 (newPosition.x, newPosition.y, 0), Quaternion.identity) as GameObject;
			CheckOverlapping (enemy);

			// Dem Gegnerobjekt einen Namen geben
			enemy.name = "Gegner"+i;

			Enemy enemyScript = enemy.GetComponent<Enemy> ();
			enemyScript.scale = Random.Range(0.5f, 1.5f);
			enemy.GetComponent<Rigidbody>().mass = enemyScript.scale;

			// SphereCollider hinzufügen
			enemy.AddComponent<SphereCollider>();
		}
	}

	Vector2  NewPosition ( float gravitationRange  ){
		float enemyCount = Settings.settings.enemyCount;
		Vector2 newPosition = Random.insideUnitCircle * (enemyCount / (enemyCount / 10) * gravitationRange / 2);
		return newPosition;
	}

	private void CheckOverlapping (GameObject enemy) {
		int attempts = 0;
		do {
			float width = enemy.GetComponent<Renderer> ().bounds.size.x;
			float height = enemy.GetComponent<Renderer> ().bounds.size.y;

			Vector3 topRight = enemy.transform.position, topLeft = enemy.transform.position, bottomRight = enemy.transform.position, bottomLeft = enemy.transform.position;

			topRight.x += width / 2;
			topRight.y += height / 2;

			topLeft.x -= width / 2;
			topLeft.y += height / 2;

			bottomRight.x += width / 2;
			bottomRight.y -= height / 2;

			bottomLeft.x -= width / 2;
			bottomLeft.y -= height / 2;

			// Get a Random spawn Position
			if(!Physics2D.OverlapArea(topLeft, bottomRight)) { // Check the bounds of the spawn position
				break;
			}
			Vector2 newPosition = NewPosition(Settings.settings.gravitationRange);
			enemy.transform.position = newPosition;

		} while (++attempts <= 10); // Limit spawn attempts to prevent infinite loop
		if (attempts > 10) {
			Destroy (enemy);
		}
	}
}