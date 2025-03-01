module;
#include <iostream>
using namespace std;
export module employee;

export class Employee
{
    string _first_name;
    string _last_name;

public:
    Employee(const string f_n, const string l_n)
    {
        _first_name = f_n;
        _last_name = l_n;
    }
    void print() const
    {
        cout << _last_name << ", " << _first_name << endl;
    }
};

/*Diese Datei beginnt mit module; der Einführung eines speziellen Bereichs des Moduls, das als globales Modulfragment bezeichnet wird. 
  Es ist dem Code für das benannte Modul vorangestellt, und Sie können Präprozessordirektiven wie #includeverwenden. 
  Code im globalen Modulfragment ist nicht im Besitz oder exportiert von der Modulschnittstelle.*/