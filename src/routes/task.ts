import express from 'express'

import {
  createTask,
  deleteTask,
  getAllCompletedTasks,
  getAllTasksByUser,
  getAllTodayTasks,
  toggleTask,
  updateTask
} from '../controllers/tasks'
import { authenticateMiddleware } from '../middleware/auth'

const router = express.Router()

router.use(authenticateMiddleware)

router.route('/tasks').get(getAllTasksByUser).post(createTask)

router.route('/tasks/completed').get(getAllCompletedTasks)
router.route('/tasks/today').get(getAllTodayTasks)

router
  .route('/tasks/:taskId')
  .put(updateTask)
  .delete(deleteTask)
  .post(toggleTask)

export default router
