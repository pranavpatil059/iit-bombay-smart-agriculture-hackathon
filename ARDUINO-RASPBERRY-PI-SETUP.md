# 🔌 Arduino + Raspberry Pi to Website Setup

## 📋 Overview

This guide shows you how to send soil moisture data from Arduino through Raspberry Pi directly to your website.

## 🎯 Data Flow

```
Arduino Sensor → Serial → Raspberry Pi → Python Script → Your Website Backend → Live Graph
```

## 🚀 Quick Setup

### Step 1: Arduino Setup

Your Arduino should be sending soil moisture data via Serial. Example Arduino code:

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  int soilMoisture = analogRead(A0);
  int moisturePercent = map(soilMoisture, 0, 1023, 0, 100);
  
  // Send just the number
  Serial.println(moisturePercent);
  
  delay(1000); // Read every second
}
```

### Step 2: Connect Arduino to Raspberry Pi

1. Connect Arduino to Raspberry Pi via USB cable
2. Check which port Arduino is connected to:

```bash
ls /dev/tty*
```

Common ports:
- `/dev/ttyUSB0`
- `/dev/ttyACM0`

### Step 3: Install Python Dependencies on Raspberry Pi

```bash
# Update system
sudo apt-get update

# Install Python and pip
sudo apt-get install python3-pip

# Install required packages
pip3 install pyserial requests
```

### Step 4: Copy Python Script to Raspberry Pi

```bash
# From your computer, copy the file
scp raspberry-pi-arduino-sender.py pi@raspberrypi.local:~/

# Or manually copy the file to your Pi
```

### Step 5: Configure the Script

Edit the script on your Raspberry Pi:

```bash
nano ~/raspberry-pi-arduino-sender.py
```

Update these lines:

```python
# Your computer's IP address (find it with 'ipconfig' on Windows or 'ifconfig' on Mac/Linux)
BACKEND_URL = "http://192.168.1.100:3000/api/iot/sensor-data"

# Your Arduino's serial port
SERIAL_PORT = '/dev/ttyUSB0'  # or '/dev/ttyACM0'

# Give your device a unique name
DEVICE_ID = "raspberry-pi-arduino-farm-001"
```

### Step 6: Find Your Computer's IP Address

**On Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

**On Mac/Linux:**
```bash
ifconfig
```
Look for "inet" address

### Step 7: Make Sure Backend is Running

On your computer:
```bash
cd backend
npm start
```

Backend should be running on `http://localhost:3000`

### Step 8: Run the Python Script

On Raspberry Pi:

```bash
# Make it executable
chmod +x raspberry-pi-arduino-sender.py

# Run it
python3 raspberry-pi-arduino-sender.py
```

You should see:
```
============================================================
🌱 Raspberry Pi to Website Direct Sender
============================================================
Backend URL: http://192.168.1.100:3000/api/iot/sensor-data
Device ID: raspberry-pi-arduino-farm-001
Serial Port: /dev/ttyUSB0
Send Interval: 15 seconds
============================================================

✅ Connected to Arduino on port /dev/ttyUSB0

📊 Received from Arduino: 45%

📡 Sending data to http://192.168.1.100:3000/api/iot/sensor-data
   Soil Moisture: 45%
✅ Success: Data received successfully

📈 Stats: 1 successful, 0 failed
```

### Step 9: View Data on Website

Open your browser:
```
http://localhost:5173/iot-monitoring
```

You should see:
- Current moisture value updating
- Graph showing real-time data
- Device ID displayed

## 🔧 Troubleshooting

### "Error connecting to serial port"

**Check port name:**
```bash
ls /dev/tty*
```

**Check permissions:**
```bash
sudo chmod 666 /dev/ttyUSB0
# or
sudo usermod -a -G dialout $USER
# Then logout and login again
```

### "Connection Error: Cannot reach backend"

1. **Check if backend is running:**
   ```bash
   curl http://localhost:3000/api/iot/health
   ```

2. **Check firewall:**
   - Windows: Allow port 3000 in Windows Firewall
   - Make sure Pi and computer are on same network

3. **Verify IP address:**
   - Make sure you're using the correct IP in BACKEND_URL
   - Try pinging from Pi: `ping 192.168.1.100`

### "Invalid data received"

**Check Arduino output:**
```bash
# On Raspberry Pi, monitor serial output
python3 -m serial.tools.miniterm /dev/ttyUSB0 9600
```

Make sure Arduino is sending just numbers (e.g., "45") or formatted data (e.g., "Moisture:45")

### Data not showing on website

1. **Check backend logs** - Look for "📡 Received sensor data"
2. **Verify data is being sent:**
   ```bash
   curl http://localhost:3000/api/iot/sensor-data/latest
   ```
3. **Refresh website** - Press Ctrl+F5

## 🔄 Run on Startup (Optional)

To make it run automatically when Pi boots:

```bash
# Edit crontab
crontab -e

# Add this line
@reboot sleep 30 && python3 /home/pi/raspberry-pi-arduino-sender.py >> /home/pi/sensor.log 2>&1
```

## 📊 Arduino Code Examples

### Simple Soil Moisture Sensor

```cpp
const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(sensorPin);
  int moisturePercent = map(sensorValue, 0, 1023, 0, 100);
  
  Serial.println(moisturePercent);
  
  delay(1000);
}
```

### With DHT22 Temperature & Humidity

```cpp
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

const int soilPin = A0;

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  int soilValue = analogRead(soilPin);
  int moisture = map(soilValue, 0, 1023, 0, 100);
  
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  // Send data in format: moisture,temperature,humidity
  Serial.print(moisture);
  Serial.print(",");
  Serial.print(temp);
  Serial.print(",");
  Serial.println(humidity);
  
  delay(1000);
}
```

## 🎯 Testing

### Test 1: Check Serial Connection

```bash
# On Raspberry Pi
python3 -m serial.tools.miniterm /dev/ttyUSB0 9600
```

You should see numbers coming from Arduino.

### Test 2: Test Backend API

```bash
# From Raspberry Pi
curl -X POST http://192.168.1.100:3000/api/iot/sensor-data \
  -H "Content-Type: application/json" \
  -d '{"soilMoisture":45.5,"deviceId":"test"}'
```

### Test 3: Check Website

Open: `http://localhost:5173/iot-monitoring`

You should see the graph updating with your data!

## 📞 Support

- Python Script: `raspberry-pi-arduino-sender.py`
- Backend API: `backend/routes/iotRoutes.js`
- Frontend: `frontend/src/components/IoTMonitoring.tsx`

---

**🎉 Your Arduino + Raspberry Pi + Website system is ready!**
