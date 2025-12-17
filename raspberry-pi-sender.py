#!/usr/bin/env python3
"""
Raspberry Pi Sensor Data Sender
Sends sensor data directly to your website backend
"""

import requests
import time
import json
from datetime import datetime

# ============================================
# CONFIGURATION - Update these values
# ============================================

# Your website backend URL
BACKEND_URL = "http://localhost:3000/api/iot/sensor-data"  # For local testing
# BACKEND_URL = "https://your-backend-url.com/api/iot/sensor-data"  # For production

# Device identification
DEVICE_ID = "raspberry-pi-001"

# Sensor reading interval (seconds)
SEND_INTERVAL = 15

# ============================================
# SENSOR READING FUNCTIONS
# ============================================

def read_soil_moisture():
    """
    Read soil moisture from sensor
    Replace this with your actual sensor reading code
    """
    try:
        # Example: Reading from analog sensor via ADC
        # import Adafruit_ADS1x15
        # adc = Adafruit_ADS1x15.ADS1115()
        # value = adc.read_adc(0, gain=1)
        # moisture = (value / 32767.0) * 100
        
        # For testing, return a dummy value
        import random
        moisture = random.uniform(20, 80)
        return round(moisture, 2)
    except Exception as e:
        print(f"Error reading soil moisture: {e}")
        return None

def read_temperature():
    """
    Read temperature from sensor
    Replace this with your actual sensor reading code
    """
    try:
        # Example: Reading from DHT22 sensor
        # import Adafruit_DHT
        # humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 4)
        
        # For testing, return a dummy value
        import random
        temperature = random.uniform(20, 35)
        return round(temperature, 2)
    except Exception as e:
        print(f"Error reading temperature: {e}")
        return None

def read_humidity():
    """
    Read humidity from sensor
    Replace this with your actual sensor reading code
    """
    try:
        # Example: Reading from DHT22 sensor
        # import Adafruit_DHT
        # humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 4)
        
        # For testing, return a dummy value
        import random
        humidity = random.uniform(40, 80)
        return round(humidity, 2)
    except Exception as e:
        print(f"Error reading humidity: {e}")
        return None

# ============================================
# DATA SENDING FUNCTION
# ============================================

def send_sensor_data(soil_moisture, temperature, humidity):
    """
    Send sensor data to backend
    """
    try:
        data = {
            "soilMoisture": soil_moisture,
            "temperature": temperature,
            "humidity": humidity,
            "deviceId": DEVICE_ID,
            "timestamp": datetime.now().isoformat()
        }
        
        print(f"\n📡 Sending data to {BACKEND_URL}")
        print(f"   Soil Moisture: {soil_moisture}%")
        print(f"   Temperature: {temperature}°C")
        print(f"   Humidity: {humidity}%")
        
        response = requests.post(
            BACKEND_URL,
            json=data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Success: {result.get('message', 'Data sent')}")
            return True
        else:
            print(f"❌ Error: Server returned status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Cannot reach backend server")
        print("   Make sure your backend is running and URL is correct")
        return False
    except requests.exceptions.Timeout:
        print("❌ Timeout Error: Server took too long to respond")
        return False
    except Exception as e:
        print(f"❌ Error sending data: {e}")
        return False

# ============================================
# MAIN LOOP
# ============================================

def main():
    """
    Main loop - reads sensors and sends data
    """
    print("=" * 50)
    print("🌱 Raspberry Pi Sensor Data Sender")
    print("=" * 50)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Device ID: {DEVICE_ID}")
    print(f"Send Interval: {SEND_INTERVAL} seconds")
    print("=" * 50)
    print("\nStarting sensor monitoring...")
    print("Press Ctrl+C to stop\n")
    
    success_count = 0
    error_count = 0
    
    try:
        while True:
            # Read sensors
            soil_moisture = read_soil_moisture()
            temperature = read_temperature()
            humidity = read_humidity()
            
            # Send data if readings are valid
            if soil_moisture is not None:
                if send_sensor_data(soil_moisture, temperature, humidity):
                    success_count += 1
                else:
                    error_count += 1
                
                print(f"\n📊 Stats: {success_count} successful, {error_count} failed")
            else:
                print("⚠️  Skipping send - invalid sensor readings")
            
            # Wait before next reading
            print(f"⏳ Waiting {SEND_INTERVAL} seconds...\n")
            time.sleep(SEND_INTERVAL)
            
    except KeyboardInterrupt:
        print("\n\n🛑 Stopping sensor monitoring...")
        print(f"Final Stats: {success_count} successful, {error_count} failed")
        print("Goodbye! 👋\n")

# ============================================
# RUN THE SCRIPT
# ============================================

if __name__ == "__main__":
    main()
