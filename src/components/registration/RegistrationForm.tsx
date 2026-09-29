'use client';
import React, { useState } from 'react';
import { RegistrationFormData } from '@/lib/types';
import { validateEmail, validatePhone, formatPhone } from '@/lib/registration';

export default function RegistrationForm({ onSuccess }: { onSuccess: (id: string, name: string, type: string) => void }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<RegistrationFormData>({
    type: '',
    fullName: '',
    email: '',
    phone: '',
    city: '',
    age: '',
    gender: '',
    instagram: '',
    partnerName: '',
    partnerPhone: '',
    groupName: '',
    groupSize: '',
    members: [],
    dandiyaParticipation: true,
    competitionInterest: false,
    costumeTheme: '',
    foodPreference: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    consentAccurate: false,
    consentRules: false,
    consentCommunication: false,
    consentPhotography: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'phone' || name === 'partnerPhone' || name === 'emergencyPhone') {
      const formatted = formatPhone(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMemberChange = (index: number, name: string) => {
    const newMembers = [...(formData.members || [])];
    newMembers[index] = { name };
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value) || '';
    setFormData(prev => {
      const newMembers = [...(prev.members || [])];
      if (typeof size === 'number') {
        while (newMembers.length < size) newMembers.push({ name: '' });
        if (newMembers.length > size) newMembers.length = size;
      }
      return { ...prev, groupSize: size, members: newMembers };
    });
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.type) newErrors.type = 'Please select a registration type';
    } else if (step === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim() || !validateEmail(formData.email)) newErrors.email = 'Valid email is required';
      if (!formData.phone.trim() || !validatePhone(formData.phone)) newErrors.phone = 'Valid 10-digit phone number is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      
      if (formData.type === 'Couple') {
        if (!formData.partnerName?.trim()) newErrors.partnerName = 'Partner name is required';
        if (!formData.partnerPhone?.trim() || !validatePhone(formData.partnerPhone)) newErrors.partnerPhone = 'Valid 10-digit phone number is required';
      }
      
      if (formData.type === 'Group') {
        if (!formData.groupName?.trim()) newErrors.groupName = 'Group name is required';
        if (!formData.groupSize || formData.groupSize < 4) newErrors.groupSize = 'Group size must be at least 4';
        
        formData.members?.forEach((m, i) => {
          if (!m.name.trim()) newErrors[`member_${i}`] = 'Member name is required';
        });
      }
    } else if (step === 5) {
      if (!formData.consentAccurate) newErrors.consentAccurate = 'You must confirm the information is accurate';
      if (!formData.consentRules) newErrors.consentRules = 'You must agree to the event rules';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    setErrors({});
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        type: formData.type.toUpperCase(),
        age: formData.age ? String(formData.age) : undefined,
        gender: formData.gender,
        instagramHandle: formData.instagram,
        groupName: formData.groupName,
        totalMembers: formData.type === 'Couple' ? 2 : (formData.members?.length ? formData.members.length + 1 : 1),
        members: formData.type === 'Couple' && formData.partnerName ? [
          { fullName: formData.partnerName, phone: formData.partnerPhone }
        ] : (formData.members?.map(m => ({ fullName: m.name })) || []),
        dandiyaParticipation: formData.dandiyaParticipation,
        competitionInterest: formData.competitionInterest,
        costumeTheme: formData.costumeTheme,
        foodPreference: formData.foodPreference,
        emergencyName: formData.emergencyName,
        emergencyPhone: formData.emergencyPhone,
        emergencyRelation: formData.emergencyRelation,
        rulesAgreed: formData.consentRules,
        communicationConsent: formData.consentCommunication,
        photoVideoConsent: formData.consentPhotography,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        setErrors({ submit: result.error || 'Failed to submit registration. Please try again.' });
        return;
      }

      const regId = result.registration?.registrationId || 'DN-CONFIRMED';
      onSuccess(regId, formData.fullName, formData.type);
    } catch (error) {
      setErrors({ submit: 'Failed to connect to registration server. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Progress Indicator */}
      <div className="bg-gray-50 p-4 sm:p-6 border-b border-gray-200">
        <div className="relative flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step > num ? 'bg-green-500 text-white' : 
                step === num ? 'bg-yellow-500 text-white ring-4 ring-yellow-100' : 
                'bg-gray-200 text-gray-500'
              }`}>
                {step > num ? '✓' : num}
              </div>
              <span className="hidden sm:block text-xs mt-2 font-medium text-gray-500">
                {num === 1 ? 'Type' : num === 2 ? 'Details' : num === 3 ? 'Prefs' : num === 4 ? 'Contact' : 'Confirm'}
              </span>
            </div>
          ))}
          <div className="absolute top-8 sm:top-10 left-8 right-8 h-0.5 bg-gray-200 -z-0 hidden sm:block">
            <div 
              className="h-full bg-yellow-500 transition-all duration-300" 
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Select Registration Type</h2>
            {errors.type && <p className="text-red-500 text-center">{errors.type}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'Individual', title: 'Individual', sub: 'Single entry pass', price: '₹199', icon: '👤' },
                { id: 'Couple', title: 'Couple', sub: 'Entry pass for two', price: '₹349', icon: '👥' },
                { id: 'Group', title: 'Group', sub: '4 or more members', price: '₹799', icon: '👨‍👩‍👧‍👦' },
              ].map((type) => (
                <div 
                  key={type.id}
                  onClick={() => setFormData(prev => ({ ...prev, type: type.id as any }))}
                  className={`cursor-pointer rounded-xl p-6 text-center transition-all border-2 relative ${
                    formData.type === type.id 
                      ? 'border-[#d4a017] bg-amber-50/70 shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-[#d4a017]/40 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900">{type.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{type.sub}</p>
                  <span className="inline-block px-3 py-1 bg-[#8b1a3f]/10 text-[#8b1a3f] font-bold text-sm rounded-full border border-[#8b1a3f]/20">
                    {type.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10 digits" maxLength={10} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white">
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Handle</label>
                <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@username" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
              </div>
            </div>

            {formData.type === 'Couple' && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Partner Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
                    <input type="text" name="partnerName" value={formData.partnerName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    {errors.partnerName && <p className="text-red-500 text-xs mt-1">{errors.partnerName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partner Phone *</label>
                    <input type="tel" name="partnerPhone" value={formData.partnerPhone} onChange={handleChange} maxLength={10} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    {errors.partnerPhone && <p className="text-red-500 text-xs mt-1">{errors.partnerPhone}</p>}
                  </div>
                </div>
              </div>
            )}

            {formData.type === 'Group' && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Group Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Name *</label>
                    <input type="text" name="groupName" value={formData.groupName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    {errors.groupName && <p className="text-red-500 text-xs mt-1">{errors.groupName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Members (Min 4) *</label>
                    <input type="number" name="groupSize" value={formData.groupSize} onChange={handleGroupSizeChange} min={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    {errors.groupSize && <p className="text-red-500 text-xs mt-1">{errors.groupSize}</p>}
                  </div>
                </div>
                
                {formData.members && formData.members.length > 0 && (
                  <div className="space-y-4">
                    <p className="font-medium text-gray-700">Member Names</p>
                    {formData.members.map((member, index) => (
                      <div key={index}>
                        <input 
                          type="text" 
                          value={member.name} 
                          onChange={(e) => handleMemberChange(index, e.target.value)} 
                          placeholder={`Member ${index + 1} Name`}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                        {errors[`member_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`member_${index}`]}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Participation Preferences</h2>
            
            <div className="space-y-4">
              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" name="dandiyaParticipation" checked={formData.dandiyaParticipation} onChange={handleChange} className="w-5 h-5 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500" />
                <span className="ml-3 font-medium text-gray-900">I will participate in Dandiya</span>
              </label>

              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" name="competitionInterest" checked={formData.competitionInterest} onChange={handleChange} className="w-5 h-5 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500" />
                <span className="ml-3 font-medium text-gray-900">I am interested in participating in the competition</span>
              </label>

              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Costume Theme (Optional)</label>
                <input type="text" name="costumeTheme" value={formData.costumeTheme} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
              </div>

              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Preference</label>
                <select name="foodPreference" value={formData.foodPreference} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white">
                  <option value="">Select...</option>
                  <option value="Veg">Vegetarian</option>
                  <option value="Non-Veg">Non-Vegetarian</option>
                  <option value="No Preference">No Preference</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contact (Optional)</h2>
            <p className="text-gray-500 mb-6">We recommend providing an emergency contact in case of any unforeseen situations during the event.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} maxLength={10} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <select name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white">
                  <option value="">Select...</option>
                  <option value="Parent">Parent</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Consent & Confirmation</h2>
            
            <div className="bg-amber-50/50 p-6 rounded-xl mb-6 border border-[#d4a017]/30 text-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-base flex items-center justify-between">
                <span>Registration Summary</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#8b1a3f]/10 text-[#8b1a3f] font-semibold">
                  Mithila Dandiya Utsav 2026
                </span>
              </h3>
              <div className="grid grid-cols-2 gap-y-2.5">
                <div className="text-gray-500">Category:</div>
                <div className="font-medium text-gray-900">{formData.type} Pass</div>
                <div className="text-gray-500">Lead Attendee:</div>
                <div className="font-medium text-gray-900">{formData.fullName}</div>
                <div className="text-gray-500">Email:</div>
                <div className="font-medium text-gray-900">{formData.email}</div>
                <div className="text-gray-500">Phone:</div>
                <div className="font-medium text-gray-900">{formData.phone}</div>
                <div className="text-gray-500">Total Entry Fee:</div>
                <div className="font-bold text-lg text-[#8b1a3f]">
                  {formData.type === 'Individual' ? '₹199' : formData.type === 'Couple' ? '₹349' : '₹799'}
                </div>
                <div className="text-gray-500">Payment Collection:</div>
                <div className="text-xs text-emerald-800 font-medium bg-emerald-50 p-1.5 rounded border border-emerald-200">
                  Pay at Entry Gate Counter via UPI or Cash
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start">
                <input type="checkbox" name="consentAccurate" checked={formData.consentAccurate} onChange={handleChange} className="mt-1 w-5 h-5 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500" />
                <span className="ml-3 text-sm text-gray-700">I confirm that all the information provided above is accurate and complete. *</span>
              </label>
              {errors.consentAccurate && <p className="text-red-500 text-xs ml-8">{errors.consentAccurate}</p>}

              <label className="flex items-start">
                <input type="checkbox" name="consentRules" checked={formData.consentRules} onChange={handleChange} className="mt-1 w-5 h-5 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500" />
                <span className="ml-3 text-sm text-gray-700">I agree to abide by the event rules, guidelines, and terms of service. *</span>
              </label>
              {errors.consentRules && <p className="text-red-500 text-xs ml-8">{errors.consentRules}</p>}

              <label className="flex items-start">
                <input type="checkbox" name="consentCommunication" checked={formData.consentCommunication} onChange={handleChange} className="mt-1 w-5 h-5 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500" />
                <span className="ml-3 text-sm text-gray-700">I consent to receive event-related communications via email and SMS.</span>
              </label>

              <label className="flex items-start">
                <input type="checkbox" name="consentPhotography" checked={formData.consentPhotography} onChange={handleChange} className="mt-1 w-5 h-5 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500" />
                <span className="ml-3 text-sm text-gray-700">I acknowledge that photography and videography will occur at the event and consent to my image being used for promotional purposes.</span>
              </label>
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {errors.submit}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between">
          <button 
            type="button" 
            onClick={prevStep}
            disabled={step === 1 || isLoading}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              step === 1 ? 'opacity-0 cursor-default' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Back
          </button>
          
          {step < totalSteps ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="px-8 py-2 bg-red-900 hover:bg-red-800 text-white rounded-lg font-semibold transition-colors"
            >
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors flex items-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : 'Submit Registration'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
