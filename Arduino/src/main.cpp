#include <Arduino.h>

int taserPin = 2;
int duration = 30; // Duration to keep the Taser on in milliseconds

void setup()
{
    pinMode(taserPin, OUTPUT);
    digitalWrite(taserPin, LOW); // Ensure Taser is initially off

    Serial.begin(9600); // Initialize serial communication
}

void loop()
{
    if (Serial.available() > 0)
    {
        char incomingByte = Serial.read(); // Read the next character from the serial buffer
        
		Serial.write("so");

        if (incomingByte == '1')
        {
			Serial.write("on");

            digitalWrite(taserPin, HIGH); // Turn on the Taser
            delay(duration); // Keep the Taser on for the specified duration
            digitalWrite(taserPin, LOW); // Turn off the Taser
        }
    }
	else{
		Serial.write("of");
	}
}
