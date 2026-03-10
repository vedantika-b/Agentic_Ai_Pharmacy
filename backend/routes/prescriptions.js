const express = require('express');
const router = express.Router();

// Mock prescriptions data
const mockPrescriptions = [
  {
    id: '1',
    userId: '1',
    patientName: 'Sarah Johnson',
    doctorName: 'Dr. Michael Smith',
    uploadDate: '2026-03-09',
    status: 'approved',
    imageUrl: '/uploads/prescription-1.jpg',
    extractedMedicines: [
      { name: 'Aspirin 500mg', dosage: '2 tablets daily', duration: '7 days' },
      { name: 'Amoxicillin 250mg', dosage: '3 times daily', duration: '5 days' },
    ],
  },
  {
    id: '2',
    userId: '1',
    patientName: 'Sarah Johnson',
    doctorName: 'Dr. Emily Brown',
    uploadDate: '2026-03-07',
    status: 'pending',
    imageUrl: '/uploads/prescription-2.jpg',
    extractedMedicines: [],
  },
];

// Get all prescriptions
router.get('/', (req, res) => {
  res.json({ success: true, prescriptions: mockPrescriptions });
});

// Get prescription by ID
router.get('/:id', (req, res) => {
  const prescription = mockPrescriptions.find(p => p.id === req.params.id);
  if (prescription) {
    res.json({ success: true, prescription });
  } else {
    res.status(404).json({ success: false, message: 'Prescription not found' });
  }
});

// Upload prescription (with OCR processing)
router.post('/upload', (req, res) => {
  const { userId, patientName, doctorName, imageUrl } = req.body;
  
  // Simulate OCR processing
  const newPrescription = {
    id: Date.now().toString(),
    userId,
    patientName,
    doctorName,
    uploadDate: new Date().toISOString().split('T')[0],
    status: 'processing',
    imageUrl,
    extractedMedicines: [],
  };
  
  mockPrescriptions.push(newPrescription);
  
  // Simulate OCR delay
  setTimeout(() => {
    newPrescription.status = 'pending';
    newPrescription.extractedMedicines = [
      { name: 'Paracetamol 650mg', dosage: '2 tablets', duration: '3 days' },
    ];
  }, 2000);
  
  res.json({ success: true, prescription: newPrescription });
});

// Approve/Reject prescription
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const prescription = mockPrescriptions.find(p => p.id === req.params.id);
  
  if (prescription) {
    prescription.status = status;
    res.json({ success: true, prescription });
  } else {
    res.status(404).json({ success: false, message: 'Prescription not found' });
  }
});

module.exports = router;
