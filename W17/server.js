const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;

// Serve static files from the public folder
app.use(express.static('public'));

// API endpoint to fetch employee data
app.get('/employees', async (req, res) => {
  try {
    const data = await fs.readFile('employees.json', 'utf8');
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Error reading file');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});