using UnityEngine;
using System.Collections;

 class CheckApperiance : MonoBehaviour {

	void  Start (){

	}

	void  Update (){

	}

	public void  CheckForScale ( float scale ,   GameObject obj  ){
		
		// Vector3 tScale= object.transform;

		if (scale > 0) {
			obj.transform.localScale = new Vector3(scale, scale, scale);
		}
		Destroy(obj.GetComponent<SphereCollider>());
		obj.AddComponent<SphereCollider>();
	}
}