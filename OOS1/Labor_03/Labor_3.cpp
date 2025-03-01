#include <iostream>
#define IOS 1

void print_rectangle(int quadrat = 0, int rechteck = 0) {
	#if (IOS == 1)   // #if IOS // #ifdef IOS 
      if (rechteck == 0) { rechteck = quadrat; }
    #endif

	for (int i = 0; i < rechteck; i++) {
		for (int k = 0; k < quadrat; k++) {
			std::cout << "X ";
		}
		std::cout << "\n";
	}
	std::cout << "\n";

}


int main(int argc, char* argv[])
{
	std::cout << "x = 2, y = 5: " << std::endl;
	print_rectangle(2, 5);

	std::cout << "x = 3, y = 3: " << std::endl;
	print_rectangle(3, 3);

	std::cout << "x = 4: " << std::endl;
	print_rectangle(4);

	return 0;
};