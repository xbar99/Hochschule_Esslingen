package messer;

import senser.AircraftSentence;
import org.json.JSONArray;
import java.util.Date;

public class BasicAircraftFactory {
	public BasicAircraft generateBasicAircraft(AircraftSentence aircraftSentence) {
		// Lab2
		JSONArray sentenceData = aircraftSentence.getAircraftSentence();
		
        String operator = sentenceData.optString(1);
        if (operator.isEmpty()) {
            operator = "Unknown Operator";  // standard value if operator is empty
        }
		
		BasicAircraft basicAircraft = new BasicAircraft(
				sentenceData.getString(0), // icao
//				sentenceData.getString(1), // operator
				operator,                  // 
				new Date(sentenceData.getLong(3) * 1000), // posTime
				new Coordinate(sentenceData.getDouble(6), sentenceData.getDouble(5)), // new Coordinate(latitude, longitude)
				sentenceData.getDouble(9), // speed
				sentenceData.getDouble(10) // trak
				);
		return basicAircraft;
	}
}
