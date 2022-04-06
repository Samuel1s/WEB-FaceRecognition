import mongoose from 'mongoose'

const validateEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password: String,
    userImage: { 
        type : Array, 
        "default" : [] 
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    },
    versionKey: false
})

const UsersModel = mongoose.model('Users', schema)

export default UsersModel