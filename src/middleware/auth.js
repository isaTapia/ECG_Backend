const jwt = require('jsonwebtoken')
const User = require('../models/Patient')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, 'shhhhh')
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send('Not authorized to access this resource')
    }
}
module.exports = auth
