;   Labor 1 - Problem 2.4
;   Convert a zero-terminated ASCIIZ string to lower characters
;   Subroutines: toLower, strCpy
;
;   Computerarchitektur
;   (C) 2019-2022 J. Friedrich, W. Zimmermann, R. Keller
;   Hochschule Esslingen
;
;   Author:   R. Keller, HS-Esslingen
;            (based on code provided by J. Friedrich, W. Zimmermann)
;   Modified: Verbesserte Kommentare
;

; --- Exportierte Symbole ---
        XDEF toLower
        XDEF strCpy

; --- Sections ---
.data: SECTION   ; RAM-Datenbereich
.const: SECTION  ; Konstantenbereich (ROM)
.init: SECTION   ; Programmcode

; --- Subroutine: toLower ---
; Konvertiert String an Adresse D in Kleinbuchstaben
toLower:
        PSHX            
        PSHY            

        TFR D, X        ; Pointer aus D nach X übertragen

loop:
        LDAA 0, X       ; Lade aktuelles Zeichen
        BEQ done        ; Wenn NUL-Terminator, fertig

        CMPA #'A'       ; Vergleiche mit 'A'
        BLO skip        ; Wenn kleiner als 'A', überspringen
        CMPA #'Z'       
        BHI skip        ; Wenn größer als 'Z', überspringen

        ORAA #$20       ; Bit 5 setzen -> zu Kleinbuchstabe machen
        STAA 0, X       ; Zurückspeichern

skip:
        INX             
        BRA loop        

done:
        PULY           
        PULX          
        RTS             

; --- Subroutine: strCpy ---
; Kopiert einen NUL-terminierten String von Quelle (X) nach Ziel (Y)
strCpy:
        PSHA          
        PSHX            
        PSHY            

copy_loop:
        LDAA 0, X       ; Lade Byte von Quelle
        STAA 0, Y       ; Speichere Byte ins Ziel
        BEQ copy_done   ; Bei NUL-Terminator -> fertig
        INX             ; Quelle ++
        INY             ; Ziel ++
        BRA copy_loop   ; Weiter kopieren

copy_done:
        PULY            
        PULX            
        PULA            
        RTS            
