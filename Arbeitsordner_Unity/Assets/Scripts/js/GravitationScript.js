#pragma strict

function Gravitation(gravitationRange : float) {
	var range = gravitationRange * transform.localScale.x/2;;
	var cols : Collider[] = Physics.OverlapSphere(transform.position, range);
	var rbs : Array = new Array();
	for (var c=0;c<cols.length;c++) {
		if (cols[c].attachedRigidbody && cols[c].attachedRigidbody != GetComponent.<Rigidbody>()) {
			var breaking :boolean = false;
			for (var r=0;r<rbs.length;r++) {
				if (cols[c].attachedRigidbody == rbs[r]) {
					breaking=true;
					break;
				}
			}
			if (breaking) continue;
			rbs.Add(cols[c].attachedRigidbody);
			var offset : Vector3 = (transform.position - cols[c].transform.position);
			var mag: float = offset.magnitude;
			cols[c].attachedRigidbody.AddForce((offset/mag/mag * (GetComponent.<Rigidbody>().mass)));
		}
	}
}