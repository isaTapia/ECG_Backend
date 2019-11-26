const { Router } = require('express');
const router = Router();
const auth = require("../middleware/auth")
const {getUsers, createUser, deleteUser,getRecords,createRecord,UserLogin} = require("../controllers/ctr.doctor")

router.route("/")
   .get(getUsers)

router.route("/register")
    .post(createUser)

router.route("/login")
    .post(UserLogin)

router.get('/user', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.post('/user/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})


router.route("/user/records")
    .get(auth,getRecords)

module.exports = router;
