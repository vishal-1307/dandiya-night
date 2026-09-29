export interface MemberData {
  name: string;
}

export interface RegistrationFormData {
  // Step 1
  type: 'Individual' | 'Couple' | 'Group' | '';
  // Step 2
  fullName: string;
  email: string;
  phone: string;
  city: string;
  age?: number | '';
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say' | '';
  instagram?: string;
  // Couple
  partnerName?: string;
  partnerPhone?: string;
  // Group
  groupName?: string;
  groupSize?: number | '';
  members?: MemberData[];
  // Step 3
  dandiyaParticipation: boolean;
  competitionInterest: boolean;
  costumeTheme?: string;
  foodPreference: 'Veg' | 'Non-Veg' | 'No Preference' | '';
  // Step 4
  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelation?: 'Parent' | 'Spouse' | 'Sibling' | 'Friend' | 'Other' | '';
  // Step 5
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
}
