const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{type:String,requireed:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: [String],
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User',UserSchema);