; ==========================================================================
; Public interface function: initTicker
; --------------------------------------------------------------------------
; Zweck:
;   Initialisiert den 10ms-SW-Ticker via ECT (Enhanced Capture/Timer) Channel 4.
;   Schaltet das Timer-Modul ein, setzt den Prescaler, aktiviert Output Compare
;   und den Interrupt für Kanal 4, und setzt den Ticker-Zähler zurück.
; Parameter: -
; Rückgabe:  -
; Register:  Keine Register dauerhaft verändert (nur lokale).
; ==========================================================================
;
; Public interface function: isrECT4
; --------------------------------------------------------------------------
; Zweck:
;   Interrupt-Service-Routine (ISR) für ECT Channel 4.
;   Wird alle 10ms ausgelöst. Erhöht einen Software-Zähler.
;   Setzt nach 100 Aufrufen (also nach 1s) das globale Flag clockEvent auf 1
;   und setzt den Software-Zähler zurück.
; Parameter:  -
; Rückgabe:   -
; Register:   Alle Register nach RTI wiederhergestellt.
; ==========================================================================

; ===== Exportierte Symbole =====
        XDEF initTicker
        XDEF isrECT4

; ===== Importierte Symbole =====
        XREF clockEvent

; ===== Includes =====
        INCLUDE 'mc9s12dp256.inc'

; ===== Konstanten =====
ONESEC      equ 100              ; 100 x 10ms = 1s
TENMS       equ 1875             ; 10ms bei 24 MHz / 128
TIMER_ON    equ $80              ; Aktiviert ECT (TSCR1)
TIMER_CH4   equ $10              ; Bit 4 = Channel 4
TCTL1_CH4   equ $03              ; Bits OM4 und OL4 (für Output Compare)

; ===== RAM-Bereich =====
.data:  SECTION

        ticks:    ds.b 1         ; 8-Bit Software-Zähler (10ms)

; ===== Interrupt-Vektor =====
.const: SECTION

.intVect: SECTION
        ORG $FFE6
        DC.W isrECT4             ; Vektor für Timer Channel 4 Interrupt

; ===== Initialisierung des Tickers =====
.init:  SECTION

initTicker:
        ldab #TIMER_ON           ; Timer-Modul einschalten
        stab TSCR1

        bset TIOS, #TIMER_CH4    ; Channel 4: Output Compare aktivieren
        bset TIE,  #TIMER_CH4    ; Interrupt für Channel 4 aktivieren

        movb #0, ticks           ; Software-Zähler zurücksetzen

        ; Prescaler setzen: 2^7 = 128 ? 24MHz / 128 = 187.5kHz
        ldab TSCR2
        andb #$F8                ; untere 3 Bits löschen
        orab #7                  ; Prescaler = 128 setzen
        stab TSCR2

        bclr TCTL1, #TCTL1_CH4   ; Ausgangssteuerung Kanal 4 zurücksetzen

        rts

; ===== Interrupt-Service-Routine: alle 10ms =====
isrECT4:
        ldd  TC4                 ; aktuellen Compare-Wert holen
        addd #TENMS             ; 10ms addieren
        std  TC4                ; nächsten Interrupt setzen

        ldab #TIMER_CH4         ; Interrupt-Flag löschen (mit 1)
        stab TFLG1

        inc  ticks              ; Software-Zähler hochzählen
        ldaa ticks
        cmpa #ONESEC
        bne  notYet             ; noch keine Sekunde vorbei

        clr  ticks              ; 1 Sekunde erreicht ? Zähler zurücksetzen
        ldaa #1
        staa clockEvent         ; Flag setzen für main.c

notYet:
        rti