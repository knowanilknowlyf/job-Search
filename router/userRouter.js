import Router from 'express'
import { getAppStat, getCurrentUser, updateUser } from '../controller/userController.js'
import { validateUpdateUser } from '../middleware/validationMiddleware.js'
import { authorizePermission } from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'
const router = Router()

router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats', [
    authorizePermission('admin'),
    getAppStat
])
router.patch('/update-user', upload.single('avatar'),validateUpdateUser, updateUser)

export default router