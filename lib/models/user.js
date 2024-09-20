import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(0\d{10}|\d{10})$/.test(v);
            },
            message: "Phone number must be 10 digits, or 11 digits if starting with 0",
        },
    },
    age: {
        type: Number,
        required: true,
        min: 1,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                const validEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
                const emailRegex = new RegExp(`^[a-zA-Z0-9._-]+@(${validEmailDomains.join('|')})$`);
                return emailRegex.test(v);
            },
            message: "Please enter a valid email address from a renowned provider",
        },
    },
    guardianEmail: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const validEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
                const emailRegex = new RegExp(`^[a-zA-Z0-9._-]+@(${validEmailDomains.join('|')})$`);
                return emailRegex.test(v);
            },
            message: "Please enter a valid guardian email address",
        },
    },
    guardianPhone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(0\d{10}|\d{10})$/.test(v);
            },
            message: "Guardian phone number must be 10 digits, or 11 digits if starting with 0",
        },
    },
    password: {
        type: String,
        required: true,
    },
});

// Export the model or use the existing one
export default mongoose.models.User || mongoose.model("User", UserSchema);
