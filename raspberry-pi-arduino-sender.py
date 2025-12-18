#!/usr/bin/env python3
"""
Raspberry Pi to Website Direct Sender
Reads soil moisture data from Arduino via serial and sends to your website backend
"""

import serial
import time
import requests
import json
from datetime import datetime

# ============================================
# CONFIGURATION - Update these values
# ============================================

# Your Website Backend URL
# For local testing (Pi and computer on same network)
BACKEND_URL = "http://192.168.1.100:3000/api/iot/sensor-data"  # Replace with your computer's IP
# For production (after deploying)
# BACKEND_URL = "https://your-backend-url.com/api/iot/sensor-data"

# Device identification
DEVICE_ID = "raspberry-pi-arduino-001"

# Serial port configuration
SERIAL_PORT = '/dev/ttyUSB0'  # Change to '/dev/ttyACM0' if needed
BAUD_RATE = 9600

# Send interval (seconds) - how often to send data
SEND_INTERVAL = 15

# ============================================
# SERIAL INITIALIZATION
# ============================================

try:
    # Open the serial port
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    print(f"✅ Connected to Arduino on port {SERIAL_PORT}")
    time.sleep(2)  # Wait for Arduino to initialize
except Exception as e:
    print(f"❌ Error connecting to serial port: {e}")
    print("💡 Tip: Check if Arduino is connected and port is correct")
    print("   Common ports: /dev/ttyUSB0, /dev/ttyACM0")
    exit()

# ============================================
# DATA SENDING FUNCTION
# ============================================

def send_to_website(soil_moisture, temperature=None, humidity=None):
    """
    Send sensor data to your website backend
    """
    try:
        # Prepare data payload
        data = {
            "soilMoisture": soil_moisture,
            "temperature": temperature if temperature is not None else 0,
            "humidity": humidity if humidity is not None else 0,
            "deviceId": DEVICE_ID,
            "timestamp": datetime.now().isoformat()
        }
        
        print(f"\n📡 Sending data to {BACKEND_URL}")
        print(f"   Soil Moisture: {soil_moisture}%")
        if temperature is not None:
            print(f"   Temperature: {temperature}°C")
        if humidity is not None:
            print(f"   Humidity: {humidity}%")
        
        # Send POST request to backend
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
    Main loop - reads data from Arduino and sends to website
    """
    print("=" * 60)
    print("🌱 Raspberry Pi to Website Direct Sender")
    print("=" * 60)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Device ID: {DEVICE_ID}")
    print(f"Serial Port: {SERIAL_PORT}")
    print(f"Send Interval: {SEND_INTERVAL} seconds")
    print("=" * 60)
    print("\nStarting data collection...")
    print("Press Ctrl+C to stop\n")
    
    success_count = 0
    error_count = 0
    last_send_time = 0
    
    try:
        # Clear the serial buffer
        ser.flushInput()
        
        while True:
            if ser.in_waiting > 0:
                try:
                    # Read a line of data from Arduino
                    line = ser.readline().decode('utf-8').strip()
                    
                    if line:
                        # Try to parse the data
                        try:
                            # If Arduino sends just a number (soil moisture)
                            soil_moisture_data = int(line)
                            
                            print(f"📊 Received from Arduino: {soil_moisture_data}%")
                            
                            # Check if enough time has passed since last send
                            current_time = time.time()
                            if current_time - last_send_time >= SEND_INTERVAL:
                                # Send data to website
                                if send_to_website(soil_moisture_data):
                                    success_count += 1
                                    last_send_time = current_time
                                else:
                                    error_count += 1
                                
                                print(f"\n📈 Stats: {success_count} successful, {error_count} failed")
                                print(f"⏳ Next send in {SEND_INTERVAL} seconds...\n")
                            
                        except ValueError:
                            # If Arduino sends formatted data (e.g., "Moisture:45")
                            if ":" in line:
                                parts = line.split(":")
                                if len(parts) == 2:
                                    try:
                                        soil_moisture_data = int(parts[1].strip())
                                        print(f"📊 Received from Arduino: {soil_moisture_data}%")
                                        
                                        current_time = time.time()
                                        if current_time - last_send_time >= SEND_INTERVAL:
                                            if send_to_website(soil_moisture_data):
                                                success_count += 1
                                                last_send_time = current_time
                                            else:
                                                error_count += 1
                                            
                                            print(f"\n📈 Stats: {success_count} successful, {error_count} failed")
                                            print(f"⏳ Next send in {SEND_INTERVAL} seconds...\n")
                                    except ValueError:
                                        print(f"⚠️  Invalid data format: {line}")
                            else:
                                print(f"⚠️  Invalid data received: {line}")
                
                except UnicodeDecodeError:
                    print("⚠️  Error decoding serial data")
                    continue
            
            # Small delay to prevent CPU overuse
            time.sleep(0.1)
            
    except KeyboardInterrupt:
        print("\n\n🛑 Stopping data collection...")
        print(f"Final Stats: {success_count} successful, {error_count} failed")
        print("Goodbye! 👋\n")
    
    finally:
        # Close the serial port gracefully
        ser.close()
        print("Serial connection closed.")

# ============================================
# RUN THE SCRIPT
# ============================================

if __name__ == "__main__":
    main()
