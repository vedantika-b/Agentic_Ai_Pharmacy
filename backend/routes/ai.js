const express = require('express');
const router = express.Router();

// Mock AI chat responses
const mockResponses = {
  greeting: "Hello! I'm your AI pharmacist assistant. How can I help you today?",
  medication_info: "I'd be happy to help you with medication information. Please note that this is AI-generated advice and you should always consult with a licensed healthcare professional for medical decisions.",
  dosage: "Dosage recommendations vary based on age, weight, and medical condition. Always follow your doctor's prescription or consult a healthcare professional.",
  side_effects: "Common side effects can include nausea, dizziness, or drowsiness. If you experience severe reactions, seek immediate medical attention.",
  default: "I understand your question. For accurate medical advice, please consult with a healthcare professional or pharmacist.",
};

// Chat endpoint
router.post('/chat', async (req, res) => {
  const { message, history } = req.body;
  
  // Simple keyword-based response (in production, use OpenAI API)
  let response = mockResponses.default;
  
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    response = mockResponses.greeting;
  } else if (lowerMessage.includes('dosage') || lowerMessage.includes('how much')) {
    response = mockResponses.dosage;
  } else if (lowerMessage.includes('side effect') || lowerMessage.includes('adverse')) {
    response = mockResponses.side_effects;
  } else if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('drug')) {
    response = mockResponses.medication_info;
  }
  
  res.json({
    success: true,
    response,
    timestamp: new Date().toISOString(),
  });
});

// Get medicine recommendations based on symptoms
router.post('/recommend', (req, res) => {
  const { symptoms } = req.body;
  
  // Mock recommendations
  const recommendations = [
    { name: 'Paracetamol 650mg', reason: 'For fever and pain relief', confidence: 0.95 },
    { name: 'Ibuprofen 400mg', reason: 'Anti-inflammatory properties', confidence: 0.88 },
  ];
  
  res.json({ success: true, recommendations });
});

module.exports = router;
