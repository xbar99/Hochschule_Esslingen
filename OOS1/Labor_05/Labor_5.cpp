#include<iostream>
using namespace std;

class Point {
private:
    double _x;
    double _y;
public:
    void set_x(double x){
        _x = x;
    }
    void set_y(double y){
        _y = y;
    }
    double get_x() {
        return _x;
    }
    double get_y() {
        return _y;
    }
    void print() {
        cout << "print-Methode:" << endl;
        cout << "X = " << _x << endl;
        cout << "Y = " << _y << endl;
    }
};

int main(int argc, char* argv[]) {
    Point p;
    p.set_x(1);
    p.set_y(10);
    p.print();
    p.set_x(5);
    cout << "X ohne print(): " << p.get_x() << endl;
    cout << "Y ohne print(): " << p.get_y() << endl;
    return 0;
}