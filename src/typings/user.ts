import { IPartnerSnapshot } from "./common";

export type SMEBusinessType =
  | "partnership"
  | "soleProprietorship"
  | "company"
  | "none";

export interface ISMEUser {
  _id: string;
  id?: string;
  personalDetails: {
    fullName: string;
    gender?: string;
    city?: string;
    contactNumber?: string;
    businessName?: string;
    businessType?: SMEBusinessType;
    designation?: string;
  };

  email: string;
  password?: string;
  emailVerified: boolean;
  referralCode?: string;

  partner?: IPartnerSnapshot;

  created_at?: string;
  updated_at?: string;
}
