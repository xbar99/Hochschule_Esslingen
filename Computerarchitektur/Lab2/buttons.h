#ifndef BUTTONS_H
#define BUTTONS_H

void initButtons(void);
/**
 * @brief Prüft Mode-Taste und toggelt den Modus.
 * @return 1 wenn Mode gewechselt wurde, sonst 0.
 */
unsigned char checkAndToggleMode(void);
/**
 * @brief Prüft Set-Tasten (Stunde/Minute/Sekunde erhöhen).
 */
void checkSetButtons(void);

#endif