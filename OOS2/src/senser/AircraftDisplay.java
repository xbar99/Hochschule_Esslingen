package senser;

public class AircraftDisplay {
	// Lab1
	public void display(AircraftSentence aircraftSentence) {
		String formattedSentence = aircraftSentence.getAircraftSentence().toString().replaceAll(",", ", ");
		System.out.println(formattedSentence + ",");
	}
	
	public void display(AircraftSentence aircraftSentence, boolean noCommaUsed) { // Method Overloading
		String formattedSentence = aircraftSentence.getAircraftSentence().toString().replaceAll(",", ", ");
		System.out.println(formattedSentence);
	}
}
