const userCtrl = {};
const express = require('express')
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const User = require("../models/Doctor");
const Record = require("../models/Record");


userCtrl.getUsers = async(req,res) =>{
    const users = await User.find();
    res.json(users)
} 


userCtrl.getRecords = async(req,res) =>{
    try{
    const records = await Record.find(req.body);
    res.json(records)
    }
    catch (error) {
        res.status(400).send(error)
    }
} 

userCtrl.createUser = async(req,res) =>{
    try{
    const newUser = new User(req.body);
    await newUser.save();
    const token = await newUser.generateAuthToken()
    res.status(201).send({ newUser, token })
    }
    catch (error) {
        res.status(400).send(error)
    }
}

userCtrl.UserLogin = async(req,res) =>{
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send( {token})
    } catch (error) {
        res.status(400).send(error)
    }

    
}


userCtrl.deleteUser = async(req,res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json("Users Deleted")

}

module.exports = userCtrl;