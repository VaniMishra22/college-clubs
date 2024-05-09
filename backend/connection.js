const mongoose = require('mongoose');

const url = "mongodb+srv://vanimishra22:Vani2911@cluster0.q04sghl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// asynchronous function
mongoose.connect(url)
.then((result) => {
    console.log('connected to db');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;