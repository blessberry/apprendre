const express = require('express');
const app = express();
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.json({hey: 'hello live reloaaad world'})
})
app.listen(PORT, () => {
    console.log(`Micro-service-four listenin' on port ${PORT}..`)
})