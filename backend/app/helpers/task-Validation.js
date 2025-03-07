const { options } = require('../../routes/user')
const Task = require('../models/tasks')

const taskValidationSchema = {
    title : {
        notEmpty : {
            errorMessage : 'Title is required'
        }
    },
    desc : {
        notEmpty : {
            errorMessage : 'Description is required'
        }
    }
}

module.exports = {taskValidationSchema}