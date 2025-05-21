/******************************************************************************
* Datei: main.c
*
* Zweck:
*   Hauptprogramm: Initialisiert Hardware, globale Variablen und Aufruf der
*   modularisierten Funktionen. Realisiert Hauptschleife der Uhr mit Umschaltung
*   von Set-/Normalmodus, Zeitanzeige, Temperaturmessung und LED-Steuerung.
*
* Wichtige Funktionen und ihr Zweck:
*   - main: Zentrale Programmschleife, ruft Initialisierungen und periodisch die
*     modularisierten Subroutinen (Buttons, Anzeige, Uhrzeit, LEDs etc.) auf.
*
* Parameter:    -
* Rückgabe:     -
* Register:     Keine (Standard C-Startup)..
* Author:       Baran Bickici, Sami Gökpinar, Noah Mesfun
* Hinweise:
*   - Die Initialisierungsfunktionen befinden sich in adc.c, display.c, buttons.c, clock.c.
*   - Die Timer-/LCD-/ASCII-Funktionen werden per Assembler bereitgestellt.
******************************************************************************/

#include <hidef.h>
#include <mc9s12dp256.h>

#pragma LINK_INFO DERIVATIVE "mc9s12dp256b"

#include "adc.h"
#include "buttons.h"
#include "display.h"
#include "clock.h"


extern void initTicker(void);
extern void initLCD(void);

extern unsigned char ticks;

void main(void) {
    EnableInterrupts;

    initLED();
    initLCD();
    initTicker();
    initADC();
    initButtons();
    initClockState();

    displayTitle();
    displayTimeTemp();

    for(;;) {
        if (checkAndToggleMode()) {
            resetClockTick();
            updateLEDs();        // <-- Nach Moduswechsel sofort LEDs richtig setzen!
        }

        if (isSetMode()) {
            checkSetButtons();
        }

        if (clockEventTriggered()) {
            clearClockEvent();

            if (!isSetMode()) {
                tickClock();
                updateTemperature();
            }
            updateLEDs();        // <-- Bei jedem Tick die LEDs setzen/blinken
            updateBlinkState();
            displayTitle();
            displayTimeTemp();
        }
    }
}