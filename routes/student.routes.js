const express = require('express')
const router = express.Router()
const {
  getAllStudents,
  addStudent,
  updateStudent,
  getById,
  deleteStudent,
  getByUserId
} = require('../controllers/student-controller')

//Blog Routes
router.get('/', getAllStudents)
router.post('/add', addStudent)
router.put('/update/:id', updateStudent)
router.get('/:id', getById)
router.delete('/:id', deleteStudent)
router.get('/user/:id', getByUserId)

module.exports = router
