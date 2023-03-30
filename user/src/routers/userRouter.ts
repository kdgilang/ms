import { Router } from 'express'
const { checkSchema } = require('express-validator');
import addUserController from '../controllers/addUserController'
import validateUserController from '../controllers/validateUserController'
import addUserValidation from '../validations/addUserValidation'
import baseUserValidation from '../validations/baseUserValidation'

const router = Router()

router.post('/', checkSchema(addUserValidation), addUserController)

router.post('/validate', checkSchema(baseUserValidation), validateUserController)

export default router