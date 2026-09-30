'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DigitalPass from './DigitalPass';
import { DigitalPassData } from '@/lib/types';
import { EVENT_CONFIG } from '@/lib/config';
import { CheckCircle2, Printer, ArrowLeft, MessageSquare, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';

interface RegistrationSuccessProps {
  registrationId: string;
  name: string;
  type: string;
  fullData?: any;
}

export default function RegistrationSuccess({ registrationId, name, type, fullData }: RegistrationSuccessProps) {
  const [copiedUpi, setCopiedUpi] = useState(false);

  const getAmount = (regType: string): number => {
    const t = String(regType || '').toUpperCase();
    if (t.includes('JHIJHIYA') || t.includes('149')) return EVENT_CONFIG.pricing.jhijhiya || 149;
    if (t.includes('COUPLE') || t.includes('399')) return EVENT_CONFIG.pricing.dandiyaCouple || 399;
    return EVENT_CONFIG.pricing.dandiyaSingle || 249;
  };

  const amount = fullData?.amount || getAmount(type);

  const copyUpiId = () => {
    navigator.clipboard.writeText(EVENT_CONFIG.payment.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const buildWhatsAppUrl = () => {
    if (fullData?.waUrl) return fullData.waUrl;

    const isJhijhiya = type.includes('Jhijhiya') || type.includes('108');
    const isCouple = type.includes('Couple');

    let text = `🌸 *JHANJHARPUR JHIJHIYA & DANDIYA FEST 2026* 🌸\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🎫 *Pass ID:* ${registrationId}\n`;
    text += `👤 *Attendee Name:* ${name}\n`;
    text += `🏷️ *Category:* ${isJhijhiya ? '108 Girls Jhijhiya Performance' : type}\n`;
    if (fullData?.phone) text += `📞 *Mobile:* ${fullData.phone}\n`;

    if (isJhijhiya) {
      if (fullData?.fatherName) text += `👨 *Father's Name:* ${fullData.fatherName}\n`;
      if (fullData?.schoolCollegeName) text += `🏫 *School/College:* ${fullData.schoolCollegeName}\n`;
      if (fullData?.classCourse) text += `📚 *Class/Course:* ${fullData.classCourse}\n`;
      if (fullData?.parentPhone) text += `👨‍👩‍👧 *Parent Mobile:* ${fullData.parentPhone}\n`;
      if (fullData?.email && !fullData.email.includes('@fest.in')) text += `📧 *Email:* ${fullData.email}\n`;
      if (fullData?.fullAddress || fullData?.address) text += `📍 *Address:* ${fullData.fullAddress || fullData.address}\n`;
    } else if (isCouple) {
      if (fullData?.partnerName) text += `💑 *Partner Name:* ${fullData.partnerName}\n`;
      if (fullData?.partnerPhone) text += `📞 *Partner Mobile:* ${fullData.partnerPhone}\n`;
      if (fullData?.address || fullData?.fullAddress) text += `📍 *Address:* ${fullData.address || fullData.fullAddress}\n`;
    } else {
      if (fullData?.address || fullData?.fullAddress) text += `📍 *Address:* ${fullData.address || fullData.fullAddress}\n`;
    }

    text += `💰 *Registration Fee:* ₹${amount}/-\n`;
    text += `📅 *Date:* 18 October 2026 • 5:00 PM\n`;
    text += `📍 *Venue:* Jhanjharpur, Madhubani\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📸 *Payment Verification:* Maine ₹${amount} ka payment successfully kar diya hai. Kripya mera payment screenshot neeche check karein aur mera Pass verify/confirm karein. Dhanyawad! 🙏`;

    const cleanNumber = EVENT_CONFIG.payment.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const waUrl = buildWhatsAppUrl();

  const passData: DigitalPassData = {
    registrationId,
    name,
    type,
    date: EVENT_CONFIG.dateDisplay || EVENT_CONFIG.date,
    venue: `${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.city}`,
    feeAmount: amount,
    phone: fullData?.phone,
    address: fullData?.address || fullData?.fullAddress,
    schoolCollegeName: fullData?.schoolCollegeName,
    fatherName: fullData?.fatherName,
    partnerName: fullData?.partnerName,
    partnerPhone: fullData?.partnerPhone,
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto py-4 px-3 sm:px-4 animate-in fade-in duration-500 space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-9 h-9 text-emerald-400" />
        </div>
        
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-2 text-center tracking-wide">
          Pass Reserved Successfully!
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Your entry spot for <span className="text-[#f5bd4e] font-semibold">{EVENT_CONFIG.name}</span> is reserved.
        </p>
      </div>

      {/* WHATSAPP ACTION CALLOUT (CRITICAL NEXT STEP) */}
      <div className="w-full bg-gradient-to-br from-[#12381f] via-[#0e2716] to-[#0a170e] border-2 border-emerald-500/60 rounded-3xl p-5 sm:p-6 shadow-[0_0_35px_rgba(16,185,129,0.25)] text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" /> Next Step: WhatsApp Payment Screenshot
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1.5">
            स्क्रीनशॉट भेजें और अपना पास एक्टिवेट कराएं
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-lg mx-auto">
            नीचे दिए गए हरे बटन पर क्लिक करें। आपका WhatsApp सीधे हमारे ऑफिशियल नंबर (<strong className="text-white font-mono">{EVENT_CONFIG.payment.whatsappDisplay}</strong>) पर खुलेगा और आपकी सभी डिटेल्स पहले से लिखी होंगी। बस अपने <strong className="text-white">₹{amount} पेमेंट का स्क्रीनशॉट</strong> साथ में अटैच करके Send कर दें!
          </p>
        </div>

        <div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#25D366] via-emerald-500 to-teal-500 hover:brightness-110 text-zinc-950 font-black text-base rounded-2xl shadow-[0_4px_25px_rgba(37,211,102,0.45)] transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Send Details &amp; Screenshot on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* OFFICIAL UPI SCANNER (IF NOT PAID YET) */}
      <div className="w-full bg-[#180816]/95 border border-[#d4a017]/35 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#f5bd4e] font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Official Payment Scanner
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 font-mono font-bold border border-emerald-500/30">
            Payable: ₹{amount}/-
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5 justify-center">
          <div className="w-36 h-36 bg-white p-2 rounded-2xl border-2 border-[#f5bd4e]/50 shadow-md flex-shrink-0">
            <img 
              src={EVENT_CONFIG.payment.qrImage} 
              alt="UPI Scanner QR Code" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          <div className="text-left space-y-2 text-xs">
            <div>
              <span className="text-zinc-400 block font-mono text-[10px] uppercase">Account Payee</span>
              <span className="text-base font-bold text-white font-serif">{EVENT_CONFIG.payment.payeeName}</span>
            </div>

            <div>
              <span className="text-zinc-400 block font-mono text-[10px] uppercase">UPI ID</span>
              <div className="inline-flex items-center gap-1.5 bg-black/40 border border-[#f5bd4e]/30 px-2.5 py-1 rounded-lg">
                <span className="font-mono text-xs font-bold text-[#f5bd4e]">{EVENT_CONFIG.payment.upiId}</span>
                <button
                  type="button"
                  onClick={copyUpiId}
                  className="text-zinc-400 hover:text-white"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <a 
                href={`upi://pay?pa=${EVENT_CONFIG.payment.upiId}&pn=${encodeURIComponent(EVENT_CONFIG.payment.payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Dandiya Fest Pass ${registrationId}`)}`}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 hover:underline"
              >
                <span>Tap to Pay with UPI App (PhonePe / GPay)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* DIGITAL PASS PREVIEW */}
      <div className="w-full">
        <DigitalPass data={passData} />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button 
          type="button" 
          onClick={() => window.print()}
          className="px-6 py-3.5 bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] text-[#38112f] rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Pass</span>
        </button>

        <a 
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-zinc-950 rounded-xl font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Open WhatsApp Again</span>
        </a>
      </div>
      
      <Link 
        href="/" 
        className="pt-2 text-[#f5bd4e] hover:text-white transition-colors flex items-center gap-1.5 text-sm font-semibold font-mono"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Event Home</span>
      </Link>
    </div>
  );
}
