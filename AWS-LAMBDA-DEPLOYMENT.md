# 🚀 AWS Lambda API Deployment Guide

## 📋 Prerequisites

### 1. AWS Account Setup
- Create AWS account: https://aws.amazon.com/
- Get AWS Access Key ID and Secret Access Key
- Install AWS CLI: https://aws.amazon.com/cli/

### 2. Configure AWS CLI
```bash
aws configure
```
Enter:
- AWS Access Key ID: `your_access_key_id`
- AWS Secret Access Key: `your_secret_access_key`
- Default region: `ap-south-1` (Mumbai)
- Default output format: `json`

### 3. Install Dependencies
```bash
cd backend
npm install
npm install -g serverless
```

## 🚀 Deployment Steps

### Option 1: Automatic Deployment (Windows)
```bash
cd backend
deploy-aws.bat
```

### Option 2: Automatic Deployment (Linux/Mac)
```bash
cd backend
chmod +x deploy-aws.sh
./deploy-aws.sh
```

### Option 3: Manual Deployment
```bash
cd backend
npm install
serverless deploy --stage prod --region ap-south-1
```

## 📊 Expected Output
After successful deployment, you'll see:
```
✅ Service deployed to stack iit-bombay-agriculture-api-prod
🌐 API Gateway URL: https://xxxxxxxxxx.execute-api.ap-south-1.amazonaws.com/prod
```

## 🔗 API Endpoints
Once deployed, your APIs will be available at:
- Base URL: `https://your-api-id.execute-api.ap-south-1.amazonaws.com/prod`
- Farm Loans: `/api/farm-loans/banks`
- Transportation: `/api/transportation/transporters`
- AI Chat: `/api/ai`
- Wildlife: `/api/wildlife/risk-assessment`
- Weather: `/api/weather`

## 🛠️ Configuration

### Environment Variables
Set these in AWS Lambda Console or serverless.yml:
```yaml
environment:
  NODE_ENV: production
  MONGO_URI: your_mongodb_connection_string
  AWS_DOCUMENTDB_URI: your_documentdb_uri
  GEMINI_API_KEY: your_gemini_api_key
```

### CORS Configuration
Already configured for:
- Origin: `*` (all domains)
- Methods: `GET, POST, PUT, DELETE, OPTIONS`
- Headers: Standard headers + custom headers

## 📈 Monitoring

### CloudWatch Logs
- View logs: AWS Console → CloudWatch → Log Groups
- Log Group: `/aws/lambda/iit-bombay-agriculture-api-prod-api`

### API Gateway Metrics
- AWS Console → API Gateway → Your API → Monitoring
- Track requests, latency, errors

## 💰 Cost Estimation
- **Lambda**: ~$0.20 per 1M requests
- **API Gateway**: ~$3.50 per 1M requests
- **CloudWatch Logs**: ~$0.50 per GB
- **Total**: ~$5-10/month for moderate usage

## 🔧 Troubleshooting

### Common Issues:

1. **AWS Credentials Error**
   ```bash
   aws configure list
   aws sts get-caller-identity
   ```

2. **Deployment Timeout**
   ```bash
   serverless deploy --verbose
   ```

3. **CORS Issues**
   - Check serverless.yml CORS configuration
   - Verify API Gateway CORS settings

4. **Cold Start Issues**
   - Use provisioned concurrency for production
   - Optimize bundle size

### Useful Commands:
```bash
# Check deployment status
serverless info --stage prod

# View logs
serverless logs -f api --stage prod

# Remove deployment
serverless remove --stage prod

# Test locally
serverless offline
```

## 🌐 Frontend Integration
Update frontend API URLs to use Lambda endpoint:
```javascript
const API_BASE_URL = 'https://your-api-id.execute-api.ap-south-1.amazonaws.com/prod';
```

## 🔒 Security Best Practices
1. Use IAM roles with minimal permissions
2. Enable API Gateway throttling
3. Use AWS WAF for protection
4. Store secrets in AWS Secrets Manager
5. Enable CloudTrail for auditing

## 📞 Support
- AWS Documentation: https://docs.aws.amazon.com/lambda/
- Serverless Framework: https://www.serverless.com/framework/docs/

---

## 🎯 Quick Start Commands
```bash
# 1. Install dependencies
cd backend && npm install

# 2. Configure AWS
aws configure

# 3. Deploy
npm run deploy:prod

# 4. Test
curl https://your-api-id.execute-api.ap-south-1.amazonaws.com/prod/api/farm-loans/banks
```

**Your IIT Bombay Agriculture API will be live on AWS Lambda! 🚀**