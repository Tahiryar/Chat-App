const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

// Handle WebSocket connections
wss.on('connection', (ws) => {
    clients.push(ws);

    ws.on('message', (message) => {
        // Broadcast message to all clients
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        // Remove the client from the array when they disconnect
        clients = clients.filter(client => client !== ws);
    });
});

// Serve static files (if you have any)
app.use(express.static('public')); // Make sure 'public' is your directory

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
