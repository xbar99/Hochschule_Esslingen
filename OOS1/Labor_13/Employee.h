#include <string>
using namespace std;

#ifndef EMPLOYEE_H
#define EMPLOYEE_H

class Employee
{
    string _first_name;
    string _last_name;

public:
    Employee(const string, const string);
    void print() const;
};
#endif