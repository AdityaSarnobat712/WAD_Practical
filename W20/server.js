const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const Employee = require('./models/employee');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Aditya:aditya123@cluster0.6e9xkxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const seedEmployees = async () => {
    const count = await Employee.countDocuments();
    if (count === 0) {
      await Employee.insertMany([
        {
          name: "Alice Johnson",
          department: "HR",
          designation: "Recruiter",
          salary: 45000,
          joiningDate: new Date("2024-03-15")
        },
        {
          name: "Bob Smith",
          department: "IT",
          designation: "DevOps Engineer",
          salary: 70000,
          joiningDate: new Date("2023-09-01")
        }
      ]);
      console.log("Employees seeded.");
    }
  };
  seedEmployees();
// Default root route
app.get('/', (req, res) => {
    res.send('Welcome to the Employee Management API. Use /api/employees endpoints.');
});

// Employee API routes
app.use('/api/employees', employeeRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
