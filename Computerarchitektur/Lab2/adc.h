#ifndef ADC_H
#define ADC_H

void initADC(void);
/**
 * @brief Liest Temperatur am Sensor und gibt sie als int (°C) zurück.
 */
int readTemperature(void);
/**
 * @brief Aktualisiert die globale Variable "temperature" mit Messwert.
 */
void updateTemperature(void);

extern int temperature;

#endif