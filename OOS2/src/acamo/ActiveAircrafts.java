package acamo;

import java.util.ArrayList;
import java.util.HashMap;

import messer.BasicAircraft;

import observer.Observable;
import observer.Observer;

public class ActiveAircrafts implements ActiveAircraftsInterface, Observer<BasicAircraft> {
	private HashMap<String, BasicAircraft> activeAircrafts;
	
	public ActiveAircrafts() {
		this.activeAircrafts = new HashMap<>();
	}
	
	public synchronized void store(String icao, BasicAircraft ac) {
		 if (icao == null || ac == null) {
		        System.err.println("Warning: Cannot store null values. ICAO: " + icao + ", Aircraft: " + ac);
		        return;
		    }
		activeAircrafts.put(icao, ac); // put() kümmert sich automatisch um das Einfügen und Überschreiben
    }
	
	public synchronized void clear() {
        activeAircrafts.clear();
    }
	
	public synchronized BasicAircraft retrieve(String icao) {
		return activeAircrafts.get(icao); // braucht keine spezielle Prüfung auf null, weil ...
	  // ... die Methode gibt null zurück, wenn der Schlüssel nicht in der HashMap enthalten ist
	}
	
	public synchronized ArrayList<BasicAircraft> values() {
        return new ArrayList<>(activeAircrafts.values()); // wird verwendet, um alle Werte der HashMap als "Collection" zu erhalten
    }
	
	public void update(Observable<BasicAircraft> observable, BasicAircraft newValue) {
	    if (newValue == null) {
	        System.err.println("Warning: Received null BasicAircraft update.");
	        return;
	    }
	    this.store(newValue.getIcao(), newValue);
	}
	
	public String toString() {
        return activeAircrafts.toString();
    }
}
