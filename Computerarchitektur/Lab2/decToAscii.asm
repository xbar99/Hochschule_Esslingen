; ==========================================================================
; Public interface function: decToASCII
; --------------------------------------------------------------------------
; Zweck:
;   Wandelt einen 16-Bit Vorzeichenwert (im Register D) in eine ASCII-Zeichenkette
;   mit Vorzeichen.
; Parameter:
;   X ... Zeiger (Pointer) auf den Beginn des Ziel-ASCII-Strings (char[7])
;   D ... zu konvertierender 16-Bit Wert (bereich: -32768 ... +32767)
; Rückgabe:
;   Der konvertierte Wert wird als nullterminierte ASCII-Zeichenkette an der durch X
;   angegebenen Adresse abgelegt (Format: [Vorzeichen][Ziffer][Ziffer][Ziffer][Ziffer][Ziffer][\0])
; Register:
;   Verändert: A, B, D, X, Y (werden alle am Ende wiederhergestellt!)
; ==========================================================================


; ===== Include für Symboldefinitionen =====
        INCLUDE 'mc9s12dp256.inc'

; ===== Exportierte Funktion =====
        XDEF decToASCII

; ===== Konstanten =====
POS_SIGN    equ ' '    ; positives Vorzeichen = Leerzeichen
NEG_SIGN    equ '-'    ; negatives Vorzeichen = Minus
ASCII_ZERO  equ '0'

; ===== RAM-Bereich =====
.data: SECTION
saved_val:  ds.w 1     ; 16-bit Wert zwischenspeichern

; ===== Code-Bereich =====
.init: SECTION

decToASCII:
        ; Register sichern
        pshx
        pshy
        pshd

        ; Wert in saved_val speichern
        std saved_val

        ; Vorzeichenbehandlung
        tfr D, Y
        cpy #0
        bpl is_positive
        bra is_negative

is_positive:
        ldaa #POS_SIGN
        staa 1, X+
        bra prepare_digits

is_negative:
        ldaa #NEG_SIGN
        staa 1, X+

        ldd saved_val
        coma
        comb
        addd #1
        std saved_val

prepare_digits:
        ldd saved_val
        tfr X, Y

        ldx #10000
        idiv
        std saved_val
        tfr X, A
        adda #ASCII_ZERO
        staa 1, Y+

        ldd saved_val
        ldx #1000
        idiv
        std saved_val
        tfr X, A
        adda #ASCII_ZERO
        staa 1, Y+

        ldd saved_val
        ldx #100
        idiv
        std saved_val
        tfr X, A
        adda #ASCII_ZERO
        staa 1, Y+

        ldd saved_val
        ldx #10
        idiv
        std saved_val
        tfr X, A
        adda #ASCII_ZERO
        staa 1, Y+

        ldd saved_val
        andb #$0F
        addb #ASCII_ZERO
        stab 1, Y+

        clra
        staa 0, Y        ; Null-Terminierung

        ; Register wiederherstellen
        puld
        puly
        pulx
        rts