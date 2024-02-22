import { IBusiness } from "../typings/business";
import { filterArrays, objectOmit, objectPick } from "../helpers";

type businessType =
  | "general_grocery_kiryana"
  | "electronics_hardware"
  | "car_bike_workshop"
  | "building_taameer"
  | "fashion_jewelry_garments"
  | "mobile_load_computer"
  | "medical_pharmacy"
  | "other_business";

export const CBFS_INITIAL_DATA = {
  contactNumber: "",
  businessRole: "admin",
  business: "",
  fullName: "",
  email: "",
  businessName: "",
  businessType: "partnership",
  businessAddress: "",
  ntn: "",
  partnerCnic: [],
  partnershipDeed: [],
  incorporationCertificate: [],
  authorityLetter: [],
};

export const BusinessType = {
  partnership: {
    partnerCnic: [],
    partnershipDeed: [],
    incorporationCertificate: [],
    authorityLetter: [],
  },
  company: {
    directorsResolution: [],
    memorandumArticlesAssociation: [],
    boardMemberCnic: [],
    pocCnic: [],
    beneficialOwnerCnic: [],
  },
  soleProprietorship: {
    cnicFront: [],
    cnicBack: [],
    proprietorshipDeclaration: [],
    ntnCertificate: [],
    bankStatement: [],
  },
};

export const BUSINESS_TYPE = [
  {
    name: "Partnership",
    value: "partnership",
  },
  {
    name: "Company",
    value: "company",
  },
  {
    name: "Sole Proprietorship",
    value: "soleProprietorship",
  },
  /*{
		name: 'General Grocery Kiryana',
		value: 'general_grocery_kiryana'
	},
	{
		name: 'Electronics Hardware',
		value: 'electronics_hardware'
	},
	{
		name: 'Car Bike Workshop',
		value: 'car_bike_workshop'
	},
	{
		name: 'Building Taameer',
		value: 'building_taameer'
	},
	{
		name: 'Fashion Jewelry Garments',
		value: 'fashion_jewelry_garments'
	},
	{
		name: 'Mobile Load Computer',
		value: 'mobile_load_computer'
	},
	{
		name: 'Medical Pharmacy',
		value: 'medical_pharmacy'
	},
	{
		name: 'Other Business',
		value: 'other_business'
	}*/
];

export const TRANSACTION_METHOD = [
  { value: "bank_transfer", label: "Bank Transfer" },
];

export const getRegistrationFormInitialData = (data: IBusiness) => {
  return {
    ...data.user.personalDetails,
    email: data.user.email,
    contactNumber: data.kyb.contactNumber.replace("+92", ""),
    ...objectPick(data.kyb, "businessAddress", "ntn"),
    ...objectOmit(filterArrays(data.kyb), "statuses"),
  };
};
