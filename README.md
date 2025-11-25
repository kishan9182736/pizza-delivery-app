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
