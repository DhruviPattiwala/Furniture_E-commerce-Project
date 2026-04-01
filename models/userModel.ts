import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String },
    role: { type: String, default: 'user' }
},
{ timestamps: true });

export const userModel = mongoose.models.Users || mongoose.model("Users", userSchema);