/**
 * ascii.c - Wrapper für die Assemblerfunktionen decToASCII und writeLine
 *
 * -------------------------------------------------------------
 * Public Interface Function: decToASCII_Wrapper
 * Zweck:
 *   Wandelt eine Ganzzahl in einen ASCII-String um, indem die
 *   Assemblerfunktion decToASCII aufgerufen wird.
 * Parameter:
 *   txt  ... (char*) Zeiger auf ein Zeichenarray, in dem das Ergebnis gespeichert wird
 *   val  ... (int)   Zu konvertierende Ganzzahl (z.B. 0..9999)
 * Rückgabewert:
 *   -
 * Registerbelegung:
 *   LDX = txt (Zeiger auf Zielpuffer)
 *   LDD = val (Wert zur Umwandlung)
 * Rückgabe:
 *   Das Zeichenarray an Adresse txt enthält nach Aufruf den ASCII-String.
 * -------------------------------------------------------------
 *
 * Public Interface Function: WriteLine_Wrapper
 * Zweck:
 *   Gibt eine Zeichenkette auf einer bestimmten Zeile des LCD aus,
 *   indem die Assemblerfunktion writeLine aufgerufen wird.
 * Parameter:
 *   text ... (char*) Zeiger auf nullterminierte Zeichenkette
 *   line ... (char)  Zeilennummer (0 = erste Zeile, 1 = zweite Zeile)
 * Rückgabewert:
 *   -
 * Registerbelegung:
 *   LDX = text (Zeiger auf Zeichenkette)
 *   B   = line (Zeilennummer)
 * Rückgabe:
 *   -
 * Seiteneffekte:
 *   Gibt Text auf LCD aus.
 * Fehlerprüfung:
 *   Keine.
 * Veränderte Register:
 *   Durch writeLine laut Doku (sonst keine).
 * -------------------------------------------------------------
 */

#include "ascii.h"

extern void decToASCII(void);
extern void writeLine(void);

/**
 * Siehe Interface-Beschreibung oben.
 */
void decToASCII_Wrapper(char *txt, int val) {
    asm {
        LDX txt
        LDD val
        JSR decToASCII
    }
}

/**
 * Siehe Interface-Beschreibung oben.
 */
void WriteLine_Wrapper(char *text, char line) {
    asm {
        LDX  text
        LDAB line
        JSR  writeLine
    }
}