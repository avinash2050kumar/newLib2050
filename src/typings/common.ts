export interface IFile {
  name: string;
  resourceURL: string;
  size: number;
  verified: boolean;
}

export enum ContractStatus {
  CONTRACT_VALID = "contract_valid",
  CONTRACT_EXPIRED = "contract_expired",
  CONTRACT_PENDING = "contract_pending",
}

export enum CustomerStatus {
  IN_PROGRESS = "in_progress",
  APPROVED = "approved",
  REJECTED = "rejected",
  PENDING = "pending",
}

export interface Status {
  status: string;
  timestamp: Date;
  updated_by: string; // user_id of LMS personnel
  reason?: string;
  comment?: string;
}

export interface IFacility {
  id: string;
  envelope_id: string;
  envelope_url: string;
  credit_limit: number;
  markup: number;
  contract_documents: string[];
  contract_details: any;
  signing_date: Date;
  expiry_date: Date;
  status: ContractStatus;
  status_history: Status[];
}

export interface IPartnerSnapshot {
  name: string;
  id: string;
  loan_id?: string;
}

export interface ICreditBureauReport extends Record<string, unknown> {
  _id: string;
  keys: string[];
}
