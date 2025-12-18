#!/bin/bash

echo "🚀 Deploying IIT Bombay Agriculture API to AWS Lambda..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Serverless Framework globally if not installed
if ! command -v serverless &> /dev/null; then
    echo "📦 Installing Serverless Framework..."
    npm install -g serverless
fi

# Configure AWS credentials (if not already configured)
echo "🔐 Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run:"
    echo "aws configure"
    echo "Or set environment variables:"
    echo "export AWS_ACCESS_KEY_ID=your_access_key"
    echo "export AWS_SECRET_ACCESS_KEY=your_secret_key"
    exit 1
fi

# Deploy to AWS Lambda
echo "🚀 Deploying to AWS Lambda..."
serverless deploy --stage prod --region ap-south-1

echo "✅ Deployment completed!"
echo "🌐 Your API is now live on AWS Lambda"
echo "📋 Check the output above for your API Gateway URL"