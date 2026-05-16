import mongoose from "mongoose";
export declare const Application: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    fullName: string;
    pan: string;
    dob: NativeDate;
    monthlySalary: number;
    employmentMode: "Salaried" | "Self-Employed" | "Unemployed";
    breStatus: "passed" | "failed";
    breRejectionReasons: string[];
    salarySlipUrl?: string | null | undefined;
    salarySlipMime?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    pan: string;
    dob: NativeDate;
    monthlySalary: number;
    employmentMode: "Salaried" | "Self-Employed" | "Unemployed";
    breStatus: "passed" | "failed";
    breRejectionReasons: string[];
    salarySlipUrl?: string | null | undefined;
    salarySlipMime?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    fullName: string;
    pan: string;
    dob: NativeDate;
    monthlySalary: number;
    employmentMode: "Salaried" | "Self-Employed" | "Unemployed";
    breStatus: "passed" | "failed";
    breRejectionReasons: string[];
    salarySlipUrl?: string | null | undefined;
    salarySlipMime?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    pan: string;
    dob: NativeDate;
    monthlySalary: number;
    employmentMode: "Salaried" | "Self-Employed" | "Unemployed";
    breStatus: "passed" | "failed";
    breRejectionReasons: string[];
    salarySlipUrl?: string | null | undefined;
    salarySlipMime?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    pan: string;
    dob: NativeDate;
    monthlySalary: number;
    employmentMode: "Salaried" | "Self-Employed" | "Unemployed";
    breStatus: "passed" | "failed";
    breRejectionReasons: string[];
    salarySlipUrl?: string | null | undefined;
    salarySlipMime?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    fullName: string;
    pan: string;
    dob: NativeDate;
    monthlySalary: number;
    employmentMode: "Salaried" | "Self-Employed" | "Unemployed";
    breStatus: "passed" | "failed";
    breRejectionReasons: string[];
    salarySlipUrl?: string | null | undefined;
    salarySlipMime?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    pan: string;
    dob: NativeDate;
    monthlySalary: number;
    employmentMode: "Salaried" | "Self-Employed" | "Unemployed";
    breStatus: "passed" | "failed";
    breRejectionReasons: string[];
    salarySlipUrl?: string | null | undefined;
    salarySlipMime?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    pan: string;
    dob: NativeDate;
    monthlySalary: number;
    employmentMode: "Salaried" | "Self-Employed" | "Unemployed";
    breStatus: "passed" | "failed";
    breRejectionReasons: string[];
    salarySlipUrl?: string | null | undefined;
    salarySlipMime?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=ApplicationModel.d.ts.map