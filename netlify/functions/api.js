exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.path === '/' || event.path === '/.netlify/functions/api') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: 'IIT Bombay Smart Agriculture Backend is running!',
                status: 'success',
                timestamp: new Date().toISOString()
            })
        };
    }

    return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Route not found' })
    };
};