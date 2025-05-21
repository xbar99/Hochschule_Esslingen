;
;   Labor 1 - Test program for LCD driver
;;
;   Computerarchitektur
;   (C) 2019-2022 J. Friedrich, W. Zimmermann, R. Keller
;   Hochschule Esslingen
;
;   Author:   	   J.Friedrich, W. Zimmermann
;   Last Modified: Sami Goekpinar & Baran Bickici SS25

; Export symbols
        XDEF Entry, main

; Import symbols
        XREF __SEG_END_SSTACK                        ; End of stack
        XREF initLCD, writeLine, delay_10ms          ; LCD functions


        XREF delay_0_5sec                            ;; defined in delay.asm
        XREF initLED, setLED, getLED, toggleLED      ;; LED Subroutines defined in led.asm

        XREF hexToASCII                              ;; defined in hexToASCII.asm
        XREF decToASCII                              ;; defined in decToASCII.asm

; Include derivative specific macros
        INCLUDE 'mc9s12dp256.inc'

;; ************************************************************************

; Defines

; RAM: Variable data section
.data:  SECTION

i: DS.W 1

dec_buffer: DS.B 17
hex_buffer: DS.B 17

; ROM: Constant data
.const: SECTION
MSG1:   dc.b " Mach mal eine",0
MSG2:   dc.b " kleine Pause", 0


msgA:   DC.B "ABCDEFGHIJKLMnopqrstuvwxyz1234567890", 0
msgB:   DC.B "is this OK?", 0 
msgC:   DC.B "Keep texts short!", 0 
msgD:   DC.B "Oh yeah!", 0


;; ************************************************************************

.init:  SECTION

main:
Entry:
        LDS  #__SEG_END_SSTACK          ; Initialize stack pointer
        CLI                             ; Enable interrupts, needed for debugger

        JSR  delay_10ms                 ; Delay 20ms during power up
        JSR  delay_10ms                 ; by Jump-Subroutine (use step-over)

        JSR  initLCD                    ; Initialize the LCD

        JSR initLED
        MOVB #$0F, DDRP
        MOVB #$0F, PTP
        
        
        
        ;MOVW #$7FF5, i
        MOVW #0, i
        
main_loop: JSR delay_0_5sec
       
        LDD i

        JSR setLED

        LDX #dec_buffer
        JSR decToASCII


        LDAB #0  ;; setup LCD writeline ;; row 0
        JSR writeLine

        LDD i
        LDX #hex_buffer
        JSR hexToASCII


        LDAB #1  ;; setup LCD writeline ;; row 1
        JSR writeLine

        LDD i

        ;; change to BRCLR for Board!

        BRCLR PTH, #$01, ButtonPH0      ; Branch to ButtonPH0 when the first button is pressed
        BRCLR PTH, #$02, ButtonPH1      ; Branch to ButtonPH1 when the second button is pressed
        BRCLR PTH, #$04, ButtonPH2      ; Branch to ButtonPH2 when the third button is pressed
        BRCLR PTH, #$08, ButtonPH3      ; Branch to ButtonPH3 when the fourth button is pressed
        BRCLR PTH, #$00, NonButton


ButtonPH0:              ; Increase 'i' by 16 when Button PH0 is pressed
        ADDD #16
        STD i
        BRA main_loop

ButtonPH1:              ; Increase 'i' by 10 when Button PH1 is pressed
        ADDD #10
        STD i
        BRA main_loop

ButtonPH2:              ; Decrease 'i' by 16 when Button PH2 is pressed
        SUBD #16
        STD i
        BRA main_loop

ButtonPH3:              ; Decrease 'i' by 10 when Button PH3 is pressed
        SUBD #10
        STD i
        BRA main_loop

NonButton:              ; Increment 'i' when no Button is pressed
        ADDD #1
        STD i
        BRA main_loop