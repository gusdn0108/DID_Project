const express = require('express');
const app = express();

app.listen(4000, () => {
    console.log('Back Server Running Port 4000  🏃🏻');
});

app.get('/', (req, res) => {
    res.send('Hello Express');
});
