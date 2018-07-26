import mongoose from 'mongoose';
import MBUV from 'mongoose-beautiful-unique-validation';
// const jdenticon = require("jdenticon");
var identicon = require('identicon');
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
        default: () => Math.floor(Math.random() * 99999999).toString().substr(0,4)
    }
});
UserSchema.pre('save', function (next) {
    const make_id = () => {
        let text = '';
        const possible = this._id.toString();
        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    let id = make_id();
    console.log(id);
    let png = identicon.generateSync({ id: id, size: 200 });
    fs.writeFileSync(`${__dirname}/../../../public/img/avatars/${id}.png`, png);
    this.avatar = '/static/img/avatars/' + id + '.png';
    next()
});
UserSchema.plugin(MBUV);
const User = mongoose.model('User', UserSchema);
export default User;

