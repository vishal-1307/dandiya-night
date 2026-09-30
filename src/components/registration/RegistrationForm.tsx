'use client';

import React, { useState } from 'react';
import { RegistrationFormData, RegistrationType } from '@/lib/types';
import { validateEmail, validatePhone, formatPhone } from '@/lib/registration';
import { EVENT_CONFIG } from '@/lib/config';
import { 
  User, 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  School, 
  PhoneCall, 
  Copy, 
  Check, 
  ExternalLink,
  MapPin,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

interface RegistrationFormProps {
  onSuccess: (id: string, name: string, type: string, fullData?: any) => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isLoading, setIsLoading] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<RegistrationFormData>({
    type: 'Jhijhiya 108',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Jhanjharpur',
    age: '',
    gender: 'Female',
    instagram: '',
    fatherName: '',
    dob: '',
    schoolCollegeName: '',
    classCourse: '',
    parentPhone: '',
    fullAddress: '',
    district: 'Madhubani',
    partnerName: '',
    partnerPhone: '',
    consentAccurate: false,
    consentRules: true,
  });

  const getAmount = (type: RegistrationType): number => {
    if (type === 'Jhijhiya 108') return EVENT_CONFIG.pricing.jhijhiya || 149;
    if (type === 'Dandiya Couple' || type === 'Couple') return EVENT_CONFIG.pricing.dandiyaCouple || 399;
    return EVENT_CONFIG.pricing.dandiyaSingle || 249;
  };

  const currentAmount = getAmount(formData.type);

  const copyUpiId = () => {
    navigator.clipboard.writeText(EVENT_CONFIG.payment.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'phone' || name === 'partnerPhone' || name === 'parentPhone') {
      const formatted = formatPhone(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.type) newErrors.type = 'Please select a registration category';
    } else if (step === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.phone.trim() || !validatePhone(formData.phone)) newErrors.phone = 'Valid 10-digit mobile number is required';

      if (formData.type === 'Jhijhiya 108') {
        if (!formData.fatherName?.trim()) newErrors.fatherName = "Father's name is required";
        if (!formData.schoolCollegeName?.trim()) newErrors.schoolCollegeName = 'School / College name is required';
        if (!formData.classCourse?.trim()) newErrors.classCourse = 'Class / Course is required';
        if (!formData.parentPhone?.trim() || !validatePhone(formData.parentPhone)) {
          newErrors.parentPhone = "Valid 10-digit parent's mobile is required";
        }
        if (!formData.email?.trim() || !validateEmail(formData.email)) {
          newErrors.email = 'Valid email is required for Jhijhiya communication';
        }
        if (!formData.fullAddress?.trim()) newErrors.fullAddress = 'Permanent address is required';
      } else if (formData.type === 'Dandiya Couple' || formData.type === 'Couple') {
        if (!formData.address?.trim() && !formData.fullAddress?.trim()) {
          newErrors.address = 'Address is required';
        }
        if (!formData.partnerName?.trim()) newErrors.partnerName = 'Partner full name is required';
        if (!formData.partnerPhone?.trim() || !validatePhone(formData.partnerPhone)) {
          newErrors.partnerPhone = 'Valid 10-digit partner phone is required';
        }
      } else {
        // Dandiya Single
        if (!formData.address?.trim() && !formData.fullAddress?.trim()) {
          newErrors.address = 'Address is required';
        }
      }
    } else if (step === 3) {
      if (!formData.consentAccurate) {
        newErrors.consentAccurate = 'Please confirm that you have scanned the QR / made the payment and will share the screenshot on WhatsApp';
      }
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

  const buildWhatsAppUrl = (regId: string) => {
    const isJhijhiya = formData.type === 'Jhijhiya 108';
    const isCouple = formData.type === 'Dandiya Couple' || formData.type === 'Couple';
    const amount = getAmount(formData.type);

    let text = `🌸 *JHANJHARPUR JHIJHIYA & DANDIYA FEST 2026* 🌸\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🎫 *Pass ID:* ${regId}\n`;
    text += `👤 *Attendee Name:* ${formData.fullName}\n`;
    text += `🏷️ *Category:* ${isJhijhiya ? '108 Girls Jhijhiya Performance' : formData.type}\n`;
    text += `📞 *Mobile:* ${formData.phone}\n`;

    if (isJhijhiya) {
      if (formData.fatherName) text += `👨 *Father's Name:* ${formData.fatherName}\n`;
      if (formData.schoolCollegeName) text += `🏫 *School/College:* ${formData.schoolCollegeName}\n`;
      if (formData.classCourse) text += `📚 *Class/Course:* ${formData.classCourse}\n`;
      if (formData.parentPhone) text += `👨‍👩‍👧 *Parent Mobile:* ${formData.parentPhone}\n`;
      if (formData.email && !formData.email.includes('@fest.in')) text += `📧 *Email:* ${formData.email}\n`;
      if (formData.fullAddress || formData.address) text += `📍 *Address:* ${formData.fullAddress || formData.address}\n`;
    } else if (isCouple) {
      if (formData.partnerName) text += `💑 *Partner Name:* ${formData.partnerName}\n`;
      if (formData.partnerPhone) text += `📞 *Partner Mobile:* ${formData.partnerPhone}\n`;
      if (formData.address || formData.fullAddress) text += `📍 *Address:* ${formData.address || formData.fullAddress}\n`;
    } else {
      if (formData.address || formData.fullAddress) text += `📍 *Address:* ${formData.address || formData.fullAddress}\n`;
    }

    text += `💰 *Registration Fee:* ₹${amount}/-\n`;
    text += `📅 *Date:* 18 October 2026 • 5:00 PM\n`;
    text += `📍 *Venue:* Jhanjharpur, Madhubani\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📸 *Payment Verification:* Maine ₹${amount} ka payment successfully kar diya hai. Kripya mera payment screenshot neeche check karein aur mera Pass verify/confirm karein. Dhanyawad! 🙏`;

    const cleanNumber = EVENT_CONFIG.payment.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    setErrors({});
    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email?.trim() || `${formData.phone.replace(/[^0-9]/g, '')}@fest.in`,
        city: formData.city || 'Jhanjharpur',
        address: formData.address || formData.fullAddress || '',
        fullAddress: formData.fullAddress || formData.address || '',
        type: formData.type,
        age: formData.age ? String(formData.age) : undefined,
        gender: formData.gender,
        instagramHandle: formData.instagram,
        fatherName: formData.fatherName,
        schoolCollegeName: formData.schoolCollegeName,
        classCourse: formData.classCourse,
        parentPhone: formData.parentPhone,
        district: formData.district || 'Madhubani',
        groupName: formData.type === 'Jhijhiya 108' ? (formData.schoolCollegeName || '108 Girls Jhijhiya') : undefined,
        totalMembers: (formData.type === 'Dandiya Couple' || formData.type === 'Couple') ? 2 : 1,
        members: (formData.type === 'Dandiya Couple' || formData.type === 'Couple') && formData.partnerName ? [
          { fullName: formData.partnerName, phone: formData.partnerPhone }
        ] : [],
        dandiyaParticipation: true,
        rulesAgreed: true,
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

      const regId = result.registration?.registrationId || 'DN-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      const waUrl = buildWhatsAppUrl(regId);

      // Open WhatsApp directly for the user
      try {
        window.open(waUrl, '_blank');
      } catch (e) {
        console.warn('Popup blocked, will use button on success screen');
      }

      onSuccess(regId, formData.fullName, formData.type, {
        ...formData,
        registrationId: regId,
        amount: currentAmount,
        waUrl
      });
    } catch {
      setErrors({ submit: 'Failed to connect to registration server. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#180816]/95 border border-[#d4a017]/35 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.85)] text-amber-50 backdrop-blur-xl overflow-hidden">
      {/* 3-Step Progress Indicator */}
      <div className="bg-black/45 p-4 sm:p-6 border-b border-[#d4a017]/20">
        <div className="relative flex items-center justify-between max-w-md mx-auto">
          {[1, 2, 3].map((num) => {
            const isCompleted = step > num;
            const isCurrent = step === num;
            return (
              <div key={num} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]' 
                    : isCurrent 
                    ? 'bg-[#f5bd4e] text-[#38112f] ring-4 ring-[#f5bd4e]/25 shadow-[0_0_15px_rgba(245,189,78,0.5)]' 
                    : 'bg-[#280d23] text-zinc-400 border border-zinc-700'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-white" /> : num}
                </div>
                <span className={`text-[11px] mt-2 font-mono uppercase tracking-wider ${
                  isCurrent ? 'text-[#f5bd4e] font-bold' : isCompleted ? 'text-emerald-400' : 'text-zinc-500'
                }`}>
                  {num === 1 ? 'Category' : num === 2 ? 'Details' : 'Payment'}
                </span>
              </div>
            );
          })}
          <div className="absolute top-5 left-10 right-10 h-0.5 bg-zinc-800 -z-0">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 via-[#f5bd4e] to-[#d4a017] transition-all duration-300 shadow-[0_0_8px_rgba(245,189,78,0.5)]" 
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-10">
        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono block mb-1">Step 1 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcf4e5]">Select Registration Category</h2>
              <p className="text-zinc-400 text-sm mt-1">Choose between the 108 Girls Jhijhiya performance or Dandiya Night entry pass.</p>
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
                  id: 'Jhijhiya 108' as RegistrationType, 
                  title: '108 Girls Jhijhiya', 
                  sub: 'Exclusive folk presentation for school & college girls with Matka/Props & Academy choreography', 
                  price: '₹149', 
                  per: 'per participant',
                  badge: 'Historic Folk',
                  icon: <Sparkles className="w-7 h-7 text-[#f5bd4e]" />,
                  features: ['Dance Choreography', 'Jhijhiya/Matka Prop', 'Practice Guidance', 'Certificate of Honor']
                },
                { 
                  id: 'Dandiya Single' as RegistrationType, 
                  title: 'Dandiya Night Single', 
                  sub: 'Single entry pass with lightweight Dandiya sticks pair & full festival dance ground access', 
                  price: '₹249', 
                  per: 'per person',
                  badge: 'Standard',
                  icon: <User className="w-7 h-7 text-amber-300" />,
                  features: ['1 Person Entry', 'Pair of Dandiya Sticks', 'DJ & Dhol Floor Access', 'Selfie Booth Access']
                },
                { 
                  id: 'Dandiya Couple' as RegistrationType, 
                  title: 'Dandiya Night Couple', 
                  sub: 'Entry pass for two + Pair of sticks for each + Best Couple competition eligibility', 
                  price: '₹399', 
                  per: 'per couple',
                  badge: 'Popular',
                  icon: <HeartHandshake className="w-7 h-7 text-rose-400" />,
                  features: ['Couple Fast-Track Entry', '2 Pairs of Sticks', 'Best Couple Contest Entry', 'Festive Photo Moments']
                },
              ].map((tier) => {
                const isSelected = formData.type === tier.id;
                return (
                  <div 
                    key={tier.id}
                    onClick={() => {
                      setFormData(prev => ({ 
                        ...prev, 
                        type: tier.id,
                        gender: tier.id === 'Jhijhiya 108' ? 'Female' : prev.gender 
                      }));
                    }}
                    className={`cursor-pointer rounded-2xl p-5 sm:p-6 text-center transition-all border-2 relative flex flex-col justify-between ${
                      isSelected 
                        ? 'border-[#f5bd4e] bg-gradient-to-b from-[#2e1029] to-[#200a1c] shadow-[0_0_25px_rgba(245,189,78,0.25)] ring-2 ring-[#f5bd4e]/40 transform -translate-y-1' 
                        : 'border-zinc-800 bg-[#1e0a1b]/60 hover:border-zinc-700 hover:bg-[#1e0a1b]'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#f5bd4e] text-[#38112f] font-bold' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {tier.badge}
                      </span>
                    </div>

                    <div>
                      <div className="w-13 h-13 rounded-2xl bg-black/40 border border-zinc-800 flex items-center justify-center mx-auto mb-3">
                        {tier.icon}
                      </div>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#fcf4e5] mb-1">{tier.title}</h3>
                      <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{tier.sub}</p>

                      <ul className="text-left text-xs space-y-1.5 text-zinc-300 border-t border-zinc-800/80 pt-3 mb-4">
                        {tier.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-[#f5bd4e]">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/60">
                      <div className="text-2xl font-mono font-bold text-[#f5bd4e]">
                        {tier.price}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400">
                        {tier.per}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: PARTICIPANT DETAILS */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono block mb-1">Step 2 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcf4e5]">
                {formData.type === 'Jhijhiya 108' ? 'Jhijhiya Participant Details' : 'Attendee Details'}
              </h2>
              <p className="text-zinc-400 text-sm mt-1">
                {formData.type === 'Jhijhiya 108' 
                  ? 'Official academy registration details for 108 Girls Jhijhiya.' 
                  : 'Enter primary passholder details for pass verification.'}
              </p>
            </div>

            {/* Jhijhiya Special Guidelines Box */}
            {formData.type === 'Jhijhiya 108' && (
              <div className="bg-[#240921] border border-[#f5bd4e]/40 p-4 rounded-2xl text-xs space-y-1.5 text-amber-200/90 leading-relaxed shadow-lg">
                <div className="flex items-center gap-2 font-bold text-[#f5bd4e] font-mono uppercase text-xs">
                  <Sparkles className="w-4 h-4 text-[#f5bd4e]" />
                  <span>108 Girls Jhijhiya Performance Guidelines</span>
                </div>
                <p>• <strong className="text-white">सेवाएँ शामिल:</strong> डांस कोरियोग्राफी, झिझिया/मटका प्रॉप, ज़रूरी प्रॉप्स, Practice &amp; Guidance.</p>
                <p>• <strong className="text-white">कॉस्ट्यूम &amp; मेकअप:</strong> फीस में शामिल नहीं है। सभी प्रतिभागी अपना कॉस्ट्यूम एवं मेकअप स्वयं करेंगे।</p>
                <p>• <strong className="text-white">पात्रता:</strong> यह प्रस्तुति केवल स्कूल एवं कॉलेज की छात्राओं के लिए है।</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="reg_fullName" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">
                  {formData.type === 'Jhijhiya 108' ? 'Participant Name (छात्रा का नाम) *' : 'Full Name (पूरा नाम) *'}
                </label>
                <input 
                  type="text" 
                  id="reg_fullName"
                  name="fullName" 
                  autoComplete="name"
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="e.g. Pooja Kumari"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                />
                {errors.fullName && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="reg_phone" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">
                  {formData.type === 'Jhijhiya 108' ? 'Participant Mobile No. *' : 'Mobile Number (मोबाइल नंबर) *'}
                </label>
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

              {/* JHIJHIYA-SPECIFIC FIELDS */}
              {formData.type === 'Jhijhiya 108' ? (
                <>
                  <div>
                    <label htmlFor="reg_fatherName" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">
                      Father&apos;s Name (पिता का नाम) *
                    </label>
                    <input 
                      type="text" 
                      id="reg_fatherName"
                      name="fatherName" 
                      value={formData.fatherName} 
                      onChange={handleChange} 
                      placeholder="e.g. Shri Ramesh Thakur"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                    {errors.fatherName && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.fatherName}</p>}
                  </div>

                  <div>
                    <label htmlFor="reg_email" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">
                      Email Address (ईमेल) *
                    </label>
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
                    <label htmlFor="reg_schoolCollegeName" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-[#f5bd4e]" /> School / College Name *
                    </label>
                    <input 
                      type="text" 
                      id="reg_schoolCollegeName"
                      name="schoolCollegeName" 
                      value={formData.schoolCollegeName} 
                      onChange={handleChange} 
                      placeholder="e.g. L.N.J. College Jhanjharpur"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                    {errors.schoolCollegeName && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.schoolCollegeName}</p>}
                  </div>

                  <div>
                    <label htmlFor="reg_classCourse" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">
                      Class / Course (कक्षा / कोर्स) *
                    </label>
                    <input 
                      type="text" 
                      id="reg_classCourse"
                      name="classCourse" 
                      value={formData.classCourse} 
                      onChange={handleChange} 
                      placeholder="e.g. Class 11 / B.A. Part 1"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                    {errors.classCourse && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.classCourse}</p>}
                  </div>

                  <div>
                    <label htmlFor="reg_parentPhone" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-[#f5bd4e]" /> Parent / Guardian Mobile *
                    </label>
                    <input 
                      type="tel" 
                      id="reg_parentPhone"
                      name="parentPhone" 
                      value={formData.parentPhone} 
                      onChange={handleChange} 
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                    {errors.parentPhone && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.parentPhone}</p>}
                  </div>

                  <div>
                    <label htmlFor="reg_age" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Age (उम्र)</label>
                    <input 
                      type="number" 
                      id="reg_age"
                      name="age" 
                      value={formData.age} 
                      onChange={handleChange} 
                      placeholder="e.g. 17"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="reg_fullAddress" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f5bd4e]" /> Permanent Address (स्थायी पता) *
                    </label>
                    <textarea 
                      id="reg_fullAddress"
                      name="fullAddress" 
                      rows={2}
                      value={formData.fullAddress} 
                      onChange={handleChange} 
                      placeholder="Village/Mohalla, Post, PS, Jhanjharpur..."
                      className="w-full px-4 py-3 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all resize-none" 
                    />
                    {errors.fullAddress && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.fullAddress}</p>}
                  </div>
                </>
              ) : (
                /* DANDIYA (SINGLE & COUPLE) FIELDS - NO EMAIL, ADDRESS ADDED! */
                <>
                  <div className="md:col-span-2">
                    <label htmlFor="reg_address" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f5bd4e]" /> Residential Address (पता / स्थानीय पता) *
                    </label>
                    <input 
                      type="text" 
                      id="reg_address"
                      name="address" 
                      value={formData.address || formData.fullAddress || ''} 
                      onChange={handleChange} 
                      placeholder="Mohalla / Ward / Village / Landmark, Jhanjharpur"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                    {errors.address && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="reg_city" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">City / Location</label>
                    <input 
                      type="text" 
                      id="reg_city"
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange} 
                      placeholder="Jhanjharpur, Madhubani..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all" 
                    />
                  </div>

                  <div>
                    <label htmlFor="reg_age" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Age (Optional)</label>
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
                    <label htmlFor="reg_gender" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Gender (Optional)</label>
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
                </>
              )}
            </div>

            {/* COUPLE EXTRA PARTNER FIELDS */}
            {(formData.type === 'Dandiya Couple' || formData.type === 'Couple') && (
              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h3 className="text-xl font-serif font-bold text-[#f5bd4e] mb-4 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-rose-400" /> Couple Partner Information
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
                    <label htmlFor="reg_partnerPhone" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Partner Mobile Number *</label>
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
          </div>
        )}

        {/* STEP 3: PAYMENT SCANNER, REVIEW & WHATSAPP REDIRECTION */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono block mb-1">Step 3 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcf4e5]">UPI Payment &amp; Pass Activation</h2>
              <p className="text-zinc-400 text-sm mt-1">Scan the official QR code, complete payment, and send your screenshot on WhatsApp.</p>
            </div>

            {/* Booking Summary Card */}
            <div className="bg-gradient-to-br from-[#2a0e23] via-[#1c0717] to-[#120410] p-5 sm:p-6 rounded-2xl border border-[#f5bd4e]/40 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
                <span className="font-serif font-bold text-base text-amber-100">Registration Summary</span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#f5bd4e]/20 text-[#f5bd4e] font-mono font-bold border border-[#f5bd4e]/30">
                  {EVENT_CONFIG.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-2.5 text-xs sm:text-sm">
                <div className="text-zinc-400">Pass Category:</div>
                <div className="font-semibold text-amber-200">
                  {formData.type === 'Jhijhiya 108' ? '108 Girls Jhijhiya Performance' : formData.type}
                </div>
                <div className="text-zinc-400">Primary Attendee:</div>
                <div className="font-semibold text-white">{formData.fullName}</div>
                <div className="text-zinc-400">Contact Number:</div>
                <div className="font-mono text-zinc-200">{formData.phone}</div>
                {formData.type === 'Jhijhiya 108' && formData.schoolCollegeName && (
                  <>
                    <div className="text-zinc-400">School / College:</div>
                    <div className="text-zinc-200 font-semibold">{formData.schoolCollegeName}</div>
                  </>
                )}
                {(formData.address || formData.fullAddress) && (
                  <>
                    <div className="text-zinc-400">Address:</div>
                    <div className="text-zinc-200 truncate">{formData.address || formData.fullAddress}</div>
                  </>
                )}
                <div className="text-zinc-400 font-bold text-sm text-[#f5bd4e]">Payable Amount:</div>
                <div className="font-bold font-mono text-2xl text-emerald-400">
                  ₹{currentAmount}/-
                </div>
              </div>
            </div>

            {/* OFFICIAL UPI PAYMENT SCANNER BOX */}
            <div className="bg-[#1f0a1c] border-2 border-[#f5bd4e]/60 rounded-3xl p-6 text-center shadow-[0_0_35px_rgba(245,189,78,0.25)] relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5bd4e]/15 border border-[#f5bd4e]/40 text-[#f5bd4e] text-xs font-mono uppercase tracking-widest mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> Official Event UPI Scanner
              </div>

              <div className="max-w-xs mx-auto bg-white p-4 rounded-2xl shadow-2xl border-4 border-[#f5bd4e]/40 mb-4">
                <img 
                  src={EVENT_CONFIG.payment.qrImage} 
                  alt="Official UPI Payment QR Code" 
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* Payee Info & Copy UPI ID */}
              <div className="space-y-1 mb-4">
                <p className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Account Name</p>
                <h4 className="text-xl font-serif font-bold text-white tracking-wide">
                  {EVENT_CONFIG.payment.payeeName}
                </h4>
                
                <div className="mt-2 inline-flex items-center gap-2 bg-[#2d0f28] border border-[#f5bd4e]/40 px-3.5 py-1.5 rounded-xl">
                  <span className="font-mono text-sm font-bold text-[#f5bd4e]">{EVENT_CONFIG.payment.upiId}</span>
                  <button
                    type="button"
                    onClick={copyUpiId}
                    className="p-1 rounded bg-[#f5bd4e]/20 hover:bg-[#f5bd4e]/40 text-[#f5bd4e] transition-colors"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedUpi && <p className="text-[11px] text-emerald-400 font-mono mt-1">UPI ID Copied to clipboard!</p>}
              </div>

              {/* Pay with Mobile UPI Link */}
              <div className="mb-4">
                <a 
                  href={`upi://pay?pa=${EVENT_CONFIG.payment.upiId}&pn=${encodeURIComponent(EVENT_CONFIG.payment.payeeName)}&am=${currentAmount}&cu=INR&tn=${encodeURIComponent(`Dandiya Fest Registration for ${formData.fullName}`)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-transform active:scale-95"
                >
                  <span>Pay ₹{currentAmount} via UPI App (GPay / PhonePe / Paytm)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Step-by-Step Payment Instructions */}
              <div className="bg-black/50 border border-amber-500/30 rounded-2xl p-4 text-left text-xs space-y-2 text-zinc-200">
                <p className="font-bold text-[#f5bd4e] flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>भुगतान एवं WhatsApp वेरिफिकेशन निर्देश (Important):</span>
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-zinc-300 leading-relaxed">
                  <li>ऊपर दिए गए QR कोड या UPI ID (<strong className="text-white font-mono">{EVENT_CONFIG.payment.upiId}</strong>) पर <strong className="text-[#f5bd4e]">₹{currentAmount}</strong> का भुगतान करें।</li>
                  <li>पेमेंट पूरा होने के बाद उसका <strong className="text-emerald-400">स्क्रीनशॉट (Screenshot)</strong> सुरक्षित रख लें।</li>
                  <li>नीचे दिए गए बटन पर क्लिक करें। आपका WhatsApp सीधे हमारे नंबर (<strong className="text-white font-mono">+91 97981 40068</strong>) पर खुलेगा और आपकी सभी डिटेल्स पहले से लिखी होंगी।</li>
                  <li>बस अपना <strong className="text-emerald-400">Payment Screenshot</strong> अटैच करके Send कर दें। आपका पास तुरंत वेरीफाई हो जाएगा!</li>
                </ol>
              </div>
            </div>

            {/* Checkbox confirmation */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start cursor-pointer bg-[#200c1e]/60 p-3.5 rounded-xl border border-zinc-800 hover:border-[#f5bd4e]/40">
                <input 
                  type="checkbox" 
                  name="consentAccurate" 
                  checked={formData.consentAccurate} 
                  onChange={handleChange} 
                  className="mt-0.5 w-5 h-5 accent-[#f5bd4e] rounded" 
                />
                <span className="ml-3 text-xs sm:text-sm text-zinc-200 leading-snug">
                  मैंने ₹{currentAmount} का भुगतान कर दिया है (या करने वाला हूँ) और मैं WhatsApp (+91 97981 40068) पर स्क्रीनशॉट भेजूँगा। *
                </span>
              </label>
              {errors.consentAccurate && (
                <p className="text-rose-400 text-xs ml-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />{errors.consentAccurate}
                </p>
              )}
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
        <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
          <button 
            type="button" 
            onClick={prevStep}
            disabled={step === 1 || isLoading}
            className={`px-5 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
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
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3.5 bg-gradient-to-r from-[#25D366] via-emerald-500 to-teal-500 hover:brightness-110 text-zinc-950 font-extrabold rounded-xl shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all flex items-center gap-2 transform hover:scale-[1.02] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing &amp; Opening WhatsApp...
                </span>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Confirm &amp; Send on WhatsApp</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
