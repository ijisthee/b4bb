using UnityEngine;
using System.Collections;

public class Rotate : MonoBehaviour {

	public float rotSpeed;

	public bool up;
	public bool down;
	public bool forward;
	public bool back;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () 
	{
		if(up)
		{
			transform.Rotate(Vector3.up, -rotSpeed * Time.deltaTime);
		}
		else if(down)
		{
			transform.Rotate(Vector3.down, -rotSpeed * Time.deltaTime);
		}
		else if(forward)
		{
			transform.Rotate(Vector3.forward, -rotSpeed * Time.deltaTime);
		}
		else if(back)
		{
			transform.Rotate(Vector3.back, -rotSpeed * Time.deltaTime);
		}

	}
}
