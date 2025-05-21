#ifndef CLOCK_H
#define CLOCK_H

void updateLEDs(void);
void initClockState(void);
void resetClockTick(void);
unsigned char isSetMode(void);
unsigned char clockEventTriggered(void);
void clearClockEvent(void);
void tickClock(void);
void updateBlinkState(void);

// Globale Variablen deklarieren
extern unsigned char clockEvent, stunden, minuten, sekunden, setMode;
extern unsigned char toggleCounter, toggleState;

#endif