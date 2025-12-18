# 🚀 AWS Lambda Deployment - Quick Setup

## 🎯 One-Command Deployment

```bash
cd backend
npm run deploy:aws
```

## 📋 Prerequisites (5 minutes setup)

### 1. Create AWS Account
- Go to: https://aws.amazon.com/
- Click "Create AWS Account"
- Complete registration (requires credit card)

### 2. Get AWS Credentials
1. Login to AWS Console
2. Go to: IAM → Users → Create User
3. User name: `iit-bombay-agriculture`
4. Attach policies:
   - `AWSLambdaFullAccess`
   - `AmazonAPIGatewayAdministrator`
   - `CloudWatchLogsFullAccess`
5. Create Access Key → Download CSV

### 3. Install AWS CLI
**Windows:**
```bash
# Download from: https://aws.amazon.com/cli/
# Or use chocolatey:
choco install awscli
```

**Mac:**
```bash
brew install awscli
```

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 4. Configure AWS
```bash
aws configure
```
Enter your:
- Access Key ID: (from CSV file)
- Secret Access Key: (from CSV file)
- Region: `ap-south-1`
- Output: `json`

## 🚀 Deploy Commands

### Quick Deploy (Recommended)
```bash
cd backend
npm run deploy:aws
```

### Manual Deploy
```bash
cd backend
npm install
npm install -g serverless
serverless deploy --stage prod --region ap-south-1
```

## 📊 Expected Result
```
✅ Service deployed to stack iit-bombay-agriculture-api-prod
🌐 API Gateway URL: https://abc123.execute-api.ap-south-1.amazonaws.com/prod

endpoints:
  ANY - https://abc123.execute-api.ap-south-1.amazonaws.com/prod/{proxy+}
  ANY - https://abc123.execute-api.ap-south-1.amazonaws.com/prod

functions:
  api: iit-bombay-agriculture-api-prod-api
```

## 🔗 Your Live APIs
Replace `abc123` with your actual API ID:

- **Base URL:** `https://abc123.execute-api.ap-south-1.amazonaws.com/prod`
- **Farm Loans:** `/api/farm-loans/banks`
- **Transportation:** `/api/transportation/transporters`
- **AI Chat:** `/api/ai`
- **Wildlife:** `/api/wildlife/risk-assessment/Mumbai`
- **Weather:** `/api/weather`

## 🧪 Test Your APIs
```bash
# Test farm loans API
curl https://abc123.execute-api.ap-south-1.amazonaws.com/prod/api/farm-loans/banks

# Test transportation API
curl https://abc123.execute-api.ap-south-1.amazonaws.com/prod/api/transportation/transporters
```

## 💰 Cost (Very Low)
- **Free Tier:** 1M Lambda requests/month FREE
- **After Free Tier:** ~$0.20 per 1M requests
- **API Gateway:** ~$3.50 per 1M requests
- **Expected Monthly Cost:** $0-5 for normal usage

## 🔧 Management Commands
```bash
# Check deployment info
serverless info --stage prod

# View logs
serverless logs -f api --stage prod --tail

# Update deployment
npm run deploy:prod

# Remove deployment (cleanup)
serverless remove --stage prod
```

## 🛠️ Troubleshooting

### Error: AWS credentials not configured
```bash
aws configure
# Enter your Access Key ID and Secret Access Key
```

### Error: Access Denied
- Check IAM permissions
- Ensure user has Lambda and API Gateway permissions

### Error: Region not supported
- Use `ap-south-1` (Mumbai) region
- Or change in serverless.yml

### Error: Deployment timeout
```bash
serverless deploy --verbose --stage prod
```

## 🎉 Success!
Once deployed, your IIT Bombay Agriculture APIs will be:
- ✅ Live on AWS Lambda
- ✅ Scalable (auto-scaling)
- ✅ Highly available (99.9% uptime)
- ✅ Cost-effective (pay per use)
- ✅ Global CDN (fast worldwide)

**Your hackathon project is now enterprise-ready! 🚀**