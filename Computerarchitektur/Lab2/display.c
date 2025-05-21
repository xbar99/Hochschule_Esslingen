/**
 * display.c - Anzeige- und LED-Logik für Uhr
 * -------------------------------------------------------------
 *
 * Public Interface Function: initLED
 * Zweck:
 *   Initialisiert die LED-Ausgänge (PORTB, PortJ).
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte:
 *   Setzt PORTB und Richtungen für LEDs auf Ausgang.
 * -------------------------------------------------------------
 *
 * Public Interface Function: numTo2ASCII
 * Zweck:
 *   Wandelt einen zweistelligen Wert (0-99) in ASCII-Zeichen um,
 *   nutzt dazu decToASCII_Wrapper (Assembler-Wrapper).
 * Parameter:
 *   char *buf ... Zielpuffer (mindestens 2 Byte, kein '\0' hinten)
 *   int val   ... Zahl zwischen 0 und 99
 * Rückgabewert: -
 * Seiteneffekte: buf wird gefüllt.
 * -------------------------------------------------------------
 *
 * Public Interface Function: displayTitle
 * Zweck:
 *   Gibt eine von zwei Titelzeilen (abwechselnd) auf LCD-Zeile 0 aus.
 *   Abhängig von toggleState.
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte: Zeile 0 auf LCD wird neu geschrieben.
 * -------------------------------------------------------------
 *
 * Public Interface Function: displayTimeTemp
 * Zweck:
 *   Gibt aktuelle Uhrzeit (im 12h- oder 24h-Format, siehe SELECT12HOURS)
 *   und Temperatur auf LCD-Zeile 1 aus.
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte: Zeile 1 auf LCD wird neu geschrieben.
 * -------------------------------------------------------------
 */

#include "display.h" 
#include "adc.h"
#include <mc9s12dp256.h>

// Umschaltung 12h/24h
// 0 = 24-Stunden-Modus, 1 = 12-Stunden-Modus
#define SELECT12HOURS 1

extern unsigned char stunden, minuten, sekunden;
extern int temperature;
extern unsigned char toggleState;

// Dummy-Wrapper, ggf. durch deine ASM-Funktionen ersetzen
void WriteLine_Wrapper(char *text, char line);
void decToASCII_Wrapper(char *txt, int val);

void initLED(void) {
    DDRJ_DDRJ1  = 1;
    PTIJ_PTIJ1  = 0;
    DDRB        = 0xFF;
    PORTB       = 0x00;
}

void numTo2ASCII(char *buf, int val) {
    char tmp[7];
    int absval = (val < 0) ? -val : val;

    if (absval > 99) absval = 99;

    decToASCII_Wrapper(tmp, absval);

    if (val < 0) {
        buf[0] = '-';
        buf[1] = tmp[5];
    } else {
        buf[0] = tmp[4];
        buf[1] = tmp[5];
    }
}

void displayTitle(void) {
    if (toggleState == 0)
        WriteLine_Wrapper("Baran.Sami.Noah", 0);
    else
        
        WriteLine_Wrapper("c IT WS2021/2022", 0);
}

    char line2[17];
    char zeit[12];
    char tempstr[6];
    
    
void displayTimeTemp(void) {
   
    int i, len;

    #if SELECT12HOURS==1
        unsigned char std = stunden;
        char suffix[3] = "am";
        if (std >= 12) suffix[0] = 'p';
        if (std == 0) std = 12;
        else if (std > 12) std -= 12;
        numTo2ASCII(&zeit[0], std);
        zeit[2] = ':';
        numTo2ASCII(&zeit[3], minuten);
        zeit[5] = ':';
        numTo2ASCII(&zeit[6], sekunden);
        zeit[8] = suffix[0];
        zeit[9] = suffix[1];
        zeit[10] = 0;
    #else
        numTo2ASCII(&zeit[0], stunden);
        zeit[2] = ':';
        numTo2ASCII(&zeit[3], minuten);
        zeit[5] = ':';
        numTo2ASCII(&zeit[6], sekunden);
        zeit[8] = 0;
    #endif

    if (temperature < 0) {
        tempstr[0] = '-';
        numTo2ASCII(&tempstr[1], -temperature);
        tempstr[3] = 'C';
        tempstr[4] = 0;
    } else {
        tempstr[0] = ' ';
        numTo2ASCII(&tempstr[1], temperature);
        tempstr[3] = 'C';
        tempstr[4] = 0;
    }

    for (i = 0; zeit[i] != 0; ++i) line2[i] = zeit[i];
    len = i;
    while (len < 11) line2[len++] = ' ';
    for (i = 0; tempstr[i] != 0; ++i) line2[len++] = tempstr[i];
    line2[len] = 0;

    WriteLine_Wrapper(line2, 1);
}