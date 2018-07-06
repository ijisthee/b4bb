#pragma strict

function Start () {

}

function Update () {

}

function CheckForScale(scale: float, object:GameObject){
	
	// var tScale = object.transform;
	
	if (scale > 0) {
		object.transform.localScale = Vector3(scale, scale, scale);
	}
	Destroy(object.GetComponent(SphereCollider));
    object.AddComponent(SphereCollider);
}