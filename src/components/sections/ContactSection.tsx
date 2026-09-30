'use client';

import { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/config';
import { Phone, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

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
    <section id="contact" className="py-14 sm:py-20 bg-[#0a020b] text-[#FFF8F0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Direct Support ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Contact Organizers
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Have questions regarding passes, choreography sessions, or event access? Our academy team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Organizer Info & Helplines */}
          <div className="rounded-lg border border-zinc-800 bg-[#160517] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/[0.06] text-[#f5bd4e] font-bold border border-[#f5bd4e]/20 mb-3">
                Official Helpdesk
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#fcf4e5] mb-2">
                Evolution Dance &amp; Karate Academy
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                In collaboration with <span className="text-[#f5bd4e]">Brocollab.in</span>. For immediate pass confirmation, choreography updates, or group bookings, connect directly.
              </p>

              <div className="space-y-4 border-t border-zinc-800/80 pt-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#f5bd4e] flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Helpline &amp; WhatsApp</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5 text-xs sm:text-sm">
                      <a href={`tel:${contact.phone}`} className="font-semibold text-zinc-100 hover:text-[#f5bd4e] transition-colors">
                        {contact.phone}
                      </a>
                      <span className="text-zinc-600">•</span>
                      <a href={`tel:${contact.phoneSecondary}`} className="font-semibold text-zinc-100 hover:text-[#f5bd4e] transition-colors">
                        {contact.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#f5bd4e] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Instagram Channels</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5 text-xs sm:text-sm">
                      <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#f5bd4e] hover:underline font-mono">
                        {contact.instagram}
                      </a>
                      <span className="text-zinc-600">•</span>
                      <a href={contact.collabInstagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#f5bd4e] hover:underline font-mono">
                        {contact.collabInstagram}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-zinc-800/80 space-y-4">
              <Button
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Namaste! I have a question regarding Jhanjharpur Jhijhiya & Dandiya Fest 2026.')}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-1.5" />
                <span>Chat on Official WhatsApp</span>
              </Button>

              {/* UPI Payment Scan Box */}
              <div className="rounded-lg bg-black/40 border border-zinc-800 p-3.5 flex items-center gap-3.5">
                <img
                  src={EVENT_CONFIG.payment.qrImage}
                  alt="Official Payment QR"
                  className="w-12 h-12 rounded object-contain bg-white p-1 flex-shrink-0"
                />
                <div className="text-xs min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#f5bd4e] font-bold">
                    Official UPI Desk
                  </div>
                  <div className="font-semibold text-white truncate">{EVENT_CONFIG.payment.payeeName}</div>
                  <div className="font-mono text-[11px] text-zinc-400 truncate">{EVENT_CONFIG.payment.upiId}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="rounded-lg border border-zinc-800 bg-[#160517] p-6 sm:p-8">
            <h3 className="text-lg font-serif font-bold text-[#fcf4e5] mb-1">
              Send an Inquiry
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Leave your details below and our team will get back to you within 24 hours.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {status === 'success' && (
                <div className="p-3.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                  <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="p-3.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label htmlFor="contact_name" className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="contact_name"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded bg-[#1f071d] border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#f5bd4e] focus:ring-1 focus:ring-[#f5bd4e]"
                  placeholder="e.g. Priya Mishra"
                />
              </div>

              <div>
                <label htmlFor="contact_email" className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded bg-[#1f071d] border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#f5bd4e] focus:ring-1 focus:ring-[#f5bd4e]"
                  placeholder="e.g. priya@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact_phone" className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-1.5">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded bg-[#1f071d] border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#f5bd4e] focus:ring-1 focus:ring-[#f5bd4e]"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label htmlFor="contact_message" className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-1.5">
                  Your Message *
                </label>
                <textarea
                  id="contact_message"
                  name="message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded bg-[#1f071d] border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#f5bd4e] focus:ring-1 focus:ring-[#f5bd4e] resize-none"
                  placeholder="How can our organizers assist you?"
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'loading'}
                variant="secondary"
                size="md"
                className="w-full justify-center"
              >
                {status === 'loading' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5 ml-1.5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

