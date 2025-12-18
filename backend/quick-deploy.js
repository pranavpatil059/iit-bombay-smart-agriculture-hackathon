const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Quick AWS Lambda Deployment Setup');
console.log('=====================================');

try {
  // Check if AWS CLI is installed
  console.log('1. Checking AWS CLI...');
  try {
    execSync('aws --version', { stdio: 'pipe' });
    console.log('✅ AWS CLI is installed');
  } catch (error) {
    console.log('❌ AWS CLI not found. Please install: https://aws.amazon.com/cli/');
    process.exit(1);
  }

  // Check AWS credentials
  console.log('2. Checking AWS credentials...');
  try {
    execSync('aws sts get-caller-identity', { stdio: 'pipe' });
    console.log('✅ AWS credentials configured');
  } catch (error) {
    console.log('❌ AWS credentials not configured. Run: aws configure');
    process.exit(1);
  }

  // Install serverless dependencies
  console.log('3. Installing serverless dependencies...');
  execSync('npm install serverless-http --save', { stdio: 'inherit' });
  execSync('npm install serverless serverless-offline --save-dev', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');

  // Install Serverless Framework globally
  console.log('4. Installing Serverless Framework globally...');
  try {
    execSync('serverless --version', { stdio: 'pipe' });
    console.log('✅ Serverless Framework already installed');
  } catch (error) {
    execSync('npm install -g serverless', { stdio: 'inherit' });
    console.log('✅ Serverless Framework installed');
  }

  // Deploy to AWS Lambda
  console.log('5. Deploying to AWS Lambda...');
  console.log('This may take 2-3 minutes...');
  
  const deployOutput = execSync('serverless deploy --stage prod --region ap-south-1', { 
    stdio: 'pipe',
    encoding: 'utf8'
  });
  
  console.log('✅ Deployment successful!');
  console.log('\n📋 Deployment Output:');
  console.log(deployOutput);
  
  // Extract API Gateway URL
  const urlMatch = deployOutput.match(/https:\/\/[a-z0-9]+\.execute-api\.[a-z0-9-]+\.amazonaws\.com\/[a-z]+/);
  if (urlMatch) {
    const apiUrl = urlMatch[0];
    console.log('\n🌐 Your API is live at:');
    console.log(`🔗 ${apiUrl}`);
    console.log('\n📋 Test your APIs:');
    console.log(`🏦 Farm Loans: ${apiUrl}/api/farm-loans/banks`);
    console.log(`🚚 Transportation: ${apiUrl}/api/transportation/transporters`);
    console.log(`🤖 AI Chat: ${apiUrl}/api/ai`);
    console.log(`🐅 Wildlife: ${apiUrl}/api/wildlife/risk-assessment/Mumbai`);
    
    // Save API URL to file
    fs.writeFileSync('aws-api-url.txt', apiUrl);
    console.log('\n💾 API URL saved to: aws-api-url.txt');
  }

  console.log('\n🎉 AWS Lambda deployment completed successfully!');
  console.log('🔧 To update: npm run deploy:prod');
  console.log('📊 Monitor: AWS Console → Lambda → iit-bombay-agriculture-api-prod-api');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('\n🛠️ Troubleshooting:');
  console.log('1. Check AWS credentials: aws configure');
  console.log('2. Check AWS permissions: IAM → Users → Your User → Permissions');
  console.log('3. Try manual deployment: serverless deploy --verbose');
  process.exit(1);
}