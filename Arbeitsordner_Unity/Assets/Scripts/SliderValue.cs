using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SliderValue : MonoBehaviour {

	public GameObject slider;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void ChangeValue () {
		GetComponent<Text> ().text = slider.GetComponent<Slider>().value.ToString();
	}
}
