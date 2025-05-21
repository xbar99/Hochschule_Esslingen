  INCLUDE 'mc9s12dp256.inc'  

  XDEF  initLED, setLED, getLED, toggleLED 

  .data: SECTION  

  .const: SECTION  

  .init: SECTION  

    initLED:  
          BSET DDRJ, #2         ; Pin J2 als Ausgang setzen
          BCLR PTJ, #2          ; LED ausschalten
          MOVB #$FF, DDRB       ; Alle Pins von Port B als Ausgänge
          MOVB #$00, PORTB      ; Alle LEDs ausschalten
          RTS                    ; Rückkehr

    setLED:  
          STAB PORTB            ; LEDs nach Register B setzen
          RTS                    ; Rückkehr

    getLED:  
          LDAB PORTB            ; Status der LEDs in Register B laden
          RTS                    ; Rückkehr mit Status in B

    toggleLED:  
          EORB PORTB            ; LEDs umschalten
          STAB PORTB            ; Neuen Wert speichern
          RTS                    ; Rückkehr
