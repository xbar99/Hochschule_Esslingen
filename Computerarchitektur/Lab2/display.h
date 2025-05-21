#ifndef DISPLAY_H
#define DISPLAY_H

void initLED(void);
/**
 * @brief Schreibt Titelzeile je nach toggleState.
 */
void displayTitle(void);
/**
 * @brief Zeigt Uhrzeit und Temperatur an (12h/24h Mode).
 */
void displayTimeTemp(void);
/**
 * @brief Konvertiert int nach ASCII (Zweierstellen).
 */
void numTo2ASCII(char *buf, int val);

#endif