# 🔌 Raspberry Pi Direct Connection Setup

## 📋 Overview

This guide shows you how to send sensor data **directly** from your Raspberry Pi to your website, bypassing ThingSpeak.

## 🎯 Architecture

```
Raspberry Pi Sensors
        ↓
   Python Script
        ↓
Your Backend API (Node.js)
        ↓
   Website Frontend
```

## 🚀 Quick Start

### Step 1: Backend Setup (Already Done!)

Your backend now has IoT endpoints at:
- `POST /api/iot/sensor-data` - Raspberry Pi sends data here
- `GET /api/iot/sensor-data/latest` - Website fetches latest data
- `GET /api/iot/sensor-data/history` - Website fetches historical data

### Step 2: Raspberry Pi Setup

#### 2.1 Install Python Dependencies

```bash
# On your Raspberry Pi
sudo apt-get update
sudo apt-get install python3-pip

# Install required Python packages
pip3 install requests
```

#### 2.2 Copy the Python Script

Copy `raspberry-pi-sender.py` to your Raspberry Pi:

```bash
# On your computer
scp raspberry-pi-sender.py pi@raspberrypi.local:~/

# Or manually copy the file to your Pi
```

#### 2.3 Configure the Script

Edit the script on your Raspberry Pi:

```bash
nano ~/raspberry-pi-sender.py
```

Update these lines:

```python
# For local testing (Pi and computer on same network)
BACKEND_URL = "http://YOUR_COMPUTER_IP:3000/api/iot/sensor-data"

# For production (after deploying to Vercel/AWS)
BACKEND_URL = "https://your-backend-url.com/api/iot/sensor-data"

# Give your device a unique name
DEVICE_ID = "raspberry-pi-farm-001"
```

#### 2.4 Add Your Sensor Code

Replace the dummy sensor functions with your actual sensor reading code:

```python
def read_soil_moisture():
    # Example for analog sensor via ADS1115
    import Adafruit_ADS1x15
    adc = Adafruit_ADS1x15.ADS1115()
    value = adc.read_adc(0, gain=1)
    moisture = (value / 32767.0) * 100
    return round(moisture, 2)

def read_temperature():
    # Example for DHT22 sensor
    import Adafruit_DHT
    humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 4)
    return round(temperature, 2) if temperature else None
```

### Step 3: Run the Script

```bash
# Make it executable
chmod +x raspberry-pi-sender.py

# Run it
python3 raspberry-pi-sender.py
```

You should see:
```
==================================================
🌱 Raspberry Pi Sensor Data Sender
==================================================
Backend URL: http://192.168.1.100:3000/api/iot/sensor-data
Device ID: raspberry-pi-001
Send Interval: 15 seconds
==================================================

📡 Sending data...
   Soil Moisture: 45.23%
   Temperature: 25.5°C
   Humidity: 65.2%
✅ Success: Data sent successfully
```

### Step 4: Run on Startup (Optional)

To make it run automatically when Pi boots:

```bash
# Edit crontab
crontab -e

# Add this line
@reboot sleep 30 && python3 /home/pi/raspberry-pi-sender.py >> /home/pi/sensor.log 2>&1
```

## 🌐 Frontend Integration

Your website will automatically fetch data from your backend. No changes needed!

The IoT monitoring page already fetches from:
- `/api/iot/sensor-data/latest` - For current values
- `/api/iot/sensor-data/history` - For charts

## 🔧 Testing

### Test 1: Check Backend is Running

```bash
curl http://localhost:3000/api/iot/health
```

Should return:
```json
{
  "success": true,
  "status": "healthy",
  "lastUpdate": "2024-12-17T10:30:00.000Z"
}
```

### Test 2: Send Test Data

```bash
curl -X POST http://localhost:3000/api/iot/sensor-data \
  -H "Content-Type: application/json" \
  -d '{
    "soilMoisture": 45.5,
    "temperature": 25.0,
    "humidity": 60.0,
    "deviceId": "test-device"
  }'
```

### Test 3: Fetch Latest Data

```bash
curl http://localhost:3000/api/iot/sensor-data/latest
```

## 📊 API Endpoints

### POST /api/iot/sensor-data
Send sensor data from Raspberry Pi

**Request:**
```json
{
  "soilMoisture": 45.5,
  "temperature": 25.0,
  "humidity": 60.0,
  "deviceId": "raspberry-pi-001"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data received successfully",
  "data": {
    "soilMoisture": 45.5,
    "temperature": 25.0,
    "humidity": 60.0,
    "timestamp": "2024-12-17T10:30:00.000Z",
    "deviceId": "raspberry-pi-001"
  }
}
```

### GET /api/iot/sensor-data/latest
Get latest sensor reading

**Response:**
```json
{
  "success": true,
  "data": {
    "soilMoisture": 45.5,
    "temperature": 25.0,
    "humidity": 60.0,
    "timestamp": "2024-12-17T10:30:00.000Z",
    "deviceId": "raspberry-pi-001"
  }
}
```

### GET /api/iot/sensor-data/history?limit=60
Get historical data

**Response:**
```json
{
  "success": true,
  "count": 60,
  "data": [
    {
      "soilMoisture": 45.5,
      "temperature": 25.0,
      "humidity": 60.0,
      "timestamp": "2024-12-17T10:30:00.000Z",
      "deviceId": "raspberry-pi-001"
    },
    ...
  ]
}
```

## 🔐 Security Considerations

### For Production:

1. **Add Authentication:**
```python
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
}
```

2. **Use HTTPS:**
```python
BACKEND_URL = "https://your-backend-url.com/api/iot/sensor-data"
```

3. **Add Rate Limiting** in backend

4. **Validate Device ID** in backend

## 🆚 Comparison: Direct vs ThingSpeak

### Direct Connection (This Setup)
✅ Full control over data
✅ No third-party dependency
✅ Faster updates
✅ Custom data processing
✅ No API limits
❌ Need to manage backend
❌ Need to handle data storage

### ThingSpeak (Current Setup)
✅ Easy to set up
✅ Built-in visualization
✅ Data persistence
✅ No backend management
❌ API rate limits
❌ Less control
❌ Requires internet

## 🎯 Recommended Approach

**Use Both!**

1. **Primary:** Send to your backend (this setup)
2. **Backup:** Also send to ThingSpeak

This gives you:
- Real-time data on your website
- Backup data on ThingSpeak
- ThingSpeak's visualization tools
- Redundancy if one fails

## 🛠️ Troubleshooting

### "Connection Error: Cannot reach backend"
- Check if backend is running: `curl http://localhost:3000/api/iot/health`
- Verify BACKEND_URL in Python script
- Check firewall settings
- Ensure Pi and computer are on same network

### "Data not showing on website"
- Check backend logs
- Verify data is being received: `curl http://localhost:3000/api/iot/sensor-data/latest`
- Refresh website
- Check browser console for errors

### "Sensor readings are None"
- Check sensor connections
- Verify sensor library is installed
- Test sensors individually
- Check GPIO pin numbers

## 📞 Support

- Backend API: Check `backend/routes/iotRoutes.js`
- Python Script: Check `raspberry-pi-sender.py`
- Frontend: Check `frontend/src/components/IoTMonitoring.tsx`

---

**🎉 You're all set! Your Raspberry Pi can now send data directly to your website!**
