"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Clock,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export function Contact() {
  const { data } = usePortfolio();
  const contact = data.contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    serviceType: "Full-Stack Web App",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const serviceOptions = [
    "Full-Stack Web App",
    "Next.js Frontend / UI",
    "SaaS Architecture",
    "Full-Time Hire / Contract",
    "Other Consultation",
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email || data.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const accessKey = contact.web3FormsAccessKey;
    const formspree = contact.formspreeEndpoint;

    // Check if the user hasn't configured a key yet
    const isPlaceholderKey =
      !accessKey ||
      accessKey.includes("YOUR_") ||
      accessKey === "YOUR_WEB3FORMS_ACCESS_KEY_HERE";

    if (isPlaceholderKey && !formspree) {
      // Demo / preview mode: simulate instant success and advise client
      setTimeout(() => {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          serviceType: "Full-Stack Web App",
          message: "",
        });
      }, 900);
      return;
    }

    try {
      if (formspree) {
        // Formspree submission
        const res = await fetch(formspree, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setStatus("success");
          setFormData({
            name: "",
            email: "",
            subject: "",
            serviceType: "Full-Stack Web App",
            message: "",
          });
        } else {
          throw new Error("Failed to send message via Formspree.");
        }
      } else {
        // Web3Forms submission
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `Portfolio Inquiry from ${formData.name}`,
            message: `[Service Needed: ${formData.serviceType}]\n\n${formData.message}`,
            from_name: "Portfolio Contact Form",
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus("success");
          setFormData({
            name: "",
            email: "",
            subject: "",
            serviceType: "Full-Stack Web App",
            message: "",
          });
        } else {
          throw new Error(result.message || "Failed to send message through Web3Forms.");
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again or email directly.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const isConfiguredKey =
    contact.web3FormsAccessKey &&
    !contact.web3FormsAccessKey.includes("YOUR_") &&
    contact.web3FormsAccessKey !== "YOUR_WEB3FORMS_ACCESS_KEY_HERE";

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {contact.headline || "Let's Build Something Exceptional Together"}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            {contact.description ||
              "Have a project inquiry or want to discuss full-time/contract opportunities? Fill out the form or reach out directly."}
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Email Card with 1-Click Copy */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Direct Email
                  </h4>
                  <a
                    href={`mailto:${contact.email || data.personal.email}`}
                    className="text-base font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {contact.email || data.personal.email}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Replies usually within 24 business hours
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location & Availability Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Location & Timezone
                </h4>
                <div className="text-base font-semibold text-slate-900 dark:text-white">
                  {contact.location || data.personal.location}
                </div>
                {contact.workingHours && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{contact.workingHours}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Phone or Calendly (if present) */}
            {(contact.phone || data.personal.phone) && (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Phone / WhatsApp
                  </h4>
                  <a
                    href={`tel:${contact.phone || data.personal.phone}`}
                    className="text-base font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {contact.phone || data.personal.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Schedule Meeting / Calendly Banner */}
            {contact.calendlyUrl && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-600/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-200">
                  <Calendar className="w-4 h-4" />
                  <span>Prefer Video Discussion?</span>
                </div>
                <h4 className="text-lg font-bold">Schedule a 15-Minute Discovery Call</h4>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  Book a direct video call on my calendar to discuss technical scope and pricing.
                </p>
                <a
                  href={contact.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-indigo-900 bg-white hover:bg-indigo-50 shadow-sm transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Select Time on Calendly</span>
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Web3Forms Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8">
                Messages are routed instantly to my personal inbox powered by Web3Forms.
              </p>

              {/* Status Alert: Success */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-200 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Message Sent Successfully!</h5>
                    <p className="text-xs mt-0.5 text-emerald-700 dark:text-emerald-300">
                      {contact.successMessage ||
                        "Thank you for reaching out! I have received your message and will reply within 24 hours."}
                    </p>
                  </div>
                </div>
              )}

              {/* Status Alert: Error */}
              {status === "error" && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/50 text-rose-800 dark:text-rose-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Submission Error</h5>
                    <p className="text-xs mt-0.5 text-rose-700 dark:text-rose-300">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Notice for buyer about Web3Forms setup */}
              {!isConfiguredKey && (
                <div className="mb-6 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    <strong>Free Web3Forms Hookup:</strong> Add your free access key to{" "}
                    <code className="px-1 py-0.5 bg-amber-100 dark:bg-amber-900/60 rounded">
                      data.json
                    </code>{" "}
                    to receive emails directly.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name <span className="text-indigo-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Email <span className="text-indigo-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Service / Project Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Project Type
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{formData.serviceType}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                            isSelectOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isSelectOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setIsSelectOpen(false)}
                          />
                          <div className="absolute left-0 right-0 top-full mt-2 z-30 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-1 animate-fadeIn">
                            {serviceOptions.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, serviceType: opt });
                                  setIsSelectOpen(false);
                                }}
                                className={`w-full px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                                  formData.serviceType === opt
                                    ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-semibold"
                                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                              >
                                <span>{opt}</span>
                                {formData.serviceType === opt && (
                                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                )}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Project inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Message <span className="text-indigo-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your goals, timeline, and requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all cursor-pointer disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
