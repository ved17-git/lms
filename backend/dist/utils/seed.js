import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/UserModel.js";
import 'dotenv/config';
const seeds = [
    { firstName: "Admin", lastName: "User", email: "admin@lms.com", role: "admin", password: "Admin@123" },
    { firstName: "Sales", lastName: "Exec", email: "sales@lms.com", role: "sales", password: "Sales@123" },
    { firstName: "Sanction", lastName: "Exec", email: "sanction@lms.com", role: "sanction", password: "Sanction@123" },
    { firstName: "Disburse", lastName: "Exec", email: "disburse@lms.com", role: "disbursement", password: "Disburse@123" },
    { firstName: "Collection", lastName: "Exec", email: "collection@lms.com", role: "collection", password: "Collection@123" },
    { firstName: "Test", lastName: "Borrower", email: "borrower@lms.com", role: "borrower", password: "Borrower@123" },
];
async function seed() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    for (const s of seeds) {
        const exists = await User.findOne({ email: s.email });
        if (exists) {
            console.log(`  ⏭  ${s.role} already exists — skipping`);
            continue;
        }
        const hashed = await bcrypt.hash(s.password, 12);
        await User.create({ ...s, password: hashed });
        console.log(`   Created ${s.role}: ${s.email} / ${s.password}`);
    }
    await mongoose.disconnect();
    console.log("Done.");
}
seed().catch(console.error);
//# sourceMappingURL=seed.js.map