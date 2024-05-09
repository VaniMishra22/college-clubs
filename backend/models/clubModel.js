const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    moderator: { type: Types.ObjectId, ref: 'user' },
    members: [{ type: Types.ObjectId, ref: 'user' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('club', mySchema);