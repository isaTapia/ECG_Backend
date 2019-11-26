const express = require("express");
const cors = require('cors');
const app = express();
// settings
app.set('port', process.env.PORT || 4000); 
// middlewares
app.use(cors());
app.use(express.json());
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
