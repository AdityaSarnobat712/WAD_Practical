const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/Student');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Aditya:aditya123@cluster0.6e9xkxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Insert initial data once
const seedStudents = async () => {
  await Student.deleteMany(); 
  await Student.insertMany([
    { Name: 'Aditya', Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSDBA_Marks: 25, CNS_Marks: 25, AI_Marks: 25 },
    { Name: 'Vedant', Roll_No: 112, WAD_Marks: 18, CC_Marks: 30, DSDBA_Marks: 22, CNS_Marks: 15, AI_Marks: 19 },
    { Name: 'Sourav', Roll_No: 113, WAD_Marks: 29, CC_Marks: 29, DSDBA_Marks: 28, CNS_Marks: 29, AI_Marks: 30 },
    { Name: 'Adarsh', Roll_No: 114, WAD_Marks: 12, CC_Marks: 22, DSDBA_Marks: 15, CNS_Marks: 38, AI_Marks: 34 }
  ]);
  console.log("Seed data inserted.");
};

seedStudents();

// (d) Display all students and total count
app.get('/', async (req, res) => {
  const students = await Student.find();
  const count = await Student.countDocuments();
  res.render('index', { students, count });
});

// (e) Students with >20 in DSDBA
app.get('/dsdba', async (req, res) => {
  const students = await Student.find({ DSDBA_Marks: { $gt: 20 } }, 'Name');
  res.send(students);
});

// (f) Update marks of specific student
app.post('/update/:roll', async (req, res) => {
  const roll = parseInt(req.params.roll);
  await Student.updateOne({ Roll_No: roll }, { $inc: {
    WAD_Marks: 10,
    CC_Marks: 10,
    DSDBA_Marks: 10,
    CNS_Marks: 10,
    AI_Marks: 10
  }});
  res.send(`Marks updated for Roll No: ${roll}`);
});

// (g) Students with >25 in all
app.get('/allabove25', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSDBA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  }, 'Name');
  res.send(students);
});

// (h) Students with <40 in both WAD and CNS
app.get('/less40', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 }
  }, 'Name');
  res.send(students);
});

// (i) Remove student by roll number
app.delete('/delete/:roll', async (req, res) => {
  const roll = parseInt(req.params.roll);
  await Student.deleteOne({ Roll_No: roll });
  res.send(`Deleted student with Roll No: ${roll}`);
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

/*
View all: http://localhost:3000/

DSDBA > 20: http://localhost:3000/dsdba

All >25: http://localhost:3000/allabove25

WAD & CNS < 40: http://localhost:3000/less40

Update: POST /update/:roll (e.g., use Postman or frontend form)

Delete: DELETE /delete/:roll
*/