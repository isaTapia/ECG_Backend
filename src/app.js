const express = require("express");
const cors = require('cors');
const app = express();
// settings
app.set('port', process.env.PORT || 4000); 
// middlewares
app.use(cors());
app.use(express.json());
app.use(function(req,res,next){
res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Token");
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, TOKEN");
next();
});
// routes
app.use('/api/patient', require("./routes/patient"));
app.use('/api/patient/register', require("./routes/patient"));
app.use('/api/patient/login', require("./routes/patient"));
app.use('/api/patient/user', require("./routes/patient"));
app.use('/api/doctor', require("./routes/doctor"));
app.use('/api/doctor/register', require("./routes/doctor"));
app.use('/api/doctor/login', require("./routes/doctor"));
app.use('/api/doctor/user', require("./routes/doctor"));
module.exports = app;
