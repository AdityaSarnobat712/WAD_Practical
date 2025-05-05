const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Add a new employee
router.post('/add', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).send(employee);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all employees
router.get('/all', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update employee by ID
router.put('/update/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(employee);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete employee by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.send({ message: "Employee deleted" });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
