/**
 * adc.c – Initialisierung und Nutzung des AD-Wandlers für Temperaturmessung
 * ------------------------------------------------------------------------
 * 
 * Public Interface Function: initADC
 * Zweck:
 *   Initialisiert den AD-Wandler für Einzelmessungen am Kanal 7 (PT7/AD7).
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte:
 *   Setzt die Register ATD0CTL2, ATD0CTL3 und ATD0CTL4 für den AD-Betrieb.
 * Fehlerprüfung: Keine.
 * ------------------------------------------------------------------------
 * 
 * Public Interface Function: readTemperature
 * Zweck:
 *   Startet eine AD-Wandlung am Kanal 7, wartet auf Abschluss und
 *   wandelt das Ergebnis in eine Temperatur in Grad Celsius um.
 * Parameter: -
 * Rückgabewert:
 *   int ... Temperaturwert (Celsius), Bereich: -30 bis +70 (laut Aufgabenstellung)
 * Seiteneffekte:
 *   Greift auf ATD0DR0 zu (liest ADC-Ergebnis).
 * Fehlerprüfung: Keine.
 * ------------------------------------------------------------------------
 * 
 * Public Interface Function: updateTemperature
 * Zweck:
 *   Ruft readTemperature() auf und speichert Ergebnis in der globalen Variable temperature.
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte:
 *   Setzt globale Variable 'temperature' auf aktuellen Messwert.
 * Fehlerprüfung: Keine.
 */





#include "adc.h"

#include <hidef.h>                              
#include <mc9s12dp256.h>                        

#pragma LINK_INFO DERIVATIVE "mc9s12dp256b"

int temperature = 0;


void initADC(void)
{
    ATD0CTL2 = 0xC0;        
    ATD0CTL3 = 0x08;        
    ATD0CTL4 = 0x05;
}

// -----------------------------

#define CONVERTING_CHANNEL      0x87
#define AC_DC_CONVERTING_BIT    0x80

int readTemperature(void)
{
    ATD0CTL5 = CONVERTING_CHANNEL;

    while (ATD0STAT0 & AC_DC_CONVERTING_BIT != 0);

    return (ATD0DR0 * 50) / 511 - 30; //y=m*x+b -> y= (maxTemp-minTemp)*ATD0DR0/ADC-Resolution + minTemp
                                      //ATD0DR0 = Aktueller ADC-Wert
                                      //Halbiert da wir unter 16 bit bleiben müssen
                                                  
}

void updateTemperature(void) {
    temperature = readTemperature();
}
