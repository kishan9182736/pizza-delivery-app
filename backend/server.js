const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Sample pizza menu
const menu = [
  { id: 1, name: "Margherita", price: 10, description: "Classic cheese and tomato" },
  { id: 2, name: "Pepperoni", price: 12, description: "Pepperoni and cheese" },
  { id: 3, name: "Veggie", price: 11, description: "Fresh vegetables" },
  { id: 4, name: "BBQ Chicken", price: 13, description: "BBQ sauce with chicken" }
];

let orders = [];
let orderId = 1;

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/api/menu', (req, res) => {
  res.json(menu);
});

app.post('/api/orders', (req, res) => {
  const { customer, items, total } = req.body;
  
  const newOrder = {
    id: orderId++,
    customer: customer || "Walk-in Customer",
    items,
    total,
    status: 'preparing',
    createdAt: new Date()
  };
  
  orders.push(newOrder);
  
  // Real-time update to all connected clients
  io.emit('newOrder', newOrder);
  io.emit('ordersUpdate', orders);
  
  res.json({ success: true, order: newOrder });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('🔌 New client connected');
  socket.emit('ordersUpdate', orders);
  
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🍕 Pizza backend running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api/menu`);
});
