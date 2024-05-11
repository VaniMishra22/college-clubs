const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    moderator: { type: Types.ObjectId, ref: 'user' },
    members: [{ type: Types.ObjectId, ref: 'user' }],
    type: String,
    tags: [String],
    cover: {type : String, default: 'club_banner_placeholder.png'},
    icon: {type: String, default: 'club_icon.png'},
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('club', mySchema);