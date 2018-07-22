import mongoose from 'mongoose';
let mlab = '';
export default () => {
    if (process.env.PORT) {
        mongoose.connect(mlab);
    } else {
        mongoose.connect('mongodb://localhost:27017/Ajlun', {useNewUrlParser: true});
    }
};
