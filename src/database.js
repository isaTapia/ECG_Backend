const mongoose = require('mongoose');
const URI = 'mongodb+srv://User:Hola@cluster0-4hqy1.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is connected');
});
