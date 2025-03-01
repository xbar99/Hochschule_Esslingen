#include <iostream>
using namespace std;

/* HIER */
#include "Worker.h"

Worker::Worker(const string f_n, const string l_n,
    double h_e, double h)
    : Employee(f_n, l_n)
{
    /* HIER */
    _hourly_earnings = h_e;
    _hours = h;
}
double Worker::get_income() const
{
    /* HIER */
    return _hourly_earnings * _hours;
}

void Worker::print() const
{
    cout << "Worker: ";
    Employee::print();
}