import express from 'express'

import { createUser, getUser } from '../controllers/user'
import categoryRoutes from './category'
import taskRoutes from './task'

const router = express.Router()

router.route('/create').post(createUser)
router.route('/login').post(getUser)

router.use(categoryRoutes)
router.use(taskRoutes)

export default router
