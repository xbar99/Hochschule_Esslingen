
; Beschreibung: Converts Decimal value to ASCII
;   - Eingabe:
;       D: Value 
;       X: Zeiger auf RAM-Adresse, wohin der String geschrieben wird
;   - Ausgabe: -
; -------------------------------------------------- 
     XDEF decToASCII


hexToASCII:

; Konstanten
POS_SIGN    equ ' '   
NEG_SIGN    equ '-'    
ASCII_ZERO  equ '0'    

.data: SECTION
saved_val:  DS.W  1    ; Speicherplatz für kopierten Wert

.const: SECTION

.init: SECTION

; Hauptfunktion: decToASCII
decToASCII:

    ; --- Arbeitsregister sichern ---                  
    PSHX                 
    PSHY                  
    PSHD                  

    ; --- Eingabewert speichern ---
    STD saved_val          ; Wert aus D in temporären Speicher kopieren

    ; --- Vorzeichen ermitteln ---
    TFR D, Y               ; Wert aus D nach Y kopieren zum Vergleich
    CPY #0                
    BPL is_positive        ; Wenn positiv oder null, zu is_positive
    BRA is_negative        ; Sonst (negativ), zu is_negative

is_positive:
    LDAA #POS_SIGN        
    STAA 1, X+             
    BRA prepare_digits    

is_negative:
    LDAA #NEG_SIGN         
    STAA 1, X+            
    
    ; Zwei-Komplement berechnen (Vorzeichenumkehr)
    LDD saved_val
    COMA                  
    COMB                  
    ADDD #1               
    STD saved_val

prepare_digits:
    ; --- Ziffern extrahieren und in ASCII umwandeln ---
    
    LDD saved_val          
    TFR X, Y               ; Zeiger sichern (in Y)
    
    ; Tausenderbereich extrahieren (Zehntausenderstelle)
    LDX #10000
    IDIV                   ; Division: D / 10000 ? Quotient in X
    STD saved_val          ; Rest wieder speichern
    TFR X, A               ; Quotient in A
    ADDA #ASCII_ZERO       ; In ASCII-Zeichen umwandeln
    STAA 1, Y+             ; Zeichen speichern und Zeiger erhöhen

    ; Tausenderstelle extrahieren
    LDD saved_val
    LDX #1000              ; Division: D / 1000 ? Quotient in X
    IDIV
    STD saved_val
    TFR X, A
    ADDA #ASCII_ZERO
    STAA 1, Y+

    ; Hunderterstelle extrahieren
    LDD saved_val
    LDX #100               ; Division: D / 100 ? Quotient in X
    IDIV
    STD saved_val
    TFR X, A
    ADDA #ASCII_ZERO
    STAA 1, Y+

    ; Zehnerstelle extrahieren
    LDD saved_val
    LDX #10               ; Division: D / 10 ? Quotient in X
    IDIV
    STD saved_val
    TFR X, A
    ADDA #ASCII_ZERO
    STAA 1, Y+

    ; Einerstelle extrahieren
    LDD saved_val
    ANDB #$0F              ; Nur die unteren 4 Bit von B (Einerstelle)
    ADDB #ASCII_ZERO      
    STAB 1, Y+             

    ; Null-Terminierung
    CLRA                   
    STAA 0, Y              ; Abschließendes Nullbyte schreiben

    ; --- Register zurücksichern ---
    PULD
    PULY
    PULX
 
    RTS                    
