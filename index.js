const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sirf main.html serve karein
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

require('events').EventEmitter.defaultMaxListeners = 500;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
