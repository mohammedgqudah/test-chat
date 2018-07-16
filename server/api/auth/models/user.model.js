import mongoose from 'mongoose';
import MBUV from 'mongoose-beautiful-unique-validation';
const jdenticon = require("jdenticon");
import fs from 'fs';
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 20,
        required: [true, 'You must provide a user name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'You must provide a password']
    },
    email: {
        type: String,
        unique: true
    },
    avatar: {
        type: String
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    tag: {
        type: Number,
        default: () => Math.floor(Math.random() * 9999)
    }
});
UserSchema.pre('save', function (next) {
    const ID = () => {
        let text = '';
        const possible = "_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    let id = ID();
    let png = jdenticon.toPng(this._id.toString(), 200);
    fs.writeFileSync(`${__dirname}/../../../public/img/${id}.png`, png);
    this.avatar = '/static/img/' + id + '.png';
    next()
});
UserSchema.plugin(MBUV);
const User = mongoose.model('User', UserSchema);
export default User;

