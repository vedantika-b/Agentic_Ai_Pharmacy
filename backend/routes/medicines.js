const express = require('express');
const router = express.Router();

// Mock medicines database
const mockMedicines = [
  {
    id: '1',
    name: 'Aspirin 500mg',
    category: 'Pain Relief',
    price: 15.99,
    stock: 45,
    minStock: 100,
    manufacturer: 'PharmaCorp',
    description: 'Pain reliever and fever reducer',
    requiresPrescription: false,
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 24.50,
    stock: 500,
    minStock: 300,
    manufacturer: 'MediLife',
    description: 'Antibiotic for bacterial infections',
    requiresPrescription: true,
  },
  {
    id: '3',
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    price: 12.75,
    stock: 80,
    minStock: 150,
    manufacturer: 'HealthPlus',
    description: 'Anti-inflammatory pain reliever',
    requiresPrescription: false,
  },
  {
    id: '4',
    name: 'Paracetamol 650mg',
    category: 'Pain Relief',
    price: 10.99,
    stock: 180,
    minStock: 200,
    manufacturer: 'PharmaCorp',
    description: 'Pain and fever relief',
    requiresPrescription: false,
  },
];

// Get all medicines
router.get('/', (req, res) => {
  const { category, search } = req.query;
  
  let filtered = mockMedicines;
  
  if (category) {
    filtered = filtered.filter(m => m.category === category);
  }
  
  if (search) {
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json({ success: true, medicines: filtered });
});

// Get medicine by ID
router.get('/:id', (req, res) => {
  const medicine = mockMedicines.find(m => m.id === req.params.id);
  if (medicine) {
    res.json({ success: true, medicine });
  } else {
    res.status(404).json({ success: false, message: 'Medicine not found' });
  }
});

// Add new medicine (admin only)
router.post('/', (req, res) => {
  const newMedicine = {
    id: Date.now().toString(),
    ...req.body,
  };
  
  mockMedicines.push(newMedicine);
  res.json({ success: true, medicine: newMedicine });
});

// Update medicine (admin only)
router.put('/:id', (req, res) => {
  const index = mockMedicines.findIndex(m => m.id === req.params.id);
  
  if (index !== -1) {
    mockMedicines[index] = { ...mockMedicines[index], ...req.body };
    res.json({ success: true, medicine: mockMedicines[index] });
  } else {
    res.status(404).json({ success: false, message: 'Medicine not found' });
  }
});

// Update stock
router.patch('/:id/stock', (req, res) => {
  const { stock } = req.body;
  const medicine = mockMedicines.find(m => m.id === req.params.id);
  
  if (medicine) {
    medicine.stock = stock;
    res.json({ success: true, medicine });
  } else {
    res.status(404).json({ success: false, message: 'Medicine not found' });
  }
});

module.exports = router;
