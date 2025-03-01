#include <string>
#include <ctime>
#include <iostream>

using namespace std;

// Aufzählungstyp für wählbare Objekte
// STEIN - 0, SCHERE - 1, PAPIER - 2
enum class Object
{
    ROCK,
    SCISSORS,
    PAPER
};

// Aufzählungstyp für mögliche Spielausgänge
enum class Result
{
    PLAYER_ONE_WINS,
    PLAYER_TWO_WINS,
    DRAW
};

// Struktur für einen Spieler bestehend aus Name und Wahl des Spielers
struct Player
{
    string name;
    Object choice;
};

// Name des Spielers eingeben
string insert_name()
{
    cout << "Name des Spielers: ";
    string str_name;
    getline(cin, str_name);
    return str_name;

}

Object determine_choice(string choice)
{
    if (choice.compare("CoderunnerTestValueROCK") == 0)
    {
        return Object::ROCK;
    }
    else if (choice.compare("CoderunnerTestValueSCISSORS") == 0)
    {
        return Object::SCISSORS;
    }
    else if (choice.compare("CoderunnerTestValuePAPER") == 0)
    {
        return Object::PAPER;
    }
    else
    {
        // Den Computer zufällig waehlen lassen.

        // HIER beantworten Sie folgende Fragen:
        
        // Wie funktioniert die funktion rand?
        // Funktion rand() generiert Zufallszahlen!
        
        // Was bewirkt die funktion srand?
        // srand() initialisiert Zufallszahlenbereich und gewährleistet mithilfe von unterschiedlichen Seeds die Zufälligkeit! 
        
        // Warum wird hier die Zeit (time) als Eingabe für die Funktion srand verwendet?
        // srand(time(nullptr)) liefert zufällige, keine identischen Zufallszahlenreihen.
        // time() gibt aktuelle Systemzeit zurück und die ist immer verschieden!
        
        // Warum wird hier modulo 3 verwendet?
        // Zufallszahl liegt zwischen 0 und n-1 -> in unserem Fall sind es die Zahlen 0,1,2!
        

        srand(static_cast<int>(time(nullptr)));
        int choice = rand() % 3;
        return static_cast<Object>(choice);
    }
}

// Die Wahl von Stein etc. als String zurückgeben lassen
string get_name(Object object)
{

    // HIER programmieren:
    // Abhängig vom vorliegenden Object einen entsprechenden String zurückgeben.
    // z.B: Wenn Object dem Wert Object::ROCK entspricht, dann String "Stein" zurückgeben
    string get;
    if (object == Object::ROCK) {
        get = "Stein";
        return get;                 //theoretisch return "STEIN"!!!
    }

    else if (object == Object::SCISSORS) {
        get = "Schere";
        return get;
    }

    else // (object == Object::PAPER) 
    {
        get = "Papier";
        return get;
    }
}

// Einen Text mit dem Namen des Spielers und seiner Wahl ausgeben
void print_choice(Player player)
{

    // HIER programmieren:
    // Auf der Konsole ausgeben, für welches Object sich der Spieler entschieden hat.
    // z.B.: "Computer hat das Object Schere gewählt"
    // TIP: Nutzen sie hierzu die Funktion get_name
    cout << player.name << " hat das Objekt " << get_name(player.choice) << " gewählt " << endl;

}

// Die Wahl des Spielers abfragen
Object chose()
{

    // HIER programmieren:
    // Die Wahl des Spielers von der Konsole einlesen und zurückgeben
    // Stellen sie sicher, dass es sich um eine gültige Wahl handelt!
    // TIP: Nutzen Sie dazu eine geeignete Schleife. Siehe auch Vorlesung Folie "Annehmende Schleifenanweisungen – Do"
    int number;

    do {
        cout << "Bitte Objektwahl eingeben (1 = Stein, 2 = Schere, 3 = Papier): ";
        cin >> number;

        if (number == 1) {
            return Object::ROCK;
        }

        else if (number == 2) {
            return Object::SCISSORS;
        }

        else {
            return Object::PAPER;
        }
        
    
    } while((number > 3) || (number < 1));

}

Result determine_result(Player player_1, Player player_2)
{

    // HIER programmieren:
    // Vergleichen Sie die gewählten Objekte, ermitteln sie das Spielergebnis und geben sie es zurück.
    // TIP: Wenn Sie für den Vergleich mit ganzene Zahlen _rechnen_ wollen, dann nutzen sie den static_cast, siehe auch Vorlesung Folie "Casts in C++: Static_cast"
    
    if (player_1.choice == player_2.choice) {
        return Result::DRAW;
    }
    else if ( ((player_1.choice == Object::ROCK) && (player_2.choice == Object::SCISSORS)) || 
        ((player_1.choice == Object::SCISSORS) && (player_2.choice == Object::PAPER)) ||
        ((player_1.choice == Object::PAPER) && (player_2.choice == Object::ROCK)) ) {
        return Result::PLAYER_ONE_WINS;
    }
    else /* (((player_2.choice == Object::ROCK) && (player_1.choice == Object::SCISSORS)) ||
        ((player_2.choice == Object::SCISSORS) && (player_1.choice == Object::PAPER)) ||
        ((player_2.choice == Object::PAPER) && (player_1.choice == Object::ROCK))) */ {
        return Result::PLAYER_TWO_WINS;
    }

}

void print_result(Player player_1, Player player_2)
{

    // HIER programmieren:
    // Ermitteln Sie zunächst das Spielergebnis. Nutzen sie dazu die Funktion determine_result.
    // Geben Sie anschließend auf der Konsole aus, wer gewonnen hat.
    // z.B: "Spieler Computer hat gewonnen" oder "Unentschieden"
    
    Result ergebnis = determine_result(player_1, player_2);
    
    if (ergebnis == Result::DRAW) {
        cout << "Unentschieden";
    }
    
    if (ergebnis == Result::PLAYER_ONE_WINS) {
        cout << "Spieler " << player_1.name << " hat gewonnen.";
    }
    
    if (ergebnis == Result::PLAYER_TWO_WINS) {
        cout << "Spieler " << player_2.name << " hat gewonnen.";
    }
    


}

int main(int argc, char* argv[])
{
    Player player_1, player_2;
    player_1.name = "Computer";
    player_2.name = insert_name();
    player_1.choice = determine_choice(player_2.name);
    cout << "Der Computer hat seine Wahl getroffen." << endl;
    player_2.choice = chose();
    print_choice(player_1);
    print_choice(player_2);
    print_result(player_1, player_2);

    return 0;
}