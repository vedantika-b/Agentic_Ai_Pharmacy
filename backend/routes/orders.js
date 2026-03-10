const express = require('express');
const router = express.Router();

// Mock orders data
const mockOrders = [
  {
    id: '1',
    orderNumber: '#ORD-1234',
    userId: '1',
    items: [
      { medicineId: '1', name: 'Aspirin 500mg', quantity: 2, price: 15.99 },
      { medicineId: '2', name: 'Amoxicillin 250mg', quantity: 1, price: 24.50 },
    ],
    total: 56.48,
    status: 'delivered',
    date: '2026-03-05',
  },
  {
    id: '2',
    orderNumber: '#ORD-1235',
    userId: '1',
    items: [
      { medicineId: '3', name: 'Ibuprofen 400mg', quantity: 1, price: 12.75 },
    ],
    total: 12.75,
    status: 'shipped',
    date: '2026-03-08',
  },
];

// Get all orders
router.get('/', (req, res) => {
  res.json({ success: true, orders: mockOrders });
});

// Get order by ID
router.get('/:id', (req, res) => {
  const order = mockOrders.find(o => o.id === req.params.id);
  if (order) {
    res.json({ success: true, order });
  } else {
    res.status(404).json({ success: false, message: 'Order not found' });
  }
});

// Create new order
router.post('/', (req, res) => {
  const { userId, items, total } = req.body;
  
  const newOrder = {
    id: Date.now().toString(),
    orderNumber: '#ORD-' + Date.now(),
    userId,
    items,
    total,
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
  };
  
  mockOrders.push(newOrder);
  res.json({ success: true, order: newOrder });
});

// Update order status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const order = mockOrders.find(o => o.id === req.params.id);
  
  if (order) {
    order.status = status;
    res.json({ success: true, order });
  } else {
    res.status(404).json({ success: false, message: 'Order not found' });
  }
});

module.exports = router;
