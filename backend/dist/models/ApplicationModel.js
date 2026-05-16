import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // one application per borrower
    },
    // Step 2 — Personal Details
    fullName: { type: String, required: true, trim: true },
    pan: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"],
    },
    dob: { type: Date, required: true },
    monthlySalary: { type: Number, required: true },
    employmentMode: {
        type: String,
        enum: ["Salaried", "Self-Employed", "Unemployed"],
        required: true,
    },
    // BRE outcome stored so we don't re-run on every request
    breStatus: {
        type: String,
        enum: ["passed", "failed"],
        required: true,
    },
    breRejectionReasons: {
        type: [String],
        default: [],
    },
    // Step 3 — Salary Slip
    salarySlipUrl: { type: String, default: null }, // path/url after upload
    salarySlipMime: { type: String, default: null }, // mime type for validation record
}, { timestamps: true });
export const Application = mongoose.model("Application", applicationSchema);
//# sourceMappingURL=ApplicationModel.js.map