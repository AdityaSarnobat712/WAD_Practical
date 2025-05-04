const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Serve static files from public folder
app.use(express.static('public'));

// API endpoint to read and return user data
app.get('/api/users', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Could not read user data' });
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
