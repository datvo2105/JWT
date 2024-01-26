import { Router } from 'express'
import { updateOne, readAll, deleteOne } from '@/controllers/user.controller'
import { authenticated, vertifyPermission } from '@/middlewares/auth.middleware'

const router = Router()

router.use(authenticated)

router.get('/', readAll)
router.patch('/:id', vertifyPermission, updateOne)
router.delete('/:id', vertifyPermission, deleteOne)

export default router
