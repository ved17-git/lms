import type { Response } from "express";
import type { AuthRequest } from "../utils/middleware.js";
export declare const applyLoan: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getMyLoans: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getSalesLeads: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getPendingLoans: (req: AuthRequest, res: Response) => Promise<void>;
export declare const sanctionLoan: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getSanctionedLoans: (req: AuthRequest, res: Response) => Promise<void>;
export declare const disburseLoan: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getDisbursedLoans: (req: AuthRequest, res: Response) => Promise<void>;
export declare const recordPayment: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getLoanById: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=loanController.d.ts.map