const { default: mongoose } = require('mongoose')
const Student = require('../model/student.model')
const Mentor = require('../model/mentor.model')

exports.getAllStudents = async (req, res, next) => {
  let student
  try {
    student = await Student.find().populate('mentor')
  } catch (error) {
    return console.log(error)
  }
  if (!student) {
    return res.status(404).send({ message: 'No Student Found' })
  }
  return res.status(200).send({ student })
}

exports.addStudent = async (req, res, next) => {
  const { name, rollNo, department, email, mentor } = req.body
  let existingUser
  try {
    existingUser = await Mentor.findById(mentor)
  } catch (error) {
    return console.log(error)
  }
  if (!existingUser) {
    return res
      .status(400)
      .send({ message: 'Unable to Find Student by This Id' })
  }
  const student = new Student({
    name,
    rollNo,
    department,
    email,
    mentor
  })
  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await student.save({ session })
    existingUser.student.push(student)
    await existingUser.save({ session })
    await session.commitTransaction()
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
  return res.status(200).send({ student })
}

exports.updateStudent = async (req, res, next) => {
  const { name, rollNo, department, email } = req.body
  const studentId = req.params.id
  let student
  try {
    student = await Student.findByIdAndUpdate(studentId, {
      name,
      rollNo,
      department,
      email
    })
  } catch (error) {
    return console.log(error)
  }
  if (!student) {
    return res.status(500).send({ message: 'Unable to Update Student Record' })
  }
  return res.status(200).send({ student })
}

exports.getById = async (req, res, next) => {
  const id = req.params.id
  let student
  try {
    student = await Student.findById(id)
  } catch (error) {
    return console.log(error)
  }
  if (!student) {
    return res.status(404).send({ message: 'No Student Found' })
  }
  return res.status(200).send({ student })
}

exports.deleteStudent = async (req, res, next) => {
  const id = req.params.id
  let student
  try {
    student = await Student.findByIdAndRemove(id).populate('mentor')
    await student.user.students.pull(student)
    await student.user.save()
  } catch (error) {
    return console.log(error)
  }
  if (!student) {
    return res.status(500).send({ message: 'Unable to Delete' })
  }
  return res.status(200).send({ message: 'Deleted Successfully' })
}

exports.getByUserId = async (req, res, next) => {
  const userId = req.params.id
  let mentorStudent
  try {
    mentorStudent = await Mentor.findById(userId).populate('student')
  } catch (error) {
    return console.log(error)
  }
  if (!mentorStudent) {
    return res.status(404).send({ message: 'No Student Found' })
  }
  return res.status(200).send({ mentor: mentorStudent })
}
