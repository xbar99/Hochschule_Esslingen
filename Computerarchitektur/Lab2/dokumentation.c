/*


4. Data dictionary

4.1 Globale Variablen:
| Modul, deklariert in (in \[ ]: weitere Module, in denen verwendet) | Variablenname | C-Datentyp            | Zweck / Bedeutung                                |
| ------------------------------------------------------------------ | ------------- | --------------------- | ------------------------------------------------ |
| clock.c \[ticker.asm, main.c, ...]                                 | clockEvent    | unsigned char (0,1)   | Signalisiert jede vergangene Sekunde             |
| clock.c \[main.c, buttons.c, display.c]                            | stunden       | unsigned char (0..23) | Stunden (Zahl, 0 bis 23)                         |
| clock.c \[main.c, buttons.c, display.c]                            | minuten       | unsigned char (0..59) | Minuten (Zahl, 0 bis 59)                         |
| clock.c \[main.c, buttons.c, display.c]                            | sekunden      | unsigned char (0..59) | Sekunden (Zahl, 0 bis 59)                        |
| clock.c \[main.c, buttons.c, display.c]                            | setMode       | unsigned char (0,1)   | Setzt Modus (1=Set-Modus aktiv, 0=Normalbetrieb) |
| clock.c \[main.c, display.c]                                       | toggleCounter | unsigned char (0..9)  | Zähler für das Umschalten (Blinken) des Titels   |
| clock.c \[main.c, display.c]                                       | toggleState   | unsigned char (0,1)   | Zustand für Blinken/Umschalten des Titels        |
| adc.c \[main.c, display.c]                                         | temperature   | int (-30..+70)        | Gemessene Temperatur (°C)                        |
| ticker.asm \[clock.c, main.c]                                      | ticks         | unsigned char (0..99) | Software-Tickzähler, 10ms-Auflösung (0..99)      |

4.2 Hardware Ressourcen:
| Modul             | HCS12- bzw. Dragon12-Hardware-Ressource | Zweck / Bedeutung                                      |
| ----------------- | --------------------------------------- | ------------------------------------------------------ |
| Uhr \[Clock]      | CPU Port K, LCD Display                 | Anzeige: Zeile 1 = Text, Zeile 2 = Zeit & Temperatur   |
| LED \[Clock]      | Port B, Port J.1 (LEDs)                 | Verschiedene Statusanzeigen (z. B. Blinken, Set-Modus) |
| AD \[Thermometer] | ATD0 Kanal 7                            | Temperatursensor                                       |
| Uhr \[Clock]      | Port H.3…0 (Taster SW2…SW5)             | Uhrzeit stellen, Modus umschalten                      |
| Ticker \[Clock]   | Enhanced Capture Timer, Kanal 4         | 10 ms Ticker für Zeitbasis                             |


*/