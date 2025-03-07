const User = require('../models/user-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userCltr = {}

userCltr.register = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors : errors.array() })
    const body = _.pick(req.body,['username','email','password'])
    const exitUser = await User.find({username : body.username})
    // if(exitUser.length>0){
    //     return res.status(400).json({ message : 'User Already Existed' })
    // }else if(body.username.length < 3){
    //     return res.status(400).json({ message : 'username should have atleast 4 characters' })
    // }
    try {
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        const hashPass = await bcrypt.hash(user.password, salt)
        user.password = hashPass
        await user.save()
        res.json({
            message : 'User Registered Sucessfully',
            user
        })
    } catch (e) {
        res.status(500).json(e.message) 
    }
}

userCltr.login = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const body = _.pick(req.body,['username','password'] )

    try {
        const user = await User.findOne({ username : body.username })
        if(!user){
            return res.status(400).json({errors : [{ message : 'Invalid UserName/Password' }]})
        }
        const result = await bcrypt.compare(body.password,user.password)
        if(!result){
            return res.status(400).json({ errors : [{ message : 'Invalid UserName/Password' }] })
        }
        const tokenData = { id : user._id }
        const token = jwt.sign(tokenData,process.env.JWT_SECRET)
        res.json({token:token})
    } catch (e) {
        return res.status(500).json({message : e.message})
    }
}

module.exports = userCltr