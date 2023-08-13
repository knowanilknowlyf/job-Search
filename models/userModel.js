import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'tiwari'
    },
    location: {
        type: String,
        default: 'my_city',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar:String,
    avatarPublicId:String
},
    { timestamps: true }
)

userSchema.methods.toJSON=function () {
    let obj = this.toObject()
    delete obj.password
    return obj
}
export default mongoose.model('User', userSchema);
