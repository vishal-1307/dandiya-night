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
  email: string;
  phone: string;
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

  // Group Info
  groupName?: string;
  groupSize?: number | '';
  members?: MemberData[];

  // Step 3: Participation Preferences
  dandiyaParticipation: boolean;
  competitionInterest: boolean;
  costumeTheme?: string;
  foodPreference: 'Veg' | 'Non-Veg' | 'No Preference' | '';

  // Step 4: Emergency Contact
  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelation?: 'Parent' | 'Spouse' | 'Sibling' | 'Friend' | 'Other' | '';

  // Step 5: Consents
  consentAccurate: boolean;
  consentRules: boolean;
  consentCommunication: boolean;
  consentPhotography: boolean;
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
}
