module;
#include <iostream>
using namespace std;
export module manager;
import employee;

export class Manager : public Employee
{
    double _salary;

public:
    Manager(const string f_n, const string l_n, double s = 0)
        : Employee(f_n, l_n)
    {
        _salary = s;
    }
    double get_income() const
    {
        return _salary;
    }
    void print() const
    {
        cout << "Manager: ";
        Employee::print();
    }
};

/*Diese Datei beginnt mit module; der Einführung eines speziellen Bereichs des Moduls, das als globales Modulfragment bezeichnet wird. 
  Es ist dem Code für das benannte Modul vorangestellt, und Sie können Präprozessordirektiven wie #includeverwenden. 
  Code im globalen Modulfragment ist nicht im Besitz oder exportiert von der Modulschnittstelle.*/