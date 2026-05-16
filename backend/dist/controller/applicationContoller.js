import { Application } from "../models/ApplicationModel.js";
import { runBRE } from "../utils/bre.js";
export const submitPersonalDetails = async (req, res) => {
    try {
        const { fullName, pan, dob, monthlySalary, employmentMode } = req.body;
        if (!fullName || !pan || !dob || !monthlySalary || !employmentMode) {
            res.status(400).json({ success: false, message: "All personal detail fields are required" });
            return;
        }
        // BRE runs on server  never trust client-side checks
        const breResult = runBRE({
            dob: new Date(dob),
            monthlySalary: Number(monthlySalary),
            pan: pan.toUpperCase(),
            employmentMode,
        });
        // Upsert: borrower may re-submit if they want to correct details before salary slip upload
        const application = await Application.findOneAndUpdate({ userId: req.user.id }, {
            userId: req.user.id,
            fullName,
            pan: pan.toUpperCase(),
            dob: new Date(dob),
            monthlySalary: Number(monthlySalary),
            employmentMode,
            breStatus: breResult.passed ? "passed" : "failed",
            breRejectionReasons: breResult.reasons,
            // Reset salary slip on re-submission
            salarySlipUrl: null,
            salarySlipMime: null,
        }, { upsert: true, new: true, runValidators: true });
        if (!breResult.passed) {
            res.status(422).json({
                success: false,
                message: "Application rejected by eligibility check",
                reasons: breResult.reasons,
                application,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Personal details saved. Proceed to upload salary slip.",
            application,
        });
    }
    catch (err) {
        if (err.code === 11000) {
            res.status(409).json({ success: false, message: "PAN already used in another application" });
            return;
        }
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
export const uploadSalarySlip = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }
        const application = await Application.findOne({ userId: req.user.id });
        if (!application) {
            res.status(404).json({ success: false, message: "Submit personal details first" });
            return;
        }
        if (application.breStatus === "failed") {
            res.status(403).json({ success: false, message: "BRE check failed — cannot proceed" });
            return;
        }
        application.salarySlipUrl = req.file.path; // multer saves file path here
        application.salarySlipMime = req.file.mimetype;
        await application.save();
        res.status(200).json({
            success: true,
            message: "Salary slip uploaded. Proceed to configure loan.",
            salarySlipUrl: application.salarySlipUrl,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
// GET /api/application/me
// Borrower fetches their own application
export const getMyApplication = async (req, res) => {
    try {
        const application = await Application.findOne({ userId: req.user.id });
        if (!application) {
            res.status(404).json({ success: false, message: "No application found" });
            return;
        }
        res.status(200).json({ success: true, application });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};
//# sourceMappingURL=applicationContoller.js.map