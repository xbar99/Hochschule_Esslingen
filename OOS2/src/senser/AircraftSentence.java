package senser;

import org.json.JSONArray;

public class AircraftSentence {
	// Lab1
	private JSONArray aircraftSentence;
	
	public AircraftSentence(JSONArray aircraftSentence) {
		this.aircraftSentence  = aircraftSentence;
	}
	
	public JSONArray getAircraftSentence() {
		return aircraftSentence;
	}
}
