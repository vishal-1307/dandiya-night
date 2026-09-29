'use client';

import React, { useState } from 'react';
import { RegistrationFormData } from '@/lib/types';
import { validateEmail, validatePhone, formatPhone } from '@/lib/registration';
import { User, Users, HeartHandshake, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function RegistrationForm({ onSuccess }: { onSuccess: (id: string, name: string, type: string) => void }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<RegistrationFormData>({
    type: 'Individual',
    fullName: '',
    email: '',
    phone: '',
    city: 'Madhubani',
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
    foodPreference: 'Veg',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    consentAccurate: false,
    consentRules: false,
    consentCommunication: true,
    consentPhotography: true,
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
    <div className="max-w-3xl mx-auto bg-[#180816]/95 border border-[#d4a017]/35 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.85)] text-amber-50 backdrop-blur-xl overflow-hidden">
      {/* Progress Indicator */}
      <div className="bg-black/35 p-4 sm:p-6 border-b border-[#d4a017]/20">
        <div className="relative flex items-center justify-between max-w-xl mx-auto">
          {[1, 2, 3, 4, 5].map((num) => {
            const isCompleted = step > num;
            const isCurrent = step === num;
            return (
              <div key={num} className="flex flex-col items-center relative z-10">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]' 
                    : isCurrent 
                    ? 'bg-[#f5bd4e] text-[#38112f] ring-4 ring-[#f5bd4e]/25 shadow-[0_0_15px_rgba(245,189,78,0.5)]' 
                    : 'bg-[#280d23] text-zinc-400 border border-zinc-700'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-white" /> : num}
                </div>
                <span className={`hidden sm:block text-[11px] mt-2 font-mono uppercase tracking-wider ${
                  isCurrent ? 'text-[#f5bd4e] font-bold' : isCompleted ? 'text-emerald-400' : 'text-zinc-500'
                }`}>
                  {num === 1 ? 'Type' : num === 2 ? 'Details' : num === 3 ? 'Prefs' : num === 4 ? 'Contact' : 'Confirm'}
                </span>
              </div>
            );
          })}
          <div className="absolute top-4 sm:top-4 left-6 right-6 h-0.5 bg-zinc-800 -z-0 hidden sm:block">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 via-[#f5bd4e] to-[#d4a017] transition-all duration-300 shadow-[0_0_8px_rgba(245,189,78,0.5)]" 
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono block mb-1">Step 1 of 5</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcf4e5]">Select Registration Type</h2>
              <p className="text-zinc-400 text-sm mt-1">Choose the pass option that matches your attendance.</p>
            </div>

            {errors.type && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.type}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { 
                  id: 'Individual', 
                  title: 'Individual', 
                  sub: 'Single entry pass with lightweight Dandiya sticks', 
                  price: '₹199', 
                  badge: 'Standard',
                  icon: <User className="w-8 h-8 text-[#f5bd4e]" /> 
                },
                { 
                  id: 'Couple', 
                  title: 'Couple', 
                  sub: 'Entry pass for two + Contest entry eligibility', 
                  price: '₹349', 
                  badge: 'Popular',
                  icon: <HeartHandshake className="w-8 h-8 text-rose-400" /> 
                },
                { 
                  id: 'Group', 
                  title: 'Group', 
                  sub: '4 or more members with reserved group dance access', 
                  price: '₹799', 
                  badge: 'Best Value',
                  icon: <Users className="w-8 h-8 text-amber-300" /> 
                },
              ].map((type) => {
                const isSelected = formData.type === type.id;
                return (
                  <div 
                    key={type.id}
                    onClick={() => setFormData(prev => ({ ...prev, type: type.id as any }))}
                    className={`cursor-pointer rounded-2xl p-6 text-center transition-all border-2 relative flex flex-col justify-between ${
                      isSelected 
                        ? 'border-[#f5bd4e] bg-gradient-to-b from-[#2e1029] to-[#200a1c] shadow-[0_0_25px_rgba(245,189,78,0.25)] ring-2 ring-[#f5bd4e]/40 transform -translate-y-1' 
                        : 'border-zinc-800 bg-[#1e0a1b]/60 hover:border-zinc-700 hover:bg-[#1e0a1b]'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#f5bd4e] text-[#38112f] font-bold' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {type.badge}
                      </span>
                    </div>

                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-black/30 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                        {type.icon}
                      </div>
                      <h3 className="font-serif font-bold text-xl text-[#fcf4e5] mb-1">{type.title}</h3>
                      <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{type.sub}</p>
                    </div>

                    <div>
                      <span className="inline-block px-4 py-1.5 bg-[#f5bd4e]/15 text-[#f5bd4e] font-mono font-bold text-base rounded-full border border-[#f5bd4e]/30">
                        {type.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono block mb-1">Step 2 of 5</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcf4e5]">Personal Information</h2>
              <p className="text-zinc-400 text-sm mt-1">Lead registrant details for digital pass generation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="reg_fullName" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Full Name *</label>
                <input 
                  type="text" 
                  id="reg_fullName"
                  name="fullName" 
                  autoComplete="name"
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="e.g. Pooja Mishra"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
                {errors.fullName && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="reg_email" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Email Address *</label>
                <input 
                  type="email" 
                  id="reg_email"
                  name="email" 
                  autoComplete="email"
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="e.g. pooja@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
                {errors.email && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="reg_phone" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  id="reg_phone"
                  name="phone" 
                  autoComplete="tel"
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="10-digit mobile number" 
                  maxLength={10} 
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
                {errors.phone && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="reg_city" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">City *</label>
                <input 
                  type="text" 
                  id="reg_city"
                  name="city" 
                  autoComplete="address-level2"
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder="Madhubani, Darbhanga, Patna..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
                {errors.city && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="reg_age" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Age</label>
                <input 
                  type="number" 
                  id="reg_age"
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange} 
                  placeholder="e.g. 24"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
              </div>

              <div>
                <label htmlFor="reg_gender" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Gender</label>
                <select 
                  id="reg_gender"
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] transition-all"
                >
                  <option value="" className="bg-[#180816]">Select Gender...</option>
                  <option value="Male" className="bg-[#180816]">Male</option>
                  <option value="Female" className="bg-[#180816]">Female</option>
                  <option value="Other" className="bg-[#180816]">Other</option>
                  <option value="Prefer not to say" className="bg-[#180816]">Prefer not to say</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="reg_instagram" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Instagram Handle (Optional)</label>
                <input 
                  type="text" 
                  id="reg_instagram"
                  name="instagram" 
                  value={formData.instagram} 
                  onChange={handleChange} 
                  placeholder="@your_handle (for photo tag & contest notice)" 
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
              </div>
            </div>

            {formData.type === 'Couple' && (
              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h3 className="text-xl font-serif font-bold text-[#f5bd4e] mb-4 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-rose-400" /> Partner Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="reg_partnerName" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Partner Full Name *</label>
                    <input 
                      type="text" 
                      id="reg_partnerName"
                      name="partnerName" 
                      value={formData.partnerName} 
                      onChange={handleChange} 
                      placeholder="e.g. Rohan Verma"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                    {errors.partnerName && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.partnerName}</p>}
                  </div>
                  <div>
                    <label htmlFor="reg_partnerPhone" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Partner Phone Number *</label>
                    <input 
                      type="tel" 
                      id="reg_partnerPhone"
                      name="partnerPhone" 
                      value={formData.partnerPhone} 
                      onChange={handleChange} 
                      placeholder="10-digit mobile number" 
                      maxLength={10} 
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                    {errors.partnerPhone && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.partnerPhone}</p>}
                  </div>
                </div>
              </div>
            )}

            {formData.type === 'Group' && (
              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h3 className="text-xl font-serif font-bold text-[#f5bd4e] mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-300" /> Group Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label htmlFor="reg_groupName" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Group / Squad Name *</label>
                    <input 
                      type="text" 
                      id="reg_groupName"
                      name="groupName" 
                      value={formData.groupName} 
                      onChange={handleChange} 
                      placeholder="e.g. Mithila Dancers Squad"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                    {errors.groupName && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.groupName}</p>}
                  </div>
                  <div>
                    <label htmlFor="reg_groupSize" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Total Squad Members (Min 4) *</label>
                    <input 
                      type="number" 
                      id="reg_groupSize"
                      name="groupSize" 
                      value={formData.groupSize} 
                      onChange={handleGroupSizeChange} 
                      min={4} 
                      placeholder="Minimum 4"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                    {errors.groupSize && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.groupSize}</p>}
                  </div>
                </div>
                
                {formData.members && formData.members.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-xs font-mono uppercase tracking-wider text-zinc-300">Member Names</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {formData.members.map((member, index) => (
                        <div key={index}>
                          <input 
                            type="text" 
                            id={`reg_member_${index}`}
                            name={`member_${index}`}
                            value={member.name} 
                            onChange={(e) => handleMemberChange(index, e.target.value)} 
                            placeholder={`Member #${index + 2} Full Name`}
                            className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                          />
                          {errors[`member_${index}`] && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors[`member_${index}`]}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono block mb-1">Step 3 of 5</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcf4e5]">Participation Preferences</h2>
              <p className="text-zinc-400 text-sm mt-1">Help us tailor your celebration experience.</p>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center p-4 border border-zinc-800 rounded-2xl cursor-pointer bg-[#200c1e]/60 hover:bg-[#200c1e] hover:border-[#f5bd4e]/40 transition-colors">
                <input 
                  type="checkbox" 
                  name="dandiyaParticipation" 
                  checked={formData.dandiyaParticipation} 
                  onChange={handleChange} 
                  className="w-5 h-5 accent-[#f5bd4e] rounded" 
                />
                <span className="ml-3.5 font-medium text-amber-100">I will participate on the main Dandiya &amp; Garba dance floor</span>
              </label>

              <label className="flex items-center p-4 border border-zinc-800 rounded-2xl cursor-pointer bg-[#200c1e]/60 hover:bg-[#200c1e] hover:border-[#f5bd4e]/40 transition-colors">
                <input 
                  type="checkbox" 
                  name="competitionInterest" 
                  checked={formData.competitionInterest} 
                  onChange={handleChange} 
                  className="w-5 h-5 accent-[#f5bd4e] rounded" 
                />
                <span className="ml-3.5 font-medium text-amber-100">I am interested in competing for the Best Dandiya / Best Dressed prizes</span>
              </label>

              <div className="pt-4">
                <label htmlFor="reg_costumeTheme" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Costume Theme / Planned Attire (Optional)</label>
                <input 
                  type="text" 
                  id="reg_costumeTheme"
                  name="costumeTheme" 
                  value={formData.costumeTheme} 
                  onChange={handleChange} 
                  placeholder="e.g. Traditional Chaniya Choli, Royal Mithila Kurta"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
              </div>

              <div className="pt-2">
                <label htmlFor="reg_foodPreference" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Food Stall Preference</label>
                <select 
                  id="reg_foodPreference"
                  name="foodPreference" 
                  value={formData.foodPreference} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] transition-all"
                >
                  <option value="Veg" className="bg-[#180816]">Vegetarian Festival Chaats &amp; Delicacies</option>
                  <option value="Non-Veg" className="bg-[#180816]">Non-Vegetarian</option>
                  <option value="No Preference" className="bg-[#180816]">No Specific Preference</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono block mb-1">Step 4 of 5</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcf4e5]">Emergency Contact (Optional)</h2>
              <p className="text-zinc-400 text-sm mt-1">Recommended for rapid assistance if needed during the event.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="reg_emergencyName" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Contact Name</label>
                <input 
                  type="text" 
                  id="reg_emergencyName"
                  name="emergencyName" 
                  autoComplete="name"
                  value={formData.emergencyName} 
                  onChange={handleChange} 
                  placeholder="e.g. Ramesh Mishra"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
              </div>
              <div>
                <label htmlFor="reg_emergencyPhone" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Contact Mobile Number</label>
                <input 
                  type="tel" 
                  id="reg_emergencyPhone"
                  name="emergencyPhone" 
                  autoComplete="tel"
                  value={formData.emergencyPhone} 
                  onChange={handleChange} 
                  maxLength={10} 
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="reg_emergencyRelation" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Relationship</label>
                <select 
                  id="reg_emergencyRelation"
                  name="emergencyRelation" 
                  value={formData.emergencyRelation} 
                  onChange={handleChange} 
                  className="w-full md:w-1/2 px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] transition-all"
                >
                  <option value="" className="bg-[#180816]">Select Relationship...</option>
                  <option value="Parent" className="bg-[#180816]">Parent</option>
                  <option value="Spouse" className="bg-[#180816]">Spouse</option>
                  <option value="Sibling" className="bg-[#180816]">Sibling</option>
                  <option value="Friend" className="bg-[#180816]">Friend</option>
                  <option value="Other" className="bg-[#180816]">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono block mb-1">Step 5 of 5</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcf4e5]">Consent &amp; Confirmation</h2>
              <p className="text-zinc-400 text-sm mt-1">Review your summary and confirm your digital pass reservation.</p>
            </div>
            
            {/* Registration Summary Card */}
            <div className="bg-gradient-to-br from-[#2a0e23] via-[#1c0717] to-[#120410] p-6 rounded-2xl mb-6 border border-[#f5bd4e]/40 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                <span className="font-serif font-bold text-lg text-amber-100">Booking Summary</span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#f5bd4e]/20 text-[#f5bd4e] font-mono font-bold border border-[#f5bd4e]/30">
                  Mithila Dandiya Utsav 2026
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-zinc-400">Pass Category:</div>
                <div className="font-semibold text-amber-200">{formData.type} Pass</div>
                <div className="text-zinc-400">Lead Attendee:</div>
                <div className="font-semibold text-zinc-100">{formData.fullName}</div>
                <div className="text-zinc-400">Contact:</div>
                <div className="font-mono text-zinc-200">{formData.phone} • {formData.email}</div>
                <div className="text-zinc-400">City:</div>
                <div className="text-zinc-200">{formData.city}</div>
                <div className="text-zinc-400">Entry Fee:</div>
                <div className="font-bold font-mono text-xl text-[#f5bd4e]">
                  {formData.type === 'Individual' ? '₹199' : formData.type === 'Couple' ? '₹349' : '₹799'}
                </div>
                <div className="text-zinc-400">Payment Collection:</div>
                <div className="text-xs text-emerald-300 font-semibold bg-emerald-950/60 p-2 rounded-lg border border-emerald-500/30">
                  Pay at Entry Gate Counter via UPI or Cash
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              <label className="flex items-start cursor-pointer">
                <input 
                  type="checkbox" 
                  name="consentAccurate" 
                  checked={formData.consentAccurate} 
                  onChange={handleChange} 
                  className="mt-1 w-5 h-5 accent-[#f5bd4e] rounded" 
                />
                <span className="ml-3 text-sm text-zinc-300">I confirm that all the personal and contact information provided above is accurate. *</span>
              </label>
              {errors.consentAccurate && <p className="text-rose-400 text-xs ml-8 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.consentAccurate}</p>}

              <label className="flex items-start cursor-pointer">
                <input 
                  type="checkbox" 
                  name="consentRules" 
                  checked={formData.consentRules} 
                  onChange={handleChange} 
                  className="mt-1 w-5 h-5 accent-[#f5bd4e] rounded" 
                />
                <span className="ml-3 text-sm text-zinc-300">I agree to abide by the event rules, cultural guidelines, and safety terms. *</span>
              </label>
              {errors.consentRules && <p className="text-rose-400 text-xs ml-8 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.consentRules}</p>}

              <label className="flex items-start cursor-pointer">
                <input 
                  type="checkbox" 
                  name="consentCommunication" 
                  checked={formData.consentCommunication} 
                  onChange={handleChange} 
                  className="mt-1 w-5 h-5 accent-[#f5bd4e] rounded" 
                />
                <span className="ml-3 text-sm text-zinc-400">I consent to receive pass updates and schedule alerts via WhatsApp &amp; SMS.</span>
              </label>

              <label className="flex items-start cursor-pointer">
                <input 
                  type="checkbox" 
                  name="consentPhotography" 
                  checked={formData.consentPhotography} 
                  onChange={handleChange} 
                  className="mt-1 w-5 h-5 accent-[#f5bd4e] rounded" 
                />
                <span className="ml-3 text-sm text-zinc-400">I acknowledge that photography/videography will take place at the venue.</span>
              </label>
            </div>

            {errors.submit && (
              <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
                <span>{errors.submit}</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-zinc-800 flex justify-between items-center">
          <button 
            type="button" 
            onClick={prevStep}
            disabled={step === 1 || isLoading}
            className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              step === 1 ? 'opacity-0 pointer-events-none' : 'text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:text-white bg-[#220c20]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          {step < totalSteps ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="px-8 py-3.5 bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] hover:brightness-110 text-[#38112f] font-bold rounded-xl shadow-[0_4px_20px_rgba(245,189,78,0.3)] transition-all flex items-center gap-2 transform hover:scale-[1.02]"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-9 py-3.5 bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] hover:brightness-110 text-[#38112f] font-bold rounded-xl shadow-[0_4px_25px_rgba(245,189,78,0.4)] transition-all flex items-center gap-2.5 transform hover:scale-[1.02] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-[#38112f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Pass...
                </span>
              ) : (
                <>
                  <span>Confirm &amp; Get Digital Pass</span>
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
