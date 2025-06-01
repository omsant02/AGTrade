const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 
        message: 'Trading Webhook Server is running!',
        time: new Date().toISOString()
    });
});

// Main webhook route - this is where TradingView will send signals
app.post('/webhook', (req, res) => {
    console.log('🚀 NEW SIGNAL RECEIVED!');
    console.log('Time:', new Date().toISOString());
    console.log('Signal Data:', req.body);
    console.log('-------------------');
    
    res.json({ 
        success: true, 
        message: 'Signal received successfully!' 
    });
});

app.listen(PORT, () => {
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`🌐 Webhook URL: http://localhost:${PORT}/webhook`);
    console.log('Ready to receive TradingView signals!');
});