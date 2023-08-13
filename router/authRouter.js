import Router from 'express'
// import { createNewUser, deleteUser, findOneUser, getAllUsers, updateUser } from '../controller/userController.js'
import { validateLogin, validateUser, validatIdParam } from '../middleware/validationMiddleware.js'
import { login, logout, register } from '../controller/authCotroller.js'
const router = Router()

router.post('/register', validateUser, register)
router.post('/login', validateLogin, login)
router.get('/logout', logout)

export default router