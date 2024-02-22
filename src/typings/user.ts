import { IPartnerSnapshot } from "./common";

export enum SMEBusinessType {
  PARTNERSHIP = "partnership",
  SOLE_PROPRIETORSHIP = "soleProprietorship",
  COMPANY = "company",
  NONE = "none",
}

export interface ISMEUser {
  _id: string;
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

  created_at?: Date;
  updated_at?: Date;
}
