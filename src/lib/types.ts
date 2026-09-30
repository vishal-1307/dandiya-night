export interface MemberData {
  name: string;
}

export type RegistrationType = 
  | 'Jhijhiya 108'
  | 'Dandiya Single'
  | 'Dandiya Couple'
  | 'Individual'
  | 'Couple'
  | 'Group'
  | '';

export interface RegistrationFormData {
  // Step 1: Type Selection
  type: RegistrationType;

  // Step 2: Personal Information
  fullName: string;
  phone: string;
  email?: string; // Required for Jhijhiya, removed for Dandiya
  address?: string; // Added for Dandiya
  city: string;
  age?: number | '';
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say' | '';
  instagram?: string;

  // Special Fields for 108 Girls Jhijhiya Performance
  fatherName?: string;
  dob?: string;
  schoolCollegeName?: string;
  classCourse?: string;
  parentPhone?: string;
  fullAddress?: string;
  district?: string;

  // Couple Info
  partnerName?: string;
  partnerPhone?: string;

  // Consents & Confirmation
  consentAccurate: boolean;
  consentRules: boolean;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
}

export interface DigitalPassData {
  registrationId: string;
  name: string;
  type: string;
  date: string;
  venue: string;
  feeAmount?: number;
  phone?: string;
  address?: string;
  schoolCollegeName?: string;
  fatherName?: string;
  partnerName?: string;
  partnerPhone?: string;
}
