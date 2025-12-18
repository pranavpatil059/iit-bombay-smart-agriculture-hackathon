# 🚀 Quick AWS Setup (2 minutes)

## ✅ Step 1: AWS CLI Installed ✅
AWS CLI is already installed on your system!

## 🔑 Step 2: Get AWS Credentials

### Option A: Use Existing AWS Account
If you have AWS account:
1. Login to: https://console.aws.amazon.com/
2. Go to: IAM → Users → Your User → Security Credentials
3. Create Access Key → Download CSV

### Option B: Create New AWS Account (Free)
1. Go to: https://aws.amazon.com/
2. Click "Create AWS Account"
3. Complete registration (requires credit card but won't charge for free tier)
4. Go to: IAM → Users → Create User → Attach policies:
   - `AWSLambdaFullAccess`
   - `AmazonAPIGatewayAdministrator`
5. Create Access Key → Download CSV

## ⚙️ Step 3: Configure AWS CLI
Run this command and enter your credentials:
```bash
aws configure
```

Enter:
- **AWS Access Key ID:** (from your CSV file)
- **AWS Secret Access Key:** (from your CSV file)  
- **Default region:** `ap-south-1`
- **Default output format:** `json`

## 🚀 Step 4: Deploy to AWS Lambda
```bash
cd backend
npm run deploy:aws
```

## 🎯 Alternative: Use AWS CloudShell (No Setup Required)
1. Login to AWS Console
2. Click CloudShell icon (top right)
3. Upload your backend folder
4. Run deployment commands

## 💡 Test AWS Configuration
```bash
aws sts get-caller-identity
```
Should show your AWS account info.

---

**Once configured, run: `cd backend && npm run deploy:aws`**