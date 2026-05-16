// Business Rule Engine — runs on the server only.
// Returns a list of rejection reasons. Empty array = passed.
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
function getAgeInYears(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate()))
        age--;
    return age;
}
export function runBRE(input) {
    const reasons = [];
    const age = getAgeInYears(new Date(input.dob));
    if (age < 23 || age > 50) {
        reasons.push(`Age must be between 23 and 50 (yours: ${age})`);
    }
    if (input.monthlySalary < 25000) {
        reasons.push(`Monthly salary must be at least ₹25,000 (yours: ₹${input.monthlySalary})`);
    }
    if (!PAN_REGEX.test(input.pan.toUpperCase())) {
        reasons.push("PAN does not match the valid format (e.g. ABCDE1234F)");
    }
    if (input.employmentMode === "Unemployed") {
        reasons.push("Unemployed applicants are not eligible for a loan");
    }
    return { passed: reasons.length === 0, reasons };
}
// Loan math — Simple Interest
// SI = (P × R × T) / (365 × 100)  where R = 12, T = tenure in days
export function calculateLoan(principal, tenureDays, rate = 12) {
    const si = (principal * rate * tenureDays) / (365 * 100);
    const totalRepayment = principal + si;
    return {
        simpleInterest: Math.round(si * 100) / 100,
        totalRepayment: Math.round(totalRepayment * 100) / 100,
    };
}
//# sourceMappingURL=bre.js.map