@echo off
echo 🚀 Deploying IIT Bombay Agriculture API to AWS Lambda...

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Install Serverless Framework globally if not installed
where serverless >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Serverless Framework...
    npm install -g serverless
)

REM Check AWS credentials
echo 🔐 Checking AWS credentials...
aws sts get-caller-identity >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ AWS credentials not configured. Please run:
    echo aws configure
    echo Or set environment variables:
    echo set AWS_ACCESS_KEY_ID=your_access_key
    echo set AWS_SECRET_ACCESS_KEY=your_secret_key
    exit /b 1
)

REM Deploy to AWS Lambda
echo 🚀 Deploying to AWS Lambda...
serverless deploy --stage prod --region ap-south-1

echo ✅ Deployment completed!
echo 🌐 Your API is now live on AWS Lambda
echo 📋 Check the output above for your API Gateway URL

pause