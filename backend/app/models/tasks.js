const mongoose = require('mongoose')
const {Schema, model} = mongoose

const taskSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    important : {
        type : Boolean,
        default : false
    },
    complete : {
        type : Boolean,
        default : false
    }
},{timestamps:true})

const Task = model('Task',taskSchema)

module.exports = Task