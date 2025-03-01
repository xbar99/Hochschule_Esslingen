#include<iostream>
using namespace std;

class Date {

    int _day, _month, _year;

public:
    Date(int = 0, int = 0, int = 0);
    Date operator+(int days);
    friend ostream& operator<<(ostream&, const Date&);
};

Date::Date(int _day, int _month, int _year) {
    this->_day = _day;
    this->_month = _month;
    this->_year = _year;
}

Date Date::operator+(int days) {
    Date current = *this;
    current._day += days;

    for (current._day; current._day > 30; current._month++) {
        current._day -= 30;
    }

    while (current._month > 12) {
        current._month -= 12;
        current._year++;
    }

    return current;
}

ostream& operator<<(ostream& ostream, const Date& date) {
    ostream << date._day << "." << date._month << "." << date._year;
    return ostream;
}

int main(int argc, char* argv[])
{
    Date begin_task = Date(13, 04, 2023);
    cout << "Die Aufgabe beginnt am " << begin_task << endl;
    Date end_task = begin_task.operator+(7);
    cout << "Die Aufgabe endet am " << end_task << endl;
    Date one_year_and_one_month_later = begin_task + 390;
    cout << "Ein Jahr und ein Monat nach Aufgabenbeginn ist der " << one_year_and_one_month_later << endl;
    Date three_years_and_five_months_later = begin_task + 1230;
    cout << "Drei Jahre und 5 Monate nach Aufgabenbeginn ist der " << three_years_and_five_months_later << endl;
}