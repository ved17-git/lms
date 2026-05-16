import mongoose from "mongoose";
export declare const Loan: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    applicationId: mongoose.Types.ObjectId;
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
    simpleInterest: number;
    totalRepayment: number;
    status: "applied" | "sanctioned" | "rejected" | "disbursed" | "closed";
    payments: mongoose.Types.DocumentArray<{
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }>;
    totalPaid: number;
    sanctionedBy?: mongoose.Types.ObjectId | null | undefined;
    sanctionedAt?: NativeDate | null | undefined;
    rejectedBy?: mongoose.Types.ObjectId | null | undefined;
    rejectedAt?: NativeDate | null | undefined;
    rejectionReason?: string | null | undefined;
    disbursedBy?: mongoose.Types.ObjectId | null | undefined;
    disbursedAt?: NativeDate | null | undefined;
    closedAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    applicationId: mongoose.Types.ObjectId;
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
    simpleInterest: number;
    totalRepayment: number;
    status: "applied" | "sanctioned" | "rejected" | "disbursed" | "closed";
    payments: mongoose.Types.DocumentArray<{
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }>;
    totalPaid: number;
    sanctionedBy?: mongoose.Types.ObjectId | null | undefined;
    sanctionedAt?: NativeDate | null | undefined;
    rejectedBy?: mongoose.Types.ObjectId | null | undefined;
    rejectedAt?: NativeDate | null | undefined;
    rejectionReason?: string | null | undefined;
    disbursedBy?: mongoose.Types.ObjectId | null | undefined;
    disbursedAt?: NativeDate | null | undefined;
    closedAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    applicationId: mongoose.Types.ObjectId;
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
    simpleInterest: number;
    totalRepayment: number;
    status: "applied" | "sanctioned" | "rejected" | "disbursed" | "closed";
    payments: mongoose.Types.DocumentArray<{
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }>;
    totalPaid: number;
    sanctionedBy?: mongoose.Types.ObjectId | null | undefined;
    sanctionedAt?: NativeDate | null | undefined;
    rejectedBy?: mongoose.Types.ObjectId | null | undefined;
    rejectedAt?: NativeDate | null | undefined;
    rejectionReason?: string | null | undefined;
    disbursedBy?: mongoose.Types.ObjectId | null | undefined;
    disbursedAt?: NativeDate | null | undefined;
    closedAt?: NativeDate | null | undefined;
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
    applicationId: mongoose.Types.ObjectId;
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
    simpleInterest: number;
    totalRepayment: number;
    status: "applied" | "sanctioned" | "rejected" | "disbursed" | "closed";
    payments: mongoose.Types.DocumentArray<{
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }>;
    totalPaid: number;
    sanctionedBy?: mongoose.Types.ObjectId | null | undefined;
    sanctionedAt?: NativeDate | null | undefined;
    rejectedBy?: mongoose.Types.ObjectId | null | undefined;
    rejectedAt?: NativeDate | null | undefined;
    rejectionReason?: string | null | undefined;
    disbursedBy?: mongoose.Types.ObjectId | null | undefined;
    disbursedAt?: NativeDate | null | undefined;
    closedAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    applicationId: mongoose.Types.ObjectId;
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
    simpleInterest: number;
    totalRepayment: number;
    status: "applied" | "sanctioned" | "rejected" | "disbursed" | "closed";
    payments: mongoose.Types.DocumentArray<{
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }>;
    totalPaid: number;
    sanctionedBy?: mongoose.Types.ObjectId | null | undefined;
    sanctionedAt?: NativeDate | null | undefined;
    rejectedBy?: mongoose.Types.ObjectId | null | undefined;
    rejectedAt?: NativeDate | null | undefined;
    rejectionReason?: string | null | undefined;
    disbursedBy?: mongoose.Types.ObjectId | null | undefined;
    disbursedAt?: NativeDate | null | undefined;
    closedAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    applicationId: mongoose.Types.ObjectId;
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
    simpleInterest: number;
    totalRepayment: number;
    status: "applied" | "sanctioned" | "rejected" | "disbursed" | "closed";
    payments: mongoose.Types.DocumentArray<{
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }>;
    totalPaid: number;
    sanctionedBy?: mongoose.Types.ObjectId | null | undefined;
    sanctionedAt?: NativeDate | null | undefined;
    rejectedBy?: mongoose.Types.ObjectId | null | undefined;
    rejectedAt?: NativeDate | null | undefined;
    rejectionReason?: string | null | undefined;
    disbursedBy?: mongoose.Types.ObjectId | null | undefined;
    disbursedAt?: NativeDate | null | undefined;
    closedAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    applicationId: mongoose.Types.ObjectId;
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
    simpleInterest: number;
    totalRepayment: number;
    status: "applied" | "sanctioned" | "rejected" | "disbursed" | "closed";
    payments: mongoose.Types.DocumentArray<{
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }>;
    totalPaid: number;
    sanctionedBy?: mongoose.Types.ObjectId | null | undefined;
    sanctionedAt?: NativeDate | null | undefined;
    rejectedBy?: mongoose.Types.ObjectId | null | undefined;
    rejectedAt?: NativeDate | null | undefined;
    rejectionReason?: string | null | undefined;
    disbursedBy?: mongoose.Types.ObjectId | null | undefined;
    disbursedAt?: NativeDate | null | undefined;
    closedAt?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    applicationId: mongoose.Types.ObjectId;
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
    simpleInterest: number;
    totalRepayment: number;
    status: "applied" | "sanctioned" | "rejected" | "disbursed" | "closed";
    payments: mongoose.Types.DocumentArray<{
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }, {}, {}> & {
        utrNumber: string;
        amount: number;
        paymentDate: NativeDate;
        recordedBy: mongoose.Types.ObjectId;
    }>;
    totalPaid: number;
    sanctionedBy?: mongoose.Types.ObjectId | null | undefined;
    sanctionedAt?: NativeDate | null | undefined;
    rejectedBy?: mongoose.Types.ObjectId | null | undefined;
    rejectedAt?: NativeDate | null | undefined;
    rejectionReason?: string | null | undefined;
    disbursedBy?: mongoose.Types.ObjectId | null | undefined;
    disbursedAt?: NativeDate | null | undefined;
    closedAt?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=LoanMode.d.ts.map