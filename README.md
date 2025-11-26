# 🍕 Pizza Delivery App

A full-stack pizza delivery application with real-time order tracking.

## Features
- 🍕 Pizza menu with ordering
- 🔄 Real-time order updates
- 🐳 Docker containerization
- 🚀 PM2 process management
- 🌐 NGINX reverse proxy

## Tech Stack
- **Backend**: Node.js, Express, Socket.io
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Docker, PM2, NGINX, AWS EC2

## Deployment
1. Clone repository to EC2
2. Build Docker image: `docker build -t pizza-app ./backend`
3. Run with PM2: `pm2 start --name pizza-app "docker run -p 5000:5000 pizza-app"`
4. Configure NGINX

<!-- Test from GitHub web interface: $(KHAITE JABO) -->


----------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Cronjob script---------

#!/bin/bash
LOG_FILE="/home/ubuntu/update.log"
APP_DIR="/home/ubuntu/pizza-delivery-app"

echo "=== Update check: $(date) ===" >> $LOG_FILE

cd $APP_DIR

# Check if we need to update
git fetch origin
if git status | grep -q "Your branch is behind"; then
    echo "🔄 Changes found! Updating..." >> $LOG_FILE

    # Pull changes
    git pull origin main

    # Update backend
    cd backend
    docker stop pizza-backend || true
    docker rm pizza-backend || true
    docker build -t pizza-backend .
    docker run -d --name pizza-backend --restart unless-stopped -p 5000:5000 pizza-backend

    # Update frontend
    cd ..
    sudo cp -rf frontend/* /var/www/pizza-frontend/

    echo "✅ Update completed!" >> $LOG_FILE
else
    echo "✅ Already up to date" >> $LOG_FILE
fi
