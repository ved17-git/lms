import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "sales", "sanction", "disbursement", "collection", "borrower"],
        default: "borrower"
    }
});
export const User = mongoose.model('User', userSchema);
//# sourceMappingURL=UserModel.js.map