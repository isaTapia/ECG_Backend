const userCtrl = {};
const express = require('express')
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const User = require("../models/Patient");
const Record = require("../models/Record");


userCtrl.getUsers = async(req,res) =>{
    const users = await User.find();
    res.json(users)
} 


userCtrl.getRecords = async(req,res) =>{
    try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    const {_id,firstname,lastname,gender,birthday,adress,email,password,tokens} = await User.findOne({ _id: data._id, 'tokens.token': token })
    const records = await Record.find({"user_id":_id});
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
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        const token = await user.generateAuthToken()
        res.send( {token})

    
}


userCtrl.createRecord = async(req,res) =>{
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    const {_id,firstname,lastname,gender,birthday,adress,email,password,tokens} = await User.findOne({ _id: data._id, 'tokens.token': token })
    const {record_id,from,to,content}= req.body;
    const newRecord = new Record({"record_id":record_id,"user_id":_id,"from":from,"to":to,"content":content});
    await newRecord.save();
    res.json(newRecord)
}

userCtrl.deleteUser = async(req,res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json("Users Deleted")

}

module.exports = userCtrl;
