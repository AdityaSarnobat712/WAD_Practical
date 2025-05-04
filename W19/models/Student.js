const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSDBA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number
});

module.exports = mongoose.model('Student', studentSchema);
