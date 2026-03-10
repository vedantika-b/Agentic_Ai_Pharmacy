const express = require('express');
const router = express.Router();

// Get analytics dashboard data
router.get('/dashboard', (req, res) => {
  const analytics = {
    revenue: {
      total: 45231,
      growth: 12.5,
      chartData: [
        { month: 'Jan', value: 35000 },
        { month: 'Feb', value: 38000 },
        { month: 'Mar', value: 45231 },
      ],
    },
    orders: {
      total: 1234,
      growth: 8.2,
      pending: 45,
      processing: 23,
      completed: 1166,
    },
    prescriptions: {
      total: 456,
      growth: -3.5,
      pending: 12,
      approved: 420,
      rejected: 24,
    },
    satisfaction: {
      score: 4.8,
      growth: 2.1,
      reviews: 234,
    },
    inventory: {
      lowStock: 4,
      outOfStock: 0,
      totalItems: 156,
    },
    ocr: {
      processedToday: 234,
      accuracy: 98.5,
      avgProcessingTime: 12,
    },
  };
  
  res.json({ success: true, analytics });
});

// Get sales analytics
router.get('/sales', (req, res) => {
  const { period } = req.query; // weekly, monthly, yearly
  
  const salesData = [
    { date: '2026-03-01', revenue: 1250, orders: 45 },
    { date: '2026-03-02', revenue: 1450, orders: 52 },
    { date: '2026-03-03', revenue: 980, orders: 38 },
    { date: '2026-03-04', revenue: 1680, orders: 61 },
    { date: '2026-03-05', revenue: 1920, orders: 68 },
    { date: '2026-03-06', revenue: 2100, orders: 75 },
    { date: '2026-03-07', revenue: 1850, orders: 64 },
  ];
  
  res.json({ success: true, salesData });
});

// Get top selling medicines
router.get('/top-medicines', (req, res) => {
  const topMedicines = [
    { id: '1', name: 'Paracetamol 650mg', sales: 456, revenue: 5014 },
    { id: '2', name: 'Amoxicillin 250mg', sales: 234, revenue: 5733 },
    { id: '3', name: 'Ibuprofen 400mg', sales: 189, revenue: 2409 },
    { id: '4', name: 'Aspirin 500mg', sales: 167, revenue: 2670 },
  ];
  
  res.json({ success: true, topMedicines });
});

module.exports = router;
