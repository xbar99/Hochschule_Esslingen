#ifndef ASCII_H
#define ASCII_H

/**
 * @brief Wandelt eine Ganzzahl in eine ASCII-Zeichenkette um.
 *        Wrapper für die Assemblerfunktion decToASCII.
 *
 * @param txt Zeiger auf den Ziel-Puffer (mindestens 6 Bytes!)
 * @param val Ganzzahlwert (int), der umgewandelt werden soll
 */
void decToASCII_Wrapper(char *txt, int val);

/**
 * @brief Schreibt einen Text auf das LCD in eine bestimmte Zeile.
 *        Wrapper für die Assemblerfunktion writeLine.
 *
 * @param text Zeiger auf die zu schreibende Zeichenkette
 * @param line LCD-Zeile (0 oder 1)
 */
void WriteLine_Wrapper(char *text, char line);

#endif