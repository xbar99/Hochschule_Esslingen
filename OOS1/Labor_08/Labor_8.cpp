#include <iostream>
using namespace std;

// Klasse Point und Circle implementieren
class Point {
    private:
		double _x;
		double _y;
    public:
		Point(double x_Koordinate, double y_Koordinate) : _x{x_Koordinate}, _y{y_Koordinate} {}
		Point() : Point(0, 0) {}

		void set_x(double _x) { this->_x = _x; }
		void set_y(double _y) { this->_y = _y; }

		double get_x() { return _x; }
		double get_y() { return _y; }

		void move(double dx, double dy) {
			_x += dx;
			_y += dy;
		}

		void print(bool b1 = true) {
			cout << "(" << _x << ", " << _y << ")";
			if (b1) 
				cout << "\n";	
		}
};

class Circle {
    private:
		Point _centre;
		double _radius;
    public:
		Circle(Point _centre = Point(), double _radius = 1) {
			this->_centre = _centre;
			this->_radius = _radius;
		}

		void set_centre(Point _centre) { this->_centre = _centre; }
		void set_radius(double _radius) { this->_radius = _radius; }

		void move(double dx, double dy) {
			_centre.move(dx, dy);
		}

		void print() {
			cout << "["; _centre.print(false);
			cout << ", " << _radius << "]" << endl;

		}


};

// Hauptprogramm
int main(int argc, char* argv[]) {
	Point p;
	Circle c(p);
	cout << "Ausgabe 1:" << endl;
	p.print();
	c.print();
	p.set_x(1.1);
	p.set_y(2.2);
	c.set_centre(p);
	c.set_radius(3.3);
	cout << "Ausgabe 2:" << endl;
	p.print(false);
	cout << " == (" << p.get_x() << ", " << p.get_y() << ")"
		<< endl;
	c.print();
	p.move(1.0, 1.0);
	c.move(2.0, 2.0);
	cout << "Ausgabe 3:" << endl;
	p.print();
	c.print();
	return 0;
}