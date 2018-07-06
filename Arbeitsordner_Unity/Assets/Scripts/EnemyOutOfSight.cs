//// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
//// Do test the code! You usually need to change a few small bits.
//
//using UnityEngine;
//using System.Collections;
//
//public class EnemyOutOfSight : MonoBehaviour {
//
//
//	internal int enemys;
//	internal GameObject spieler;
//	internal GameObject indLeft;
//	internal GameObject indRight;
//	internal GameObject indTop;
//	internal GameObject indBottom;
//
//	void  Start (){
//
//		// Anzahl der Gegner heraus finden
//		enemys = GameObject.FindGameObjectsWithTag("Gegner").Length;
//		spieler = GameObject.Find("Spieler");
//
//		// Position der Gegnerindikatoren finden
//		indLeft = GameObject.Find("IndLeft");
//		indRight = GameObject.Find("IndRight");
//		indTop = GameObject.Find("IndTop");
//		indBottom = GameObject.Find("IndBottom");
//	}
//
//	void  Update (){
//
//
//
//		// Bildschirmgrenze herausfinden	
//		float dist= (spieler.transform.position - Camera.main.transform.position).z;
//		float leftBorder= Camera.main.ViewportToWorldPoint(new Vector3(0,0,dist)).x;
//		float rightBorder= Camera.main.ViewportToWorldPoint(new Vector3(1,0,dist)).x;
//		float topBorder= Camera.main.ViewportToWorldPoint(new Vector3(1,1,dist)).y;
//		float botBorder= Camera.main.ViewportToWorldPoint(new Vector3(1,0,dist)).y;
//		// print (leftBorder);
//
//		// Distanz zwischen Top und Bottom Border heraus finden
//		Vector3 horizontalMid= Vector3.Distance(Camera.main.ViewportToWorldPoint(new Vector3(0,1,dist)), Camera.main.ViewportToWorldPoint(new Vector3(0,0,dist)));
//		Vector3 verticalMid= Vector3.Distance(Camera.main.ViewportToWorldPoint(new Vector3(1,1,dist)), Camera.main.ViewportToWorldPoint(new Vector3(0,1,dist)));
//
//		// Gegnerindikatoren mittig platzieren
//		indLeft.transform.position = new Vector3(leftBorder-1, (topBorder - horizontalMid/2));
//		indRight.transform.position = new Vector3(rightBorder+1, topBorder - horizontalMid/2);
//		indTop.transform.position = new Vector3(rightBorder - verticalMid/2, topBorder+1);
//		indBottom.transform.position = new Vector3(rightBorder - verticalMid/2, botBorder-1);
//
//		// Variablen zum Prüfen ob der Indikator bereits gesetzt wurde
//		bool checkLeft= true;
//		bool checkRight= true;
//		bool checkTop= true;
//		bool checkBottom= true;
//
//		// Schleife zum Prüfen ob sich ein Gegner außerhalb des Bildschirms befindet
//		int i= enemys; // Zählervariable für die Schleife
//		while (i >= 0) {
//			GameObject enemy= GameObject.Find("Gegner"+(i-1));
//			if (enemy) {
//
//				// Indikatoren.Glow einschalten, wenn sich etwas außerhalb des Bildschirms befindet
//				FIXME_VAR_TYPE enemyPos= enemy.transform.position;
//				if(enemyPos.x <= leftBorder) {if (checkLeft) indLeft.transform.position.x += 5; checkLeft = false;}
//				if(enemyPos.x >= rightBorder) {if (checkRight) indRight.transform.position.x -= 5; checkRight = false;}
//				if(enemyPos.y >= topBorder) {if (checkTop) indTop.transform.position.y -= 5; checkTop = false;}
//				if(enemyPos.y <= botBorder) {if (checkBottom) indBottom.transform.position.y += 5; checkBottom = false;}
//
//			}		
//			i--;
//		}	
//
//
//
//	}
//
//	void  EnemeyOutOfSight (){
//
//	}
//}