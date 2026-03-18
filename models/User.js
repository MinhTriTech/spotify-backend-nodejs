import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true
        },
        email: { 
            type: String, 
            required: true
        },
        password: { 
            type: String, 
            required: false
        },
        googleId: {
            type: String,
            default: null
        }
    }, 
    { timestamps: true }
);

export default mongoose.model("User", userSchema);