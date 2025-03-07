const e = require('express')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const authenticateUser = (req,res,next) => {
    try {    
        let token = req.headers['authorization']
        if( !token ){
            return res.status(401).json({errors : 'Authentication Failed'})
        } 
        const tokenD = jwt.verify(token,process.env.JWT_SECRET)
        req.user = tokenD
        next()
    } catch (error) {
        res.status(401).json(e)
    }

}

module.exports = {authenticateUser}