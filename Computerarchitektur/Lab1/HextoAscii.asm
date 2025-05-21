; =====================================================
;   Datei: hexToASCII.asm
;   Funktion: Umwandlung eines 16-bit Werts (D) in einen
;             ASCII-String ("0xXXXX\0") im Speicher.
; =====================================================

; --- Exportierte Symbole ---
        XDEF hexToASCII

; --- RAM-Speicher für Zwischenwert ---
.data: SECTION
val:    DS.W 1             ; 1 Word (16-bit) Speicherplatz für Wert D

; --- Konstante Tabelle ---
.const: SECTION
H2A:    DC.B "0123456789ABCDEF"  ; Lookup-Tabelle: Nibble -> ASCII

; --- Programmstartbereich ---
.init: SECTION

; ---------------------------------------------------------
; Subroutine: hexToASCII
; Beschreibung:
;   - Eingabe:
;       D: 16-bit Wert, der konvertiert werden soll
;       X: Zeiger auf RAM-Adresse, wohin der String geschrieben wird
;   - Ausgabe:
;       RAM[X]: enthält danach String "0xABCD\0"
; ---------------------------------------------------------
hexToASCII:
    
      ; --- Register sichern ---
      PSHX              
      PSHY             
      PSHA               
      PSHB               
      
      ; --- Wert D in val speichern ---
      STD val            ; Speichere D zwischen

      ; --- "0x" an den Anfang des Strings schreiben ---
      LDAA  #$30         ; ASCII '0' laden
      STAA 1, X+         ; Schreibe '0' und Zeiger X erhöhen
      LDAA  #$78         ; ASCII 'x' laden
      STAA 1, X+         ; Schreibe 'x' und Zeiger X erhöhen
      
      ; --- Erste Hex-Ziffer (Bits 12..15) ---
      LDY   #H2A         ; Y = Adresse der H2A-Tabelle
      LDD   val          ; Lade val
      LSRD               ; 12x nach rechts schieben -> Bits 12..15 nach unten holen in Accumulator B
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      ANDB  #$0F         ; Nur untere 4 Bits behalten (Maskierung)
      ABY                ; Index in Tabelle #H2A anpassen/erhöhen
      LDAB  0, Y         ; Lade Zeichen aus Tabelle
      STAB 1, X+         ; Schreibe es in den String

      ; --- Zweite Hex-Ziffer (Bits 8..11) ---
      LDY   #H2A         
      LDD   val          
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD
      LSRD              
      ANDB  #$0F        
      ABY
      LDAB  0, Y         
      STAB 1, X+         
      ; --- Dritte Hex-Ziffer (Bits 4..7) ---
      LDY   #H2A
      LDD   val
      LSRD
      LSRD
      LSRD
      LSRD             
      ANDB  #$0F
      ABY
      LDAB  0, Y
      STAB 1, X+       

      ; --- Vierte Hex-Ziffer (Bits 0..3) ---
      LDY   #H2A
      LDD   val
      ANDB  #$0F        
      ABY
      LDAB  0, Y
      STAB 1, X+       

      ; --- Null-Terminator am Ende ---
      CLRB              
      STAB 0, X        

      ; --- Register zurückholen ---
      PULB
      PULA
      PULY
      PULX             
      
      ; --- Subroutine fertig ---
      RTS
