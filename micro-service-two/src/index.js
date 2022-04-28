const fs = require('fs');
const express = require('express');

const app = express();

const PORT = process.env.PORT;

app.get('/video', (req, res) => {
    const path ="./videos/SampleVideo_1280x720_1mb.mp4";
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occurred");
            res.sendStatus(500);
            return;
        }
    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });
    fs.createReadStream(path).pipe(res);
    });
});
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
});