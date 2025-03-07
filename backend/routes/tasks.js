const router = require('express').Router()
const {checkSchema, } = require('express-validator')
const taskCltr = require('../app/controllers/task-cltr')
const { authenticateUser } = require('../app/middlewares/authentication')
const Task = require('../app/models/tasks')
const { taskValidationSchema } = require('../app/helpers/task-Validation')

// Api End Point
router.get('/myTasks',authenticateUser,taskCltr.get)
router.get('/imp-tasks',authenticateUser,taskCltr.impTask)
router.get('/complete-tasks',authenticateUser,taskCltr.completedTask)
router.get('/incomplete-tasks',authenticateUser,taskCltr.inCompletedTask)
router.post('/create-task',checkSchema(taskValidationSchema),authenticateUser,taskCltr.create)
router.put('/update-task/:id',authenticateUser,taskCltr.update)
router.put('/update-imp-task/:id',authenticateUser,taskCltr.updateImp)
router.put('/update-completeTask/:id',authenticateUser,taskCltr.updateComplete)
router.delete('/delete-task/:id',authenticateUser,taskCltr.destroy)

module.exports = router
