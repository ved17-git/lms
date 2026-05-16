interface BREInput {
    dob: Date;
    monthlySalary: number;
    pan: string;
    employmentMode: string;
}
export declare function runBRE(input: BREInput): {
    passed: boolean;
    reasons: string[];
};
export declare function calculateLoan(principal: number, tenureDays: number, rate?: number): {
    simpleInterest: number;
    totalRepayment: number;
};
export {};
//# sourceMappingURL=bre.d.ts.map