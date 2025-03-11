package acamo;

import java.util.stream.IntStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.CompletableFuture;

import javafx.scene.text.Font;
import javafx.stage.Stage;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.control.TableView;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.VBox;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;

import de.saring.leafletmap.ScaleControlConfig;
import de.saring.leafletmap.ZoomControlConfig;
import de.saring.leafletmap.LatLong;
import de.saring.leafletmap.LeafletMapView;
import de.saring.leafletmap.Marker;
import de.saring.leafletmap.MapConfig;
import de.saring.leafletmap.MapLayer;

import jsonstream.PlaneDataServer;
import observer.Observable;
import observer.Observer;
import senser.Senser;
import messer.Messer;
import messer.BasicAircraft;

public class acamo extends Application implements Observer<BasicAircraft> {

    private static final double latitude = 48.7433425;
    private static final double longitude = 9.3201122;
    private boolean haveConnection = true;
    private ActiveAircrafts activeAircrafts;
    private static int dist = 50;

    @SuppressWarnings("unused")
	private int selectedRowIndex = -1;
    private ArrayList<Label> valueLabels = new ArrayList<>();
    private TableView<BasicAircraft> table = new TableView<>();
    private ObservableList<BasicAircraft> aircraftList = FXCollections.observableArrayList();
    private Marker homeMarker;
    private TextField inputLat;
    private TextField inputLong;
    private PlaneDataServer server;
    private LeafletMapView map = new LeafletMapView();
    private HashMap<String, Marker> aircraftHashMap = new HashMap<>();
    private CompletableFuture<javafx.concurrent.Worker.State> loadingState;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        setupServerConnection();
        setupObservers();
        createAndDisplayUI(primaryStage);
    }

    private void setupServerConnection() {
        String url = "https://opensky-network.org/api/states/all";

        server = haveConnection
                ? new PlaneDataServer(url, latitude, longitude, dist)
                : new PlaneDataServer(latitude, longitude, dist);

        new Thread(server).start();
    }

    private void setupObservers() {
        Senser senser = new Senser(server);
        Messer messer = new Messer();
        activeAircrafts = new ActiveAircrafts();

        // Verkette die Observer
        senser.addObserver(messer);
        messer.addObserver(activeAircrafts);
        messer.addObserver(this);

        new Thread(senser).start();
        new Thread(messer).start();
    }

    private void createAndDisplayUI(Stage primaryStage) {
        // Map and Controls
        Label mapTitle = createLabel("Map", 24, new Insets(0, 0, 15, 0));
        initializeMap();

        inputLat = new TextField(String.valueOf(latitude));
        inputLong = new TextField(String.valueOf(longitude));

        VBox mapControls = new VBox(10, 
            createLabel("Latitude:", 14, new Insets(0, 0, 5, 0)), inputLat,
            createLabel("Longitude:", 14, new Insets(0, 0, 5, 0)), inputLong,
            createSubmitButton()
        );

        // Aircraft Table
        Label tableTitle = createLabel("Active Aircrafts", 24, new Insets(0, 0, 15, 0));
        configureTable();
        VBox leftPane = new VBox(15, tableTitle, table);

        // Aircraft Details
        GridPane detailsGrid = createDetailsGrid();
        Label detailsTitle = createLabel("Details for Selected Aircraft", 24, new Insets(0, 0, 15, 0));
        VBox rightPane = new VBox(15, detailsTitle, detailsGrid);

        // Layout
        HBox root = new HBox(30, new VBox(10, mapTitle, map, mapControls), leftPane, rightPane);
        root.setPadding(new Insets(20));

        Scene scene = new Scene(root, 1400, 700);
        primaryStage.setTitle("Acamo");
        primaryStage.setScene(scene);
        primaryStage.setOnCloseRequest(e -> System.exit(0));
        primaryStage.show();
    }

    private void initializeMap() {
        loadingState = map.displayMap(new MapConfig(
            new ArrayList<>(java.util.List.of(MapLayer.OPENSTREETMAP)), 
            new ZoomControlConfig(), new ScaleControlConfig(), 
            new LatLong(latitude, longitude)
        ));

        loadingState.whenComplete((state, throwable) -> {
            if (throwable != null) {
                System.err.println("Error loading map: " + throwable.getMessage());
                return;
            }

            if (state == javafx.concurrent.Worker.State.SUCCEEDED) {
                map.onMapClick(coord -> {
                    inputLat.setText(String.valueOf(coord.getLatitude()));
                    inputLong.setText(String.valueOf(coord.getLongitude()));
                    switchLocation(coord.getLatitude(), coord.getLongitude(), dist);
                });

                homeMarker = new Marker(new LatLong(latitude, longitude), "Home", "Home", 1);
                map.addCustomMarker("Home", "icons/basestationlarge.png");
                map.addMarker(homeMarker);

                for (int i = 0; i <= 24; i++) {
                    String n = String.format("%02d", i);
                    map.addCustomMarker("plane" + n, "icons/plane" + n + ".png");
                }
            }
        });
    }

    private Label createLabel(String text, int fontSize, Insets padding) {
        Label label = new Label(text);
        label.setFont(new Font(fontSize));
        label.setPadding(padding);
        return label;
    }

    private Button createSubmitButton() {
        Button submitButton = new Button("Submit");
        submitButton.setOnAction(e -> {
            double newLat = Double.parseDouble(inputLat.getText());
            double newLong = Double.parseDouble(inputLong.getText());
            switchLocation(newLat, newLong, dist);
        });
        return submitButton;
    }

    private void configureTable() {
        ArrayList<String> attributes = BasicAircraft.getAttributesNames();

        for (String attribute : attributes) {
            TableColumn<BasicAircraft, String> column = new TableColumn<>(attribute);
            column.setCellValueFactory(new PropertyValueFactory<>(attribute));
            table.getColumns().add(column);
        }

        table.setItems(aircraftList);
        table.setEditable(false);
        table.setOnMouseClicked(this::onTableRowSelected);
    }

    private GridPane createDetailsGrid() {
        GridPane detailsGrid = new GridPane();
        detailsGrid.setHgap(15);
        detailsGrid.setVgap(10);
        detailsGrid.setPadding(new Insets(10));

        String[] labels = {"ICAO:", "Operator:", "Position Time:", "Coordinates:", "Speed:", "Track:"};
        IntStream.range(0, labels.length).forEach(i -> {
            Label label = new Label(labels[i]);
            Label value = new Label();

            valueLabels.add(value);
            detailsGrid.add(label, 0, i);
            detailsGrid.add(value, 1, i);
        });

        return detailsGrid;
    }

    private void onTableRowSelected(MouseEvent event) {
        selectedRowIndex = table.getSelectionModel().getSelectedIndex();
        BasicAircraft selectedAircraft = table.getSelectionModel().getSelectedItem();

        if (selectedAircraft != null) {
            ArrayList<Object> values = BasicAircraft.getAttributesValues(selectedAircraft);
            for (int i = 0; i < values.size(); i++) {
                valueLabels.get(i).setText(values.get(i).toString());
            }
        }
    }
    
    public void switchLocation(double lat, double lng, int dist) {
        map.panTo(new LatLong(lat, lng));
        homeMarker.move(new LatLong(lat, lng));
        activeAircrafts.clear();
        aircraftList.clear();

        for (Marker mark : aircraftHashMap.values()) {
            map.removeMarker(mark);
        }
        aircraftHashMap.clear();

        server.resetLocation(lat, lng, dist);
    }

    @Override
    public void update(Observable<BasicAircraft> observable, BasicAircraft newValue) {
        Platform.runLater(() -> {
            aircraftList.setAll(activeAircrafts.values());
            updateMapMarkers();
        });
    }

    private void updateMapMarkers() {
        for (BasicAircraft aircraft : activeAircrafts.values()) {
            LatLong coord = new LatLong(
                aircraft.getCoordinate().getLatitude(), 
                aircraft.getCoordinate().getLongitude()
            );
            String icao = aircraft.getIcao();
            String icon = "plane" + String.format("%02d", (int) aircraft.getTrak() / 15);

            if (aircraftHashMap.containsKey(icao)) {
                Marker marker = aircraftHashMap.get(icao);
                marker.move(coord);
                marker.changeIcon(icon);
            } else {
                loadingState.whenComplete((state, throwable) -> {
                    Marker marker = new Marker(coord, icao, icon, 0);
                    map.addMarker(marker);
                    aircraftHashMap.put(icao, marker);
                });
            }
        }
    }
}
