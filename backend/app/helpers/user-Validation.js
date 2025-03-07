const User = require('../models/user-model')

const usernameSchema = {
    notEmpty : {
        errorMessage : 'username is required'
    },
    isLength : {
        options : {min:4, max:28},
        errorMessage : 'password should be between 8 - 28 characters'
        
    },
    custom : {
        options : async(value) => {
            const user = await User.findOne({ username : value })
            if(user){
                throw new Error('Username Already exist')
            }else{
                return true
            }
        }   
    }
}

const emailRegisterSchema = {
    isEmail : {
        errorMessage : 'invalid email format'
    },
    notEmpty : {
        errorMessage : 'EMail is Required'
    },
    custom : {
        options : async(value) => {
            const user = await User.findOne({email : value})
            if( user ){
                throw new Error('email already used')
            }else {
                return true
            }
        }
    }
}

const emailLoginSchema = {
    notEmpty :{
        errorMessage : 'email is required'
    },
    isEmail : {
        errorMessage : 'invalid email'
    }
}


const passwordSchema = {
    notEmpty : {
        errorMessage: 'Password is required'
    },
    isLength : {
        options : { min:8, max:128 },
        errorMessage : 'Password should be between 8-128 charecters'
    }
}

const userRegisterSchema = {
    username : usernameSchema,
    email : emailRegisterSchema,
    password : passwordSchema
}

const userLoginSchema = {
    username : {
        notEmpty : {
            errorMessage : 'name is required'
        }
    },
    password : passwordSchema

}

module.exports = {
    userRegisterSchema,
    userLoginSchema
}