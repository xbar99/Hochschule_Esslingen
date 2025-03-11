package senser;

import org.json.JSONArray;

import jsonstream.*;
import java.util.ArrayList;
import observer.SimpleObservable;

public class Senser extends SimpleObservable<AircraftSentence> implements Runnable // Lab2 => Alternatively: SimpleObservable<JSONArray>
{
	PlaneDataServer server;

	public Senser(PlaneDataServer server)
	{
		this.server = server;
	}

	private String getSentence()
	{
		String list = server.getPlaneListAsString();
		return list; 
	}
	
	public void run()
	{
		JSONArray planeArray;
		ArrayList<AircraftSentence> arrayList = new ArrayList<AircraftSentence>();
		AircraftSentenceFactory sentenceFactory = new AircraftSentenceFactory();
		AircraftDisplay aircraftDisplay = new AircraftDisplay(); // not needed for Lab2, only relevant for Lab1
		
		try {
			while (true)
			{			
				planeArray = server.getPlaneArray();
				arrayList = sentenceFactory.fromAircraftJSON(planeArray);
			
				System.out.println("Current Aircrafts in range " + planeArray.length());
				for (int i = 0; i < arrayList.size(); i++) {
					// Lab1
					/* if(i == arrayList.size() - 1) {
						aircraftDisplay.display(arrayList.get(i), true); // no comma is used if this is the last aircraft sentence
					}
					else {
						aircraftDisplay.display(arrayList.get(i));
					} */
				
					// Lab2
					setChanged();
					notifyObservers(arrayList.get(i)); // datatype: AircraftSentence, because SimpleObservable<AircraftSentence>
					// => Alternatively: notifyObservers(arrayList.get(i).getAircraftSentence()), if T = JSONArray
				}
			}
		} catch(Exception e) {
			System.out.println("An error occurred in Senser.\n" +
	                   "Exception type: " + e.getClass().getSimpleName() + "\n" +
	                   "Error message: " + e.getMessage());
		}
	}
}