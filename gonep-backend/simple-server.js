const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'GONEP API is running' });
});

// Demo interests endpoint
app.get('/api/demo/config/interests', (req, res) => {
  const interests = [
    { id: 1, name: "Blood glucose testing", category: "diagnostics", isActive: true },
    { id: 2, name: "Blood pressure monitoring", category: "diagnostics", isActive: true },
    { id: 3, name: "AI diagnostic features", category: "ai", isActive: true }
  ];
  res.json({ success: true, data: interests });
});

// Demo types endpoint
app.get('/api/demo/config/types', (req, res) => {
  const types = [
    { id: 1, name: "Virtual Demo", duration: "45 min", isActive: true },
    { id: 2, name: "On-site Demo", duration: "2 hours", isActive: true }
  ];
  res.json({ success: true, data: types });
});

// Calendar endpoint
app.get('/api/demo/config/calendar', (req, res) => {
  const calendar = [
    { id: 1, date: "2025-08-17", isAvailable: true, maxBookings: 5, currentBookings: 0 },
    { id: 2, date: "2025-08-18", isAvailable: true, maxBookings: 5, currentBookings: 0 }
  ];
  res.json({ success: true, data: calendar });
});

// Demo request submission
app.post('/api/demo/request', (req, res) => {
  const { firstName, lastName, email } = req.body;
  
  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }
  
  res.json({
    success: true,
    data: { id: Date.now() },
    message: 'Demo request submitted successfully'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple GONEP API Server running on http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
