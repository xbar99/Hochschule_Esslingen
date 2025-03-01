#include <iostream>
#include <vector>
#include <array>
using namespace std;

class Meal {
public:
    Meal(string _mealname) : name{ _mealname } {}

    void add_topping(string ingredients) {
        ingre.push_back(ingredients);
    }

    virtual void prepare() = 0;

protected:
    string name;
    vector<string> ingre; 
};

class Pizza : public Meal {
public:
    Pizza(string _mealname) : Meal(_mealname) {}

    void prepare() override {
        cout << "Pizza " << name << ".";
        cout << " Pizzaboden, belegt mit:" << endl;

        for(string ingredients : ingre) {
            cout << "- " << ingredients << endl;
        }
    }
};

class Burger : public Meal {
public:
    Burger(string _mealname) : Meal(_mealname) {}

    void prepare() override {
        cout << name << ".";
        cout << " Brötchen mit:" << endl;

        for(string ingredients: ingre) {
            cout << "- " << ingredients << endl;
        }
    }
};

int main(int argc, char* argv[])
{
    Pizza *mista = new Pizza("Mista");
    mista->add_topping("Salami");
    mista->add_topping("Pilzen");
    Meal *hawaii = new Pizza("Hawaii");
    hawaii->add_topping("Schinken");
    hawaii->add_topping("Ananas");
    Burger *hamburger = new Burger("Hamburger");
    hamburger->add_topping("Hackfleisch");
    Meal *cheesburger = new Burger("Cheesburger");
    cheesburger->add_topping("Hackfleisch");
    cheesburger->add_topping("Käse");
    array<Meal *, 4> menu = {mista, hawaii, hamburger, cheesburger};
    for (Meal *g : menu)
    {
        g->prepare(); //*[1]
    }
    return 0;
}

