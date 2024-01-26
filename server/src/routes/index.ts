import express from 'express'
import AuthRouter from './auth.route'
import UserRouter from './user.router'

const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/user', UserRouter)

export default router
