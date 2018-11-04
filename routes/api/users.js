const express = require('express')
const router = express.Router()
const passport = require('passport')

const userController = require('../../controllers/userController')

/* 
@route  :: POST /api/users/register
@desc   :: Signup User - check if email exists ,encrypt the password, save in Mongo
@access :: Public
*/
router.post('/register', userController.register)


/* 
@route  :: POST /api/users/login
@desc   :: Login User / Returning JWT Token
@access :: Public
*/
router.post('/login', userController.login)


/* 
@route  :: GET /api/users/current
@desc   :: Return current user
@access :: Private
*/
router.get('/current', passport.authenticate('jwt', {session: false }) ,userController.getCurrentUser)

module.exports = router;