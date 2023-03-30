const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    required: 'Email is mandatory'
  },
  sex: {
    type: String,
    required: true
  },
  specializedSubject: {
    type: String,
    required: true
  },
  student: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Student',
      required: true
    }
  ]
})

module.exports = mongoose.model('Mentor', mentorSchema)
