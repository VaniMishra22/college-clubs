const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    title: { type: String, require: true },
    description: { type: String },
    createdBy: { type: Types.ObjectId, ref: 'user' },
    club: { type: Types.ObjectId, ref: 'club' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('announcement', mySchema);