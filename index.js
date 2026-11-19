const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Pair.js ko safely load karein ---
try {
    const pairRouter = require('./pair');
    app.use('/pair', pairRouter);
    app.use('/code', pairRouter);
    console.log("✅ pair.js loaded successfully");
} catch (err) {
    console.error("❌ pair.js load nahi hua:", err.message);
}

// --- Main page ---
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

require('events').EventEmitter.defaultMaxListeners = 500;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
