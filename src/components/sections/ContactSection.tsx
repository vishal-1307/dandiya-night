'use client';

import { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/config';
import { Phone, Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const { contact } = EVENT_CONFIG;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-[#0A030D] text-amber-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5bd4e]/10 border border-[#f5bd4e]/30 text-[#f5bd4e] text-xs font-mono uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" /> Direct Support
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#f5bd4e] to-amber-300 mb-6 tracking-wide">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 bg-[#160815]/90 rounded-3xl p-8 md:p-12 border border-[#8b1a3f]/40 shadow-2xl backdrop-blur-sm">
          <div className="lg:w-1/2 space-y-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-4">Official Organizer Desk</h3>
              <p className="text-zinc-300 mb-8 text-sm sm:text-base leading-relaxed">
                Have questions regarding the 108 Girls Jhijhiya Performance, Dandiya passes, choreography guidance, or sponsorships? Reach out to the <strong className="text-amber-200">Evolution Dance and Karate Academy</strong> &amp; <strong className="text-amber-200">Brocollab.in</strong> team.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-xl bg-[#f5bd4e]/10 border border-[#f5bd4e]/25 flex items-center justify-center text-[#f5bd4e] mr-4 group-hover:bg-[#f5bd4e] group-hover:text-[#38112f] transition-all shadow-[0_0_10px_rgba(245,189,78,0.15)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-zinc-400 font-mono">Call or WhatsApp</span>
                    <div className="flex flex-col gap-1">
                      <a href={`tel:${contact.phone}`} className="text-base font-semibold text-amber-50 hover:text-[#f5bd4e] transition-colors">{contact.phone}</a>
                      <a href={`tel:${contact.phoneSecondary}`} className="text-base font-semibold text-amber-50 hover:text-[#f5bd4e] transition-colors">{contact.phoneSecondary}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-xl bg-[#f5bd4e]/10 border border-[#f5bd4e]/25 flex items-center justify-center text-[#f5bd4e] mr-4 group-hover:bg-[#f5bd4e] group-hover:text-[#38112f] transition-all shadow-[0_0_10px_rgba(245,189,78,0.15)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-zinc-400 font-mono">Instagram Communities</span>
                    <div className="flex flex-col gap-1">
                      <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#f5bd4e] hover:underline">{contact.instagram}</a>
                      <a href={contact.collabInstagramUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#f5bd4e] hover:underline">{contact.collabInstagram}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <a 
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all gap-2.5 shadow-[0_4px_15px_rgba(16,185,129,0.3)] transform hover:scale-[1.02]"
              >
                <span>Chat on WhatsApp</span>
                <span className="text-xs bg-emerald-700/80 px-2 py-0.5 rounded-full">Instant Reply</span>
              </a>

              <div className="mt-5 p-3.5 rounded-2xl bg-black/40 border border-[#f5bd4e]/30 flex items-center gap-3.5">
                <img src={EVENT_CONFIG.payment.qrImage} alt="Payment QR" className="w-14 h-14 rounded-xl object-contain bg-white p-1 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-[#f5bd4e] font-mono uppercase tracking-wider block font-bold text-[10px]">Official UPI Payment Desk</span>
                  <span className="text-white font-semibold block">{EVENT_CONFIG.payment.payeeName}</span>
                  <span className="font-mono text-zinc-300 block text-[11px]">{EVENT_CONFIG.payment.upiId}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2.5 shadow-lg">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                  <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-2.5 shadow-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}
              <div>
                <label htmlFor="contact_name" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Full Name *</label>
                <input 
                  type="text" 
                  id="contact_name" 
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all"
                  placeholder="e.g. Priya Mishra"
                />
              </div>
              <div>
                <label htmlFor="contact_email" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Email Address *</label>
                <input 
                  type="email" 
                  id="contact_email" 
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all"
                  placeholder="e.g. priya@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact_phone" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  id="contact_phone" 
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all"
                  placeholder="10-digit mobile number"
                />
              </div>
              <div>
                <label htmlFor="contact_message" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">Your Message *</label>
                <textarea 
                  id="contact_message" 
                  name="message"
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1d071b] border-2 border-[#f5bd4e]/40 text-white font-semibold text-base placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] text-[#38112f] font-bold hover:brightness-110 shadow-[0_4px_20px_rgba(245,189,78,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
