#include <string>
#include <iostream>
using namespace std;

// Klasse Student
class Student {
    private:
        string _name;
        string _first_name;
    public:
        Student(string, string);
        string get_name();
        string get_first_name();
        ~Student();
        void print();
        void print(bool);
};

Student::Student(string name, string first_name) {
    _name = name;
    _first_name = first_name;
    cout << "Parametrisierter Konstruktor Student: " << _first_name << " " << _name << endl;
}

string Student::get_name() {
    return _name;
}

string Student::get_first_name() {
    return _first_name;
}

Student::~Student() {
    cout << "Destruktor Student: " << _first_name << " " << _name << endl;
}

void Student::print() {
    cout << "print() ohne Parameter; Student: " << _first_name << " " << _name;
    cout << "\n";
}

void Student::print(bool b1) {
    cout << "print() mit Parameter; Student: " << _first_name << " " << _name;
    if (b1) 
        cout << "\n";
    
}

// Klasse Employee
class Employee {
    private:
        string _name;
        string _first_name;
    public:
        Employee(string name, string first_name) : _name{ name }, _first_name{ first_name } {
            cout << "Parametrisierter Konstruktor Employee: " << _first_name << " " << _name << endl;
        }

        Employee() : Employee("Mustermann", "Erika") {
            cout << "Standardkonstruktor Employee: " << _first_name << " " << _name << endl;
        }

        Employee(Student& s1) : _name{ s1.get_name() }, _first_name{ s1.get_first_name() } {
            cout << "Konvertierungskonstruktor Employee: " << _first_name << " " << _name << endl;
        }

        ~Employee() {
            cout << "Destruktor Employee: " << _first_name << " " << _name << endl;
        }

        void print() {
            cout << "print() ohne Parameter; Mitarbeiter: " << _first_name << " " << _name;
            cout << "\n";
        }

        void print(bool b1) {
            cout << "print() mit Parameter; Mitarbeiter: " << _first_name << " " << _name;
            if (b1) 
                cout << "\n";
            
        }
};


int main(int argc, char* argv[])
{
    Student stud_mustermann = Student("Mustermann", "Max");
    Employee empl_mustermann = Employee(stud_mustermann);
    Employee mit_default = Employee();
    stud_mustermann.print();
    stud_mustermann.print(true);
    empl_mustermann.print();
    mit_default.print();
    Student* p_stud_mustermann = nullptr;
    cout << "Block wird betreten" << endl;
    {
        p_stud_mustermann = new Student("Mustermann", "Markus");
        p_stud_mustermann->print(true);
    }
    cout << "Block wurde verlassen" << endl;
    delete p_stud_mustermann;
    return 0;
}