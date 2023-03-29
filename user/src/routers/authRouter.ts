import { Router } from 'express'
const { checkSchema } = require('express-validator');
import addUserController from '../controllers/addUserController'
import addUserValidation from '../validations/addUserValidation'

const router = Router()

router.post('/', checkSchema(addUserValidation), addUserController)

export default router