const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    title: { type: String, require: true },
    description: { type: String },
    club: { type: Types.ObjectId, ref: 'club' },
    createdBy: { type: Types.ObjectId, ref: 'user' },
    date: {type : Date},
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('events', mySchema);