const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({ 
    club : { type: Types.ObjectId, ref: 'club' },
    message : { type: String },
    sender : {type : Types.ObjectId, ref: 'user'},
    createdAt : { type: Date, default: Date.now }
});

module.exports = model('chat', mySchema);