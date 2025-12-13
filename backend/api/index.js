module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Basic routing
    if (req.url === '/' || req.url === '') {
        res.status(200).json({ 
            message: 'IIT Bombay Smart Agriculture Backend is running!', 
            status: 'success',
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url
        });
    } else if (req.url === '/api/health') {
        res.status(200).json({ 
            status: 'healthy',
            timestamp: new Date().toISOString()
        });
    } else {
        res.status(404).json({ 
            error: 'Route not found',
            path: req.url,
            message: 'IIT Bombay Agriculture API'
        });
    }
};