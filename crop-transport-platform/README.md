# 🚚 AgriTech Crop Transportation Platform
## Connecting Farmers, Transporters & Market Buyers

[![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)

## 🎯 **Problem Statement**
Farmers face difficulty in transporting crops to nearby markets due to lack of vehicles, price transparency, real-time tracking, and coordination with transporters and buyers.

## 💡 **Solution**
A scalable, cloud-based system that connects **Farmers**, **Transporters**, and **Market Buyers** to efficiently transport crops from farms to markets.

## 🏗️ **System Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FARMER APP    │    │ TRANSPORTER APP │    │  BUYER APP      │
│                 │    │                 │    │                 │
│ • Crop Listing  │    │ • Vehicle Mgmt  │    │ • Crop Browse   │
│ • Transport Req │    │ • Bid on Jobs   │    │ • Purchase Req  │
│ • Real-time GPS │    │ • GPS Tracking  │    │ • Price Nego    │
│ • Market Prices │    │ • Delivery Conf │    │ • Order Track   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   BACKEND API   │
                    │                 │
                    │ • JWT Auth      │
                    │ • Role-based    │
                    │ • Socket.io     │
                    │ • REST APIs     │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │    DATABASE     │
                    │                 │
                    │ • MongoDB       │
                    │ • User Mgmt     │
                    │ • Crop Data     │
                    │ • Transport Req │
                    └─────────────────┘
```

## 🎯 **Core Modules**

### 👨‍🌾 **1. Farmer Module**
- ✅ Farmer registration & login
- ✅ Add crop details (type, quantity, harvest date, location)
- ✅ Request transportation
- ✅ View transporter bids & accept/reject
- ✅ Track vehicle in real-time
- ✅ View market prices

### 🚛 **2. Transporter Module**
- ✅ Transporter registration & verification
- ✅ Add vehicle details (type, capacity, availability)
- ✅ View transport requests
- ✅ Bid on requests
- ✅ Live GPS tracking
- ✅ Delivery confirmation

### 🏪 **3. Market/Buyer Module**
- ✅ View incoming crop listings
- ✅ Place purchase requests
- ✅ Price negotiation
- ✅ Order confirmation

### 👨‍💼 **4. Admin Panel**
- ✅ Verify transporters
- ✅ Manage users
- ✅ View analytics
- ✅ Handle disputes

## 💻 **Technology Stack**

### **Frontend:**
- **Framework:** React.js 18 + TypeScript
- **UI Library:** Tailwind CSS + Shadcn/ui
- **State Management:** React Context + Hooks
- **Maps:** Google Maps API
- **Real-time:** Socket.io Client
- **HTTP Client:** Axios
- **Routing:** React Router v6

### **Backend:**
- **Runtime:** Node.js + Express.js
- **Authentication:** JWT + bcrypt
- **Real-time:** Socket.io
- **Validation:** Joi
- **File Upload:** Multer + AWS S3
- **SMS/WhatsApp:** Twilio

### **Database:**
- **Primary:** MongoDB + Mongoose
- **Caching:** Redis
- **File Storage:** AWS S3
- **Search:** MongoDB Atlas Search

### **Cloud & DevOps:**
- **Hosting:** AWS EC2 + Load Balancer
- **Database:** MongoDB Atlas
- **Storage:** AWS S3
- **CDN:** CloudFront
- **Monitoring:** CloudWatch
- **CI/CD:** GitHub Actions

## 🚀 **Quick Start**

### **Prerequisites:**
- Node.js 18+
- MongoDB
- AWS Account
- Google Maps API Key

### **Installation:**

```bash
# Clone repository
git clone https://github.com/yourusername/agritech-transport-platform.git
cd agritech-transport-platform

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development servers
npm run dev:backend  # Backend on port 5000
npm run dev:frontend # Frontend on port 3000
```

## 🌐 **API Endpoints**

### **Authentication:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Verify JWT token

### **Farmer APIs:**
- `GET /api/farmer/crops` - Get farmer's crops
- `POST /api/farmer/crops` - Add new crop
- `POST /api/farmer/transport-request` - Request transportation
- `GET /api/farmer/bids/:requestId` - Get bids for request

### **Transporter APIs:**
- `GET /api/transporter/requests` - Get available transport requests
- `POST /api/transporter/bid` - Place bid on request
- `PUT /api/transporter/location` - Update GPS location
- `POST /api/transporter/delivery-confirm` - Confirm delivery

### **Buyer APIs:**
- `GET /api/buyer/crops` - Browse available crops
- `POST /api/buyer/purchase-request` - Place purchase request
- `PUT /api/buyer/negotiate` - Negotiate price

### **Admin APIs:**
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/verify-transporter` - Verify transporter
- `GET /api/admin/analytics` - Get platform analytics

## 📱 **Features**

### **Core Features:**
- ✅ Multi-role authentication (Farmer/Transporter/Buyer/Admin)
- ✅ Real-time GPS tracking
- ✅ Bidding system for transport requests
- ✅ Price negotiation between buyers and farmers
- ✅ SMS/WhatsApp notifications
- ✅ Responsive mobile-first design

### **Advanced Features:**
- ✅ AI-based route optimization
- ✅ Weather integration
- ✅ Mandi price integration
- ✅ Multilingual support (English/Hindi/Marathi)
- ✅ Analytics dashboard
- ✅ Dispute resolution system

## 🗄️ **Database Schema**

### **Users Collection:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  password: String (hashed),
  role: String, // 'farmer', 'transporter', 'buyer', 'admin'
  location: {
    address: String,
    coordinates: [Number, Number]
  },
  verified: Boolean,
  createdAt: Date
}
```

### **Crops Collection:**
```javascript
{
  _id: ObjectId,
  farmerId: ObjectId,
  cropType: String,
  variety: String,
  quantity: Number,
  unit: String,
  harvestDate: Date,
  expectedPrice: Number,
  location: {
    address: String,
    coordinates: [Number, Number]
  },
  images: [String],
  status: String, // 'available', 'sold', 'in-transit'
  createdAt: Date
}
```

### **Transport Requests Collection:**
```javascript
{
  _id: ObjectId,
  farmerId: ObjectId,
  cropId: ObjectId,
  pickupLocation: {
    address: String,
    coordinates: [Number, Number]
  },
  dropLocation: {
    address: String,
    coordinates: [Number, Number]
  },
  preferredDate: Date,
  vehicleType: String,
  bids: [{
    transporterId: ObjectId,
    amount: Number,
    estimatedTime: String,
    message: String,
    status: String // 'pending', 'accepted', 'rejected'
  }],
  status: String, // 'open', 'assigned', 'in-progress', 'completed'
  createdAt: Date
}
```

## 🚀 **Deployment**

### **AWS Deployment:**

```bash
# Build frontend
cd frontend
npm run build

# Deploy to S3
aws s3 sync build/ s3://your-bucket-name

# Deploy backend to EC2
# Use provided deployment scripts
./deploy-backend.sh
```

### **Environment Variables:**

```env
# Backend .env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agritech
JWT_SECRET=your-super-secret-jwt-key
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=your-s3-bucket-name
GOOGLE_MAPS_API_KEY=your-google-maps-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

## 📊 **Analytics & Monitoring**

- **User Analytics:** Registration trends, active users
- **Transport Analytics:** Volume, routes, revenue
- **Performance Metrics:** API response times, error rates
- **Business Metrics:** Successful deliveries, farmer satisfaction

## 🔒 **Security Features**

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Rate limiting
- HTTPS encryption
- Secure file uploads

## 🌍 **Multilingual Support**

- English (Default)
- Hindi (हिंदी)
- Marathi (मराठी)

## 📞 **Support**

- **Email:** support@agritech-transport.com
- **Phone:** +91-XXXX-XXXX-XX
- **Documentation:** [API Docs](https://api.agritech-transport.com/docs)

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 **License**

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

**🚚 Revolutionizing crop transportation in India! 🇮🇳**