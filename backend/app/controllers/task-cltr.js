const Task = require('../models/tasks')
const _ = require('lodash')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user-model')


const taskCltr = {}

// Fetch user allTasks

taskCltr.get = async(req,res) => {    
    try {
        const tasks = await User.findById({_id: req.user.id}).populate({
            path : 'tasks',
            options : { sort : { createdAt : -1 } }
        })
        res.json(tasks)
    } catch (e) {
       res.status(500).json(e.message) 
    }
}

// fetch Imp task

taskCltr.impTask = async (req,res) => {
    try {
        const tasks = await User.findById(req.user.id).populate({
            path: 'tasks',
            match : { important:true },
            options : { sort : {createdAt:-1} }
        })
        const impTasks = tasks.tasks
        if(impTasks.length > 0){
            res.json({data:impTasks})
        }else{
            res.status(400).json({ message : 'Not Found' })
        }
    } catch (e) {
        res.status(500).json(e.message)
    }
}

// fetch compeleted tasks 
taskCltr.completedTask = async (req,res) => {
    try {
        const tasks = await User.findById(req.user.id).populate({
            path: 'tasks',
            match : { complete :true },
            options : { sort : {createdAt:-1} }
        })
        const impTasks = tasks.tasks
        if(impTasks.length > 0){
            res.json({data:impTasks})
        }else{
            res.status(400).json({ message : 'Not Found' })
        }
    } catch (e) {
        res.status(500).json({message : 'Internal Server Error'})
    }
}

// Inc
taskCltr.inCompletedTask = async (req,res) => {
    try {
        const tasks = await User.findById(req.user.id).populate({
            path: 'tasks',
            match : { complete:false },
            options : { sort : {createdAt:-1} }
        })
        const impTasks = tasks.tasks
        if(impTasks.length > 0){
            res.json({data:impTasks})
        }else{
            res.status(400).json({ message : 'Not Found' })
        }
    } catch (e) {
        res.status(500).json({message : 'Internal Server Error'})
    }
}

// Create tAsks

taskCltr.create = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ errors : errors.array() })

    const body = _.pick(req.body,['title', 'desc'])
    try {
        const newTask = new Task(body)
        const saveTask = await newTask.save( )
        await User.findOneAndUpdate({_id:req.user.id},{$push:{ tasks : saveTask._id }})
        res.json(saveTask)
    } catch (e) {
        console.log(e)
        res.status(500).json({message : 'Internal Server Error'})
    }
}

// TasksUpdate

taskCltr.update = async(req,res) => {
    const {id} = req.params
    const{title,desc} = req.body
    try {
        const task = await Task.findByIdAndUpdate(id,{ title , desc },{new : true})
        res.json(task)
    } catch (e) {
        res.status(500).json({message : 'Internal Server Error'})

    }
}

// Update to Imp
taskCltr.updateImp = async(req,res) => {
    const {id} = req.params
    try {
    const taskD = await Task.findById(id)
    const impTask = taskD.important
    const updateImpTask = await Task.findByIdAndUpdate(id,{important:!impTask},{new : true})
    res.json(updateImpTask)
    } catch (e) {
        res.status(400).json('Internal Server Error')
    }
}

// toggele complete falg

taskCltr.updateComplete = async(req,res) => {
    const {id} = req.params
    try {
    const taskD = await Task.findById(id)
    console.log(taskD)
    const completeTask = taskD.complete
    const updateTask = await Task.findByIdAndUpdate(id,{complete: !completeTask},{new : true})
    res.json(updateTask)
    } catch (e) {
        res.status(500).json(e.message)
    }
}

// For delete
taskCltr.destroy = async(req,res) => {
    const {id} = req.params;
    try {
        await Task.findByIdAndDelete(id)
        await User.findByIdAndUpdate(req.user.id,{ $pull : { tasks : id  } })
        res.json({message:'Task Deleted'})
        
    } catch (e) {
        res.status(500).json(e.message)
    }
}

module.exports = taskCltr