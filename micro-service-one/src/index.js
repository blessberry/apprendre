const express = require('express');
const http = require('http');

const app = express();

const PORT = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);
console.log(`Forwarding video requests to ${VIDEO_STORAGE_HOST}:${VIDEO_STORAGE_PORT}.`);

app.get('/', (req, res) => {
    res.send('Hello World...')
});

app.get('/video', (req, res) => {
    const forwardRequest = http.request( 
        {
            host: VIDEO_STORAGE_HOST,
            port: VIDEO_STORAGE_PORT || 4002,
            path: '/video', 
            method: 'GET',
            headers: req.headers
        }, 
        forwardResponse => {
            res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
            forwardResponse.pipe(res);
        }
    );
    
    req.pipe(forwardRequest);
});
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
});