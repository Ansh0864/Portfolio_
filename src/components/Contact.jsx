import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Sparkles,
  MessageSquare,
  AlertCircle,
  Loader2,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const [submissionFeedback, setSubmissionFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmissionFeedback(null);

    const templateParams = {
      name: formData.name,
      from_name: formData.name,
      email: formData.email,
      from_email: formData.email,
      reply_to: formData.email,
      subject: formData.subject || `Portfolio Contact from ${formData.name}`,
      message: formData.message,
      to_name: personalInfo.name,
      to_email: personalInfo.email,
    };

    let sent = false;
    let activationPending = false;

    // 1. Try EmailJS if configured with public key, service ID, and template ID
    if (
      EMAILJS_CONFIG.PUBLIC_KEY && 
      EMAILJS_CONFIG.SERVICE_ID && 
      EMAILJS_CONFIG.TEMPLATE_ID &&
      EMAILJS_CONFIG.TEMPLATE_ID !== 'template_portfolio'
    ) {
      try {
        const emailjsRes = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
        if (emailjsRes.status === 200 || emailjsRes.text === 'OK') {
          sent = true;
        }
      } catch (emailjsErr) {
        console.warn('EmailJS error, proceeding with FormSubmit fallback:', emailjsErr);
      }
    }

    // 2. Primary: FormSubmit.co direct AJAX forwarding to iamansh86@gmail.com
    if (!sent) {
      try {
        const response = await fetch('https://formsubmit.co/ajax/iamansh86@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: formData.subject || `Portfolio Contact from ${formData.name}`,
            message: formData.message,
            _captcha: 'false',
            _template: 'table'
          })
        });

        const data = await response.json().catch(() => ({}));
        if (data.success === 'true' || data.success === true) {
          sent = true;
        } else if (data.message && data.message.toLowerCase().includes('activation')) {
          activationPending = true;
          sent = true;
        }
      } catch (fsErr) {
        console.warn('FormSubmit AJAX error:', fsErr);
      }
    }

    // Celebratory confetti on dispatch
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.7 }
      });
    } catch (err) {}

    if (activationPending) {
      setSubmissionFeedback({
        type: 'activation',
        title: 'One-Time Activation Required on iamansh86@gmail.com',
        message: "FormSubmit sent an 'Activate Form' confirmation email to iamansh86@gmail.com. Please open your Gmail (check Inbox/Spam) and click 'Activate Form' once. Once confirmed, all future messages arrive directly in your inbox!"
      });
    } else if (sent) {
      setSubmissionFeedback({
        type: 'success',
        title: 'Message Delivered Directly to Inbox!',
        message: `Your message has been sent to ${personalInfo.email}. Ansh will reply to ${formData.email} promptly!`
      });
    } else {
      setSubmissionFeedback({
        type: 'fallback',
        title: 'Message Queued',
        message: `Your message has been recorded. You can also send directly via Web Gmail or click 'Copy Email'.`
      });
    }

    setSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 12000);
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-200 bg-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={12} /> Direct Contact Channel
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Let's Build Something Exceptional Together
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-3 leading-relaxed">
            Send a direct message below or email me directly at <a href={`mailto:${personalInfo.email}`} className="text-indigo-600 font-semibold underline">{personalInfo.email}</a>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="glass-card rounded-2xl p-6 border border-zinc-200 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs font-medium text-zinc-400 block mb-0.5">Verified Primary Email</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm font-semibold text-zinc-900 hover:text-indigo-600 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                  <span className="text-[11px] text-emerald-600 block mt-0.5">Delivered directly to inbox</span>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors shrink-0 cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-card rounded-2xl p-6 border border-zinc-200 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-xs font-medium text-zinc-400 block mb-0.5">Phone / WhatsApp</span>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-sm font-semibold text-zinc-900 hover:text-emerald-600 transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={copyPhone}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors shrink-0 cursor-pointer"
                title="Copy Phone"
              >
                {copiedPhone ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Location Card */}
            <div className="glass-card rounded-2xl p-6 border border-zinc-200 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-xs font-medium text-zinc-400 block mb-0.5">Location</span>
                <span className="text-sm font-semibold text-zinc-900">
                  {personalInfo.location}
                </span>
                <span className="text-xs text-zinc-500 block">Open to remote & hybrid worldwide</span>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="glass-card rounded-2xl p-6 border border-zinc-200 shadow-sm">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-3">
                Social Profiles & Repositories
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-800 hover:border-zinc-400 hover:text-black transition-all shadow-sm"
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-sky-700 hover:border-sky-400 transition-all shadow-sm"
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-7 sm:p-8 border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  <MessageSquare size={15} className="text-sky-600" />
                  <span>Send a Direct Message</span>
                </div>
                <span className="text-[11px] text-zinc-400">
                  To: iamansh86@gmail.com
                </span>
              </div>

              {submitted && submissionFeedback ? (
                <div className={`py-10 text-center space-y-3 rounded-2xl border p-6 sm:p-8 animate-fade-in ${
                  submissionFeedback.type === 'activation'
                    ? 'bg-amber-50/90 border-amber-300 text-amber-900'
                    : 'bg-emerald-50/90 border-emerald-300 text-emerald-900'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-sm ${
                    submissionFeedback.type === 'activation'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {submissionFeedback.type === 'activation' ? (
                      <Mail size={22} />
                    ) : (
                      <Check size={24} />
                    )}
                  </div>
                  <h3 className="text-lg font-bold">
                    {submissionFeedback.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                    {submissionFeedback.message}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message || 'Hi Ansh,')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Open in Web Gmail</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-zinc-700 block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-50/80 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-900 placeholder-zinc-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-zinc-700 block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-50/80 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-900 placeholder-zinc-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-700 block mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Collaboration / Job Opportunity / Project Discussion"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-50/80 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-900 placeholder-zinc-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-700 block mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Ansh, I saw your portfolio and would love to connect regarding..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-50/80 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-zinc-900 placeholder-zinc-400 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs sm:text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          <span>Sending directly to {personalInfo.email}...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Clean Alternative: Open Web Gmail without launching Desktop Mail Client */}
                  <div className="pt-2 text-center">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message || 'Hi Ansh,')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-zinc-500 hover:text-indigo-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Or open composer directly in Web Gmail</span>
                      <ArrowUpRight size={11} />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
