const express = require('express')
const router = express.Router()
const {checkSchema, } = require('express-validator')
const userCltr = require('../app/controllers/user-cltr')
const { userLoginSchema, userRegisterSchema } = require('../app/helpers/user-Validation')


router.post('/users/register',checkSchema(userRegisterSchema),userCltr.register)
router.post('/users/login',checkSchema(userLoginSchema),userCltr.login)


module.exports = router