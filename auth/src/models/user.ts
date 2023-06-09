import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttrs {
    email: string,
    password: string;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

// Type checking before a user document is created. Only for Typescript
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    next();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


// const user =  User.build({
//     email: 'gvpinto@gmail.com',
//     password: 'asdfasdfas'
// });


// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs);
// };

// export { User, buildUser };

export { User };