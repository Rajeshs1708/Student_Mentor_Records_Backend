const express = require('express')
const router = express.Router()
const {
  getAllMentor,
  addMentor,
  updateMentor,
  getById,
  deleteMentor,
  getByUserId
} = require('../controllers/mentor-controller')

router.get('/', getAllMentor)
router.post('/add', addMentor)
router.put('/update/:id', updateMentor)
router.get('/:id', getById)
router.delete('/:id', deleteMentor)
router.get('/user/:id', getByUserId)

module.exports = router
