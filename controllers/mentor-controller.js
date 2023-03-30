const { default: mongoose } = require('mongoose')
const Student = require('../model/student.model')
const Mentor = require('../model/mentor.model')

exports.getAllMentor = async (req, res, next) => {
  let mentor
  try {
    mentor = await Mentor.find().populate('student')
  } catch (error) {
    return console.log(error)
  }
  if (!mentor) {
    return res.status(404).send({ message: 'No mentor Found' })
  }
  return res.status(200).send({ mentor })
}

exports.addMentor = async (req, res, next) => {
  const { name, specializedSubject, sex, email, student } = req.body
  let existingUser
  try {
    existingUser = await Mentor.findById(mentor)
  } catch (error) {
    return console.log(error)
  }
  if (!existingUser) {
    return res.status(400).send({ message: 'Unable to Find Menotr by This Id' })
  }
  const mentor = new Mentor({
    name,
    specializedSubject,
    sex,
    email,
    student
  })
  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await mentor.save({ session })
    existingUser.mentor.push(mentor)
    await existingUser.save({ session })
    await session.commitTransaction()
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
  return res.status(200).send({ mentor })
}

exports.updateMentor = async (req, res, next) => {
  const { name, specializedSubject, sex, email } = req.body
  const mentorId = req.params.id
  let mentor
  try {
    mentor = await Mentor.findByIdAndUpdate(mentorId, {
      name,
      specializedSubject,
      sex,
      email
    })
  } catch (error) {
    return console.log(error)
  }
  if (!mentor) {
    return res.status(500).send({ message: 'Unable to Update mentor Record' })
  }
  return res.status(200).send({ mentor })
}

exports.getById = async (req, res, next) => {
  const id = req.params.id
  let mentor
  try {
    mentor = await Mentor.findById(id)
  } catch (error) {
    return console.log(error)
  }
  if (!mentor) {
    return res.status(404).send({ message: 'No Mentor Found' })
  }
  return res.status(200).send({ mentor })
}

exports.deleteMentor = async (req, res, next) => {
  const id = req.params.id
  let mentor
  try {
    mentor = await Mentor.findByIdAndRemove(id).populate('mentor')
    await mentor.user.mentors.pull(mentor)
    await mentor.user.save()
  } catch (error) {
    return console.log(error)
  }
  if (!mentor) {
    return res.status(500).send({ message: 'Unable to Delete' })
  }
  return res.status(200).send({ message: 'Deleted Successfully' })
}

exports.getByUserId = async (req, res, next) => {
  const userId = req.params.id
  let studentMentor
  try {
    studentMentor = await Student.findById(userId).populate('mentor')
  } catch (error) {
    return console.log(error)
  }
  if (!studentMentor) {
    return res.status(404).send({ message: 'No Mentor Found' })
  }
  return res.status(200).send({ mentor: studentMentor })
}
