import Joi from 'joi';
import { InvalidBody } from '../errors.creator';
import { SECRET } from '../development';
import fs from 'fs';
import User from '../auth/models/user.model';
const changeAvatar = async (req, res) => {
    let filename = req.user.avatar.replace('/static/img/avatars/', '');
    let imgPath = __dirname + '../../../public/img/avatars/';
    try {
        if (!req.files || !req.files.avatar)
            return res.send({ next: false, code: 'InvalidData' });
        let avatar = req.files.avatar;
        fs.unlinkSync(imgPath + filename);
        fs.writeFileSync(
            imgPath +
                filename.replace(/\.\w+$/, avatar.name.match(/\.\w+$/)[0]),
            avatar.data
        );
        const user = await User.findByIdAndUpdate(
            { _id: req.user._id },
            {
                avatar:
                    '/static/img/avatars/' +
                    filename.replace(/\.\w+$/, avatar.name.match(/\.\w+$/)[0])
            }
        );
        res.send({ next: true, filename });
    } catch (error) {
        console.log(error);
        res.send({ next: false, error });
    }
};
export { changeAvatar };
