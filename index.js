const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

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
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Raw Body:', req.body);
    console.log('Body Type:', typeof req.body);

    let signalData;
    if (typeof req.body === 'string') {
        signalData = req.body; 
    } else if (typeof req.body === 'object') {
        signalData = req.body; 
    } else {
        signalData = 'Unknown format';
    }
    
    console.log('Parsed Signal:', signalData);
    console.log('-------------------');
    
    res.json({ 
        success: true, 
        message: 'Signal received successfully!',
        received: signalData
    });
});

app.listen(PORT, () => {
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`🌐 Webhook URL: http://localhost:${PORT}/webhook`);
    console.log('Ready to receive TradingView signals!');
});