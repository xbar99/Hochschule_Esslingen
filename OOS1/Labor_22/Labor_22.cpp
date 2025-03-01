#include <string>
#include <iostream>
#include <iomanip>

using namespace std;

int main(int argc, char* argv[]) {
	double d = 1.234;
	cout << " Nr Oct  Hex String  Fixed     Scientific " << endl;
	for (int k = 1; k < 11; k++)
	{
		cout << right << setw(3) << setfill(' ') << dec << k;
		cout << setw(4) << setfill(' ') << showbase << oct << k;
		cout << setw(5) << setfill(' ') << hex << k << " ";
		cout << left << setw(7) << setfill('+') << string(k % 5 + 1, '*')  << " ";
		cout << internal << setw(9) << setfill(' ') << showpos << setprecision(3) << fixed << d << noshowpos;
		cout << right << setw(11) << uppercase << scientific << d << nouppercase;
		d = d*-2;
		
		cout << endl;
	}
	return 0;
}

/*
Nr Oct  Hex String  Fixed     Scientific
 1  01  0x1 **+++++ +   1.234  1.234E+00
 2  02  0x2 ***++++ -   2.468 -2.468E+00
 3  03  0x3 ****+++ +   4.936  4.936E+00
 4  04  0x4 *****++ -   9.872 -9.872E+00
 5  05  0x5 *++++++ +  19.744  1.974E+01
 6  06  0x6 **+++++ -  39.488 -3.949E+01
 7  07  0x7 ***++++ +  78.976  7.898E+01
 8 010  0x8 ****+++ - 157.952 -1.580E+02
 9 011  0x9 *****++ + 315.904  3.159E+02
10 012  0xa *++++++ - 631.808 -6.318E+02
 */