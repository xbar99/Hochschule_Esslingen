package senser;

import org.json.JSONArray;
import java.util.ArrayList;

public class AircraftSentenceFactory {
	// Lab1
	public ArrayList<AircraftSentence> fromAircraftJSON(JSONArray jsonArrayList) {
		ArrayList<AircraftSentence> arrayList = new ArrayList<AircraftSentence>();
		
		for (int i = 0; i < jsonArrayList.length(); i++) {			
			arrayList.add(new AircraftSentence(jsonArrayList.getJSONArray(i)));
		}
		
		return arrayList;
	}
}
