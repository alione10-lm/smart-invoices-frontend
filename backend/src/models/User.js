import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        min: 2
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String,
        min: [8, 'password must be gte 8'],
        required: [true, 'password is required' ]
    },

    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    }

}, { timestamps: true });


const Users = mongoose.model("Users", userSchema);

export { Users }
export default Users