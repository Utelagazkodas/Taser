#include <Arduino.h>



int taserPin = 2;

void setup()
{
	pinMode(taserPin, OUTPUT);

	Serial.begin(9600);

	digitalWrite(taserPin, 0);
}


void loop()
{
	
}

