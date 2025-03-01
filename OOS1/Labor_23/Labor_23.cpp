#include <iostream>
#include <vector>
using namespace std;

class IComponent {
    public:
        virtual int get_price() = 0;
        virtual void add(IComponent* component) {}
};

class Product : public IComponent {
    private:
        int price;
    public:
        Product(int _prize) : price{ _prize } {}
        int get_price() override {
            return price;
        }   
};

class Box : public IComponent {
    public:
        vector<IComponent*> components;
        int prices = 0;

        int get_price() override {
            for (size_t i = 0; i < components.size(); i++) {
                prices = prices + components[i]->get_price();
            }
            return prices;
        }
        virtual void add(IComponent* component) {
            components.push_back(component);
        }
};

void calculate_price(IComponent *component)
{
    cout << "Preis: " << component->get_price() << endl;
}

int main(int argc, char* argv[]) {

    cout << "Preisermittlung für ein einfaches Produkt: " << endl;
    IComponent *product = new Product(10);
    calculate_price(product);
    cout << endl << endl;

    cout << "Preisermittlung für eine verschachtelte Box: " << endl;
    IComponent *outer_box = new Box;
    IComponent *inner_box_1 = new Box;
    IComponent *product_1 = new Product(10);
    IComponent *product_2 = new Product(5);
    IComponent *product_3 = new Product(4);
    inner_box_1->add(product_1);
    inner_box_1->add(product_2);
    IComponent *inner_box_2 = new Box;
    inner_box_2->add(product_3);
    outer_box->add(inner_box_1);
    outer_box->add(inner_box_2);
    IComponent *product_4 = new Product(7);
    inner_box_2->add(product_4);
    calculate_price(outer_box);
    cout << endl << endl;

    return 0;
}