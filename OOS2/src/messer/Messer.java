package messer;

import observer.Observer;
import observer.SimpleObservable;
import observer.Observable;
import senser.AircraftSentence;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

// public class Messer implements Observer<AircraftSentence>, Runnable => Lab2
public class Messer extends SimpleObservable<BasicAircraft> implements Observer<AircraftSentence>, Runnable{ // Lab4
    private BlockingQueue<AircraftSentence> queue = new LinkedBlockingQueue<>();

    @Override
    public void update(Observable<AircraftSentence> observable, AircraftSentence newValue) {
    	// add new AircraftSentence to the queue
    	queue.add(newValue);
    }

    @Override
    public void run() {
        BasicAircraftFactory factory = new BasicAircraftFactory();
        BasicAircraftDisplay display = new BasicAircraftDisplay();

        try {
            while (true) {            	
                // retrieve the next AircraftSentence from the queue
            	AircraftSentence aircraftSentence = queue.take(); // take() blocks until an element is available
            	BasicAircraft basicAircraft = factory.generateBasicAircraft(aircraftSentence);
            	
            	// Lab2
            	// display.display(basicAircraft);
            	
                // Lab4
                setChanged();
                notifyObservers(basicAircraft);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); 
            System.out.println("Messer-Thread wurde unterbrochen: " + e.getMessage());
        }
    }
}
