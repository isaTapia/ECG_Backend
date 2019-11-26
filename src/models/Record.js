const {Schema, model} = require("mongoose");

const recordSchema = Schema ({
        record_id:String,
        user_id:String,
        from: Date,
        to: Date,
        content: Array
    } 

);

module.exports = model("Record", recordSchema)