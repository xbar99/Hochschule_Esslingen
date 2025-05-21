/**
 * clock.c - Modul für Uhren- und Modus-Logik (inkl. Blinken/LED)
 *
 * -------------------------------------------------------------
 * Globale Variablen (für Hauptprogramm und andere Module):
 *   clockEvent       ... (unsigned char) 1, wenn eine Sekunde vergangen ist
 *   stunden          ... (unsigned char) aktuelle Stunde (0..23)
 *   minuten          ... (unsigned char) aktuelle Minute (0..59)
 *   sekunden         ... (unsigned char) aktuelle Sekunde (0..59)
 *   setMode          ... (unsigned char) 1 = Set-Mode, 0 = Normal-Mode
 *   toggleCounter    ... (unsigned char) Hilfszähler für Blinken
 *   toggleState      ... (unsigned char) Status für Titelleiste (0/1)
 * -------------------------------------------------------------
 *
 * Public Interface Function: initClockState
 * Zweck:
 *   Initialisiert alle Uhr-bezogenen Zustandsvariablen und LEDs.
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte:
 *   clockEvent, ticks, setMode, toggleCounter, toggleState werden gesetzt.
 *   LED7 (PORTB.7) und LED0 (PORTB.0) werden ausgeschaltet.
 * -------------------------------------------------------------
 *
 * Public Interface Function: resetClockTick
 * Zweck:
 *   Setzt clockEvent und ticks zurück (z.B. bei Moduswechsel).
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte: clockEvent, ticks werden 0.
 * -------------------------------------------------------------
 *
 * Public Interface Function: isSetMode
 * Zweck:
 *   Gibt zurück, ob sich die Uhr im Set-Mode befindet.
 * Parameter: -
 * Rückgabewert:
 *   (unsigned char) 1 = Set-Mode aktiv, 0 = Normal-Mode
 * Seiteneffekte: Keine.
 * -------------------------------------------------------------
 *
 * Public Interface Function: clockEventTriggered
 * Zweck:
 *   Prüft, ob clockEvent-Flag gesetzt wurde (z.B. von Timer).
 * Parameter: -
 * Rückgabewert: (unsigned char) 1 = clockEvent liegt an, 0 = nicht.
 * -------------------------------------------------------------
 *
 * Public Interface Function: clearClockEvent
 * Zweck:
 *   Löscht das clockEvent-Flag (setzt auf 0).
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte: clockEvent wird 0.
 * -------------------------------------------------------------
 *
 * Public Interface Function: tickClock
 * Zweck:
 *   Zählt die Uhrzeit um eine Sekunde vorwärts (inkl. Überlauf Logik).
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte: stunden/minuten/sekunden werden ggf. verändert.
 * -------------------------------------------------------------
 *
 * Public Interface Function: updateBlinkState
 * Zweck:
 *   Aktualisiert die Variable toggleState für den Titelleistenwechsel.
 *   (z.B. alle 10 Sekunden wird gewechselt).
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte: toggleCounter, toggleState werden geändert.
 * -------------------------------------------------------------
 *
 * Public Interface Function: updateLEDs
 * Zweck:
 *   Schaltet und blinkt die LEDs gemäß aktuellem Modus:
 *   - Im Normalmode blinkt LED0 (PORTB.0), LED7 ist aus.
 *   - Im Setmode leuchtet LED7 (PORTB.7) dauerhaft, LED0 aus.
 * Parameter: -
 * Rückgabewert: -
 * Seiteneffekte: Manipuliert PORTB-Bits für LEDs.
 * -------------------------------------------------------------
 */

#include "clock.h"
#include <mc9s12dp256.h>

unsigned char clockEvent = 0;
unsigned char stunden = 11;
unsigned char minuten = 59;
unsigned char sekunden = 29;
unsigned char setMode = 0;
unsigned char toggleCounter = 0;
unsigned char toggleState = 0;

extern unsigned char ticks;

void initClockState(void) {
    clockEvent = 0;
    ticks = 0;
    setMode = 0;
    toggleCounter = 0;
    toggleState = 0;
    PORTB &= ~(0x80);  // LED7 aus
    PORTB &= ~(0x01);  // LED0 aus
}

void resetClockTick(void) {
    clockEvent = 0;
    ticks = 0;
}

unsigned char isSetMode(void) {
    return setMode;
}

unsigned char clockEventTriggered(void) {
    return clockEvent;
}

void clearClockEvent(void) {
    clockEvent = 0;
}

void tickClock(void) {
    sekunden++;
    if (sekunden >= 60) {
        sekunden = 0;
        minuten++;
    }
    if (minuten >= 60) {
        minuten = 0;
        stunden = (stunden + 1) % 24;
    }
}

void updateBlinkState(void) {
    toggleCounter++;
    if (toggleCounter >= 10) {
        toggleCounter = 0;
        toggleState = !toggleState;
    }
}

void updateLEDs(void) {
    if (!setMode) {
        PORTB ^= 0x01;    // LED0 toggeln (blinken)
        PORTB &= ~(0x80); // LED7 aus
    } else {
        PORTB |= 0x80;    // LED7 an
        PORTB &= ~(0x01); // LED0 aus
    }
}
