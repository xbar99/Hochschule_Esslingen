/**
 * buttons.c - Tasten-Logik für Set-Modus und Mode-Wechsel
 * -------------------------------------------------------------
 *
 * Public Interface Function: initButtons
 * Zweck:
 *   Initialisiert die Tasten-Statusvariablen für Flankenerkennung.
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte:
 *   Setzt interne (static) Variablen für vorherige Tastenzustände.
 * -------------------------------------------------------------
 *
 * Public Interface Function: checkAndToggleMode
 * Zweck:
 *   Prüft Taste SW2 auf steigende Flanke (LOW->HIGH) und wechselt
 *   den Set-Modus. Schaltet LEDs entsprechend um.
 * Parameter: -
 * Rückgabewert:
 *   unsigned char toggled ... 1 falls Modus gewechselt wurde, sonst 0
 * Seiteneffekte:
 *   Ändert setMode (extern), LED0/LED7 werden je nach Modus gesetzt/gelöscht.
 * -------------------------------------------------------------
 *
 * Public Interface Function: checkSetButtons
 * Zweck:
 *   Prüft SW3/SW4/SW5 im Set-Modus, inkrementiert Stunden, Minuten,
 *   Sekunden bei Tastendruck, aktualisiert Anzeige sofort.
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte:
 *   Erhöht Zeitvariablen (extern), ruft displayTimeTemp() auf.
 * -------------------------------------------------------------
 */

#include <mc9s12dp256.h>
#include "buttons.h"
#include "clock.h"
#include "display.h"

#define SW2_PRESSED (!(PTH & 0x01))
#define SW3_PRESSED (!(PTH & 0x02))
#define SW4_PRESSED (!(PTH & 0x04))
#define SW5_PRESSED (!(PTH & 0x08))

static unsigned char prevSW2 = 0;
static unsigned char prevSW3 = 0;
static unsigned char prevSW4 = 0;
static unsigned char prevSW5 = 0;

void initButtons(void) {
    prevSW2 = SW2_PRESSED;
    prevSW3 = SW3_PRESSED;
    prevSW4 = SW4_PRESSED;
    prevSW5 = SW5_PRESSED;
}

unsigned char checkAndToggleMode(void) {
    unsigned char toggled = 0;
    extern unsigned char setMode;

    if (SW2_PRESSED && !prevSW2) {
        setMode = !setMode;
        toggled = 1;

        if (setMode) {
            PORTB |= 0x80;   // LED7 an
            PORTB &= ~0x01;  // LED0 aus
        } else {
            PORTB &= ~0x80;  // LED7 aus
        }
    }
    prevSW2 = SW2_PRESSED;
    return toggled;
}

void checkSetButtons(void) {
    extern unsigned char stunden, minuten, sekunden;
    if (SW3_PRESSED && !prevSW3) {
        stunden = (stunden + 1) % 24;
        displayTimeTemp();
    }
    if (SW4_PRESSED && !prevSW4) {
        minuten = (minuten + 1) % 60;
        displayTimeTemp();
    }
    if (SW5_PRESSED && !prevSW5) {
        sekunden = (sekunden + 1) % 60;
        displayTimeTemp();
    }
    prevSW3 = SW3_PRESSED;
    prevSW4 = SW4_PRESSED;
    prevSW5 = SW5_PRESSED;
}