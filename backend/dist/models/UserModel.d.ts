import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "collection" | "admin" | "sales" | "sanction" | "disbursement" | "borrower";
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "collection" | "admin" | "sales" | "sanction" | "disbursement" | "borrower";
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "collection" | "admin" | "sales" | "sanction" | "disbursement" | "borrower";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "collection" | "admin" | "sales" | "sanction" | "disbursement" | "borrower";
}, mongoose.Document<unknown, {}, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "collection" | "admin" | "sales" | "sanction" | "disbursement" | "borrower";
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "collection" | "admin" | "sales" | "sanction" | "disbursement" | "borrower";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "collection" | "admin" | "sales" | "sanction" | "disbursement" | "borrower";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "collection" | "admin" | "sales" | "sanction" | "disbursement" | "borrower";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=UserModel.d.ts.map