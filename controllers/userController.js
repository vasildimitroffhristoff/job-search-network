const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const gravatar = require('gravatar')

const User = require('../models/User')
const validateLoginInput = require('../validation/login')
const validateRegisterInput = require('../validation/register')

module.exports = {
    login : (req,res) => { 
        console.log(req,res)
        const { errors, isValid } = validateLoginInput(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
       
        const email = req.body.email
        const password = req.body.password
    
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    errors.email = 'User not found'
                    return res.status(404).json(errors)
                }
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = { id: user.id, name: user.name, avatar: user.avatar }
                            jwt.sign(
                                payload, 
                                keys.secretOrKey, 
                                { expiresIn: 3600 }, 
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    })
                                })
                        } else {
                            errors.password = 'Password incorrect'
                            return res.status(400).json(errors)
                        }
                    })
            })
    },
    register: (req, res) => {

        const { errors, isValid } = validateRegisterInput(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
    
        User.findOne({ email: req.body.email })
            .then(user => {
                if(user) {
                    errors.email = 'Email already exists'
                    return res.status(400).json(errors)
                } else {
                    const avatar = gravatar.url(req.body.email, {  
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    })
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        avatar,
                        password: req.body.password
                    })
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt , (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash
                            newUser.save()
                                .then(user => {
                                    res.json(user)
                                })
                                .catch(err => console.log(err))
                        })
                    })
    
                }
            })
    },
    getCurrentUser: (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar
        })
    }
}