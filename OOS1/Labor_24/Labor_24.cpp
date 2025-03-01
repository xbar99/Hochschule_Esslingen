#include <iostream>
#include <list>
#include <string>
#include <map>
#include <exception>

using namespace std;

// Hier Exception implementieren
class OutOfStockException : public exception {
    public:
        OutOfStockException(string msg) : message{ msg } {}
        
        virtual const char* what() const noexcept override {
            return message.c_str();
        }

        string message;
};

// Hier Interface implementieren
class ISubscriber {
    public:
        virtual void update(string) = 0;
}; 


// Hier Klassen Customer und GoldCustomer implementieren
class Customer : public ISubscriber {
    private:
        static int _id_generator;
        int id;
    public:
        Customer() : id{ ++_id_generator } {}
        void update(string mainState) override {
            cout << "Customer " << id << ": neue Nachricht verfügbar --> " << mainState << endl;
        }
};



class GoldCustomer : public ISubscriber {
    private:
        static int _id_generator;
        int id;
    public:
        GoldCustomer() : id{ ++_id_generator } {}
        void update(string mainState) override {
            cout << "GoldCustomer " << id << ": neue Nachricht verfügbar --> " << mainState << endl;
        }
};



class Store
{
public:
    // Hier Methoden implementieren
    void subscribe(ISubscriber* subscriber) {
        _subscribers.push_back(subscriber);
    }

    void unsubscribe(ISubscriber* subscriber) {
        for (auto it = _subscribers.begin(); it != _subscribers.end(); it++) {
            if (*it == subscriber) {
                it = _subscribers.erase(it);
            }
        }
    }

    void notify_subscribers(string mainState) {
        for (ISubscriber* subscriber : _subscribers) {
            subscriber->update(mainState);
        }
    }

    void deliver_products(string product, unsigned int number) {
        unsigned int available = _product_availability[product];
        unsigned int delivered = number;
        unsigned int stock = delivered + available;

        cout << "Vorrätige Artikel vom Typ " << product << ": " << available << endl;
        cout << "Ausgelieferte Artikel vom Typ " << product << ": " << delivered << endl;
        cout << "Neuer Bestand: " << stock << endl;

        if (available == 0 && delivered > 0) {
            notify_subscribers("Neue Artikel vom Typ " + product + " verfügbar.");
        }

        _product_availability[product] = stock;

        if (stock == 0) {
            notify_subscribers("Artikel vom Typ " + product + " nicht mehr verfügbar.");
        }
    }

    void sell_products(string product, unsigned int number) {
        unsigned int available = _product_availability[product];

        if (number > available) {
            throw OutOfStockException("Es sind " + to_string(available) + " Artikel vom Typ " + product + " verfügbar. Es können nicht " + to_string(number) + " Artikel verkauft werden.");
        }

        unsigned int stock = available - number;

        cout << "Vorrätige Artikel vom Typ " << product << ": " << available << endl;
        cout << "Verkaufte Artikel vom Typ " << product << ": " << number << endl;
        cout << "Neuer Bestand: " << stock << endl;

        _product_availability[product] = stock;

        if (stock == 0) {
            notify_subscribers("Artikel vom Typ " + product + " nicht mehr verfügbar");
        }
    }


private:
    list<ISubscriber *> _subscribers;
    map<string, unsigned int> _product_availability{{"iPhone", 0}, {"Galaxy", 5}};
};


int Customer::_id_generator = 100;
int GoldCustomer::_id_generator = 0;

void manage_store()
{
    try
    {
        Store *store = new Store;
        ISubscriber *customer_1 = new Customer();
        store->subscribe(customer_1);
        ISubscriber *customer_2 = new GoldCustomer();
        store->subscribe(customer_2);
        ISubscriber *customer_3 = new GoldCustomer();
        store->subscribe(customer_3);
        store->deliver_products("iPhone", 5);
        store->unsubscribe(customer_3);
        store->sell_products("iPhone", 3);
        ISubscriber *customer_4 = new Customer();
        store->subscribe(customer_4);
        store->deliver_products("iPhone", 5);
        store->sell_products("iPhone", 7);
        store->unsubscribe(customer_1);
        ISubscriber *customer_5 = new GoldCustomer();
        store->subscribe(customer_5);
        store->deliver_products("iPhone", 15);
        store->sell_products("Galaxy", 8);
    }
    catch (exception &e)
    {
        cout << e.what() << endl;
    }
    catch (...)
    {
        cout << "Ein unbekannter Fehler ist aufgetreten." << endl;
    }
}

int main(int argc, char *argv[])
{
    manage_store();
    return 0;
}