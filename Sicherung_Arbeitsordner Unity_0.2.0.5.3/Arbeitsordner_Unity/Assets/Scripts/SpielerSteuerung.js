#pragma strict

public var speed = 5;
public var moveSpeed = 2.0;  // Units per second
var deathCam = 0;
function Start () {
	
}

function FixedUpdate () {
	
	Camera.main.orthographic = true;
	// Keyboardsteuerung (WASD, Pfeiltasten)
	var directionVector = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
	if (directionVector != Vector2.zero) {
		gameObject.GetComponent(Rigidbody).AddForce(Vector3(Input.GetAxis("Horizontal") * rigidbody.mass, Input.GetAxis("Vertical") * rigidbody.mass));
	}
	
	// Maussteuerung (Linke Maustaste)
	if (Input.GetMouseButton(0)) {
        
       	var targetPos = Input.mousePosition;
    	targetPos.z = Mathf.Abs(0.0 - Camera.main.transform.position.z);
    	targetPos = Camera.main.ScreenToWorldPoint(targetPos);
    	var mouseDir = targetPos - transform.position;
    	mouseDir = mouseDir.normalized;
        gameObject.GetComponent(Rigidbody).AddForce(mouseDir * rigidbody.mass*2) ;
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

function CameraZoom (i : System.Boolean) {
	
	var elapsedTime : float = 0;
	var time : float = 0.2;
	if (deathCam == 1) time = 2; else time = 0.2;
		
	
	while  (elapsedTime < time) {
		if (i) {
			Camera.main.orthographicSize--;
			elapsedTime += Time.deltaTime;
			yield;
			
		} else {
			Camera.main.orthographicSize++;
			elapsedTime += Time.deltaTime;
			yield;
		}
		
		
	}
}