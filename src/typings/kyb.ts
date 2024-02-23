import {
  CustomerStatus,
  IFacility,
  IFile,
  IPartnerSnapshot,
  Status,
} from "./common";

export type CompanyType = "public_limited_company" | "private_limited_company";

export interface IKyb {
  _id: string;
  id?: string;
  // kyb details
  fullName: string;
  contactNumber: string;
  businessName: string;
  user_id: string;
  businessAddress: string;
  ntn: string;
  status: CustomerStatus;
  statuses?: Status[];
  company_type?: CompanyType;

  // kyb credit limit
  available_credit_limit?: number;
  credit_limit?: number;
  markup?: number;
  proposed_credit_limit?: number;
  proposed_markup?: number;

  // kyb facilities
  facilities: IFacility[];

  // kyb files
  industry?: string;
  product?: string;
  product_codes?: string | string[];
  yearsExperienceProduct?: number;
  partnerCnic?: IFile[];
  partnershipDeed?: IFile[];
  incorporationCertificate?: IFile[];
  authorityLetter?: IFile[];
  directorsResolution?: IFile[];
  memorandumArticlesAssociation?: IFile[];
  boardMemberCnic?: IFile[];
  pocCnic?: IFile[];
  beneficialOwnerCnic?: IFile[];
  cnicFront?: IFile[];
  cnicBack?: IFile[];
  proprietorshipDeclaration?: IFile[];
  ntnCertificate?: IFile[];
  bankStatement?: IFile[];
  financialStatement?: IFile[];
  addendum?: IFile[];
  formAB?: IFile[];
  created_at?: string;
  updated_at?: string;
  verification_checks?: Record<string, unknown>; // TODO: add exact type once verificationData type is finalized
  partner?: IPartnerSnapshot;
  meta?: { assignee?: string; fi_id?: string };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IKybMethods {}

// All the file properties in kyb
export const IFileKeys = [
  "partnerCnic",
  "partnershipDeed",
  "incorporationCertificate",
  "authorityLetter",
  "directorsResolution",
  "memorandumArticlesAssociation",
  "boardMemberCnic",
  "pocCnic",
  "beneficialOwnerCnic",
  "cnicFront",
  "cnicBack",
  "proprietorshipDeclaration",
  "ntnCertificate",
  "bankStatement",
  "otherFiles",
  "pastInvoices",
  "pastPurchaseOrders",
  "formAB",
  "financialStatement",
  "addendum",
];
