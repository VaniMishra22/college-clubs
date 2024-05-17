const { model, Schema } = require('../connection');

const mySchema = new Schema({ 
    name : { type: String, require: true },
    email : { type: String, unique: true },
    password : String,
    avatar: {type : String, default: 'user_avatar.jpg'},
    createdAt : { type: Date, default: Date.now }
});

module.exports = model('user', mySchema);