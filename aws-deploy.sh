#!/bin/bash

# AWS EC2 Deployment Script for IIT Bombay Smart Agriculture

echo "🚀 Starting AWS EC2 Deployment..."

# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Clone your repository (replace with your repo URL)
# git clone https://gitlab.com/your-username/iit-bombay-hack2025-2.git
# cd iit-bombay-hack2025-2

# Build and run with Docker Compose
docker-compose up -d

echo "✅ Deployment completed!"
echo "🌐 Frontend: http://your-ec2-ip"
echo "🔧 Backend: http://your-ec2-ip:3000"