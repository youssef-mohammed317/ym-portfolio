"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PortfolioData } from "@/types/portfolio";
import {
  SlidersHorizontal,
  X,
  Download,
  RotateCcw,
  Sparkles,
  Info,
  Check,
  User,
  Briefcase,
  Cpu,
  Mail,
  Code,
  Share2,
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";

type ActiveTab = "personal" | "stats" | "skills" | "projects" | "contact" | "json";

export function LiveEditorDrawer() {
  const { data, updateData, resetData, exportDataJson, isModified } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("personal");
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [appliedJson, setAppliedJson] = useState(false);

  if (!data.siteMetadata.enableLiveEditor) {
    return null;
  }

  const handleOpen = () => {
    setJsonText(JSON.stringify(data, null, 2));
    setJsonError(null);
    setIsOpen(true);
  };

  const handlePersonalChange = (field: string, val: unknown) => {
    updateData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: val,
      },
    }));
  };

  const handleContactChange = (field: string, val: string) => {
    updateData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: val,
      },
    }));
  };

  const handleStatChange = (index: number, field: "value" | "label", val: string) => {
    updateData((prev) => {
      const nextStats = [...prev.stats];
      if (nextStats[index]) {
        nextStats[index] = { ...nextStats[index], [field]: val };
      }
      return { ...prev, stats: nextStats };
    });
  };

  const handleSocialChange = (index: number, url: string) => {
    updateData((prev) => {
      const nextSocials = [...prev.socials];
      if (nextSocials[index]) {
        nextSocials[index] = { ...nextSocials[index], url };
      }
      return { ...prev, socials: nextSocials };
    });
  };

  const handleSkillLevelChange = (catIdx: number, skillIdx: number, level: number) => {
    updateData((prev) => {
      const nextSkills = [...prev.skills];
      if (nextSkills[catIdx]?.items[skillIdx]) {
        nextSkills[catIdx].items[skillIdx] = {
          ...nextSkills[catIdx].items[skillIdx],
          level,
        };
      }
      return { ...prev, skills: nextSkills };
    });
  };

  const handleProjectChange = (
    index: number,
    field: "title" | "category" | "description" | "metric",
    val: string
  ) => {
    updateData((prev) => {
      const nextProjects = [...prev.projects];
      if (nextProjects[index]) {
        nextProjects[index] = { ...nextProjects[index], [field]: val };
      }
      return { ...prev, projects: nextProjects };
    });
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText) as PortfolioData;
      if (!parsed.personal || !parsed.projects) {
        throw new Error("Invalid structure: missing 'personal' or 'projects' object.");
      }
      updateData(() => parsed);
      setJsonError(null);
      setAppliedJson(true);
      setTimeout(() => setAppliedJson(false), 2000);
    } catch (err: unknown) {
      setJsonError(err instanceof Error ? err.message : "Invalid JSON syntax.");
    }
  };

  return (
    <>
      {/* Floating Toggle Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleOpen}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl hover:shadow-2xl hover:scale-105 transition-all border border-slate-700/50 dark:border-slate-200/50 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-indigo-400 dark:text-indigo-600 animate-pulse" />
          <span className="text-xs font-bold tracking-tight">Full Live Customizer</span>
          {isModified && (
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Customized" />
          )}
        </button>
      </div>

      {/* Slide-Over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm">
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      Complete Live Portfolio Editor
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Test all sections live or edit full data.json directly
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="flex items-center gap-1 px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "personal"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab("stats")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "stats"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Stats & Social</span>
                </button>

                <button
                  onClick={() => setActiveTab("skills")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "skills"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Skills</span>
                </button>

                <button
                  onClick={() => setActiveTab("projects")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "projects"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Projects</span>
                </button>

                <button
                  onClick={() => setActiveTab("contact")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "contact"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact & Key</span>
                </button>

                <button
                  onClick={() => {
                    setJsonText(JSON.stringify(data, null, 2));
                    setActiveTab("json");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "json"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Raw JSON</span>
                </button>
              </div>

              {/* Form Controls Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                {/* TAB 1: PERSONAL PROFILE */}
                {activeTab === "personal" && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/60 text-indigo-900 dark:text-indigo-200 leading-relaxed flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <p>
                        Edit any profile field below and watch the portfolio header, hero, and about sections update instantly in real time!
                      </p>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={data.personal.name}
                        onChange={(e) => handlePersonalChange("name", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Professional Headline
                      </label>
                      <input
                        type="text"
                        value={data.personal.headline}
                        onChange={(e) => handlePersonalChange("headline", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Bio Summary
                      </label>
                      <textarea
                        rows={3}
                        value={data.personal.bio}
                        onChange={(e) => handlePersonalChange("bio", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={data.personal.location}
                          onChange={(e) => handlePersonalChange("location", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Status Badge Text
                        </label>
                        <input
                          type="text"
                          value={data.personal.status?.text || ""}
                          onChange={(e) =>
                            handlePersonalChange("status", {
                              available: true,
                              text: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Avatar Image URL
                      </label>
                      <input
                        type="text"
                        value={data.personal.avatar}
                        onChange={(e) => handlePersonalChange("avatar", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: STATS & SOCIALS */}
                {activeTab === "stats" && (
                  <div className="space-y-5">
                    <div>
                      <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-3">
                        Hero Counter Statistics
                      </h4>
                      <div className="space-y-3">
                        {data.stats.map((stat, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-2"
                          >
                            <div>
                              <span className="text-[10px] text-slate-500">Value (e.g. 6+, 99%)</span>
                              <input
                                type="text"
                                value={stat.value}
                                onChange={(e) => handleStatChange(i, "value", e.target.value)}
                                className="w-full px-2 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500">Label</span>
                              <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => handleStatChange(i, "label", e.target.value)}
                                className="w-full px-2 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                      <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-3">
                        Social Profile URLs
                      </h4>
                      <div className="space-y-3">
                        {data.socials.map((soc, i) => (
                          <div key={soc.platform}>
                            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              {soc.label}
                            </label>
                            <input
                              type="text"
                              value={soc.url}
                              onChange={(e) => handleSocialChange(i, e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-[11px]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: SKILLS */}
                {activeTab === "skills" && (
                  <div className="space-y-5">
                    <p className="text-slate-500">
                      Drag the sliders to adjust proficiency percentages or inspect how skill bars animate.
                    </p>
                    {data.skills.map((category, catIdx) => (
                      <div
                        key={catIdx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3"
                      >
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          {category.category}
                        </h4>
                        <div className="space-y-2.5">
                          {category.items.map((skill, skillIdx) => (
                            <div key={skillIdx} className="space-y-1">
                              <div className="flex justify-between items-center text-[11px]">
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                  {skill.name}
                                </span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                  {skill.level}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) =>
                                  handleSkillLevelChange(
                                    catIdx,
                                    skillIdx,
                                    parseInt(e.target.value, 10)
                                  )
                                }
                                className="w-full accent-indigo-600 cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 4: PROJECTS */}
                {activeTab === "projects" && (
                  <div className="space-y-4">
                    <p className="text-slate-500">
                      Quick edit project card headers, categories, and metrics.
                    </p>
                    {data.projects.map((proj, pIdx) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                      >
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) =>
                              handleProjectChange(pIdx, "title", e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase">
                              Category
                            </label>
                            <input
                              type="text"
                              value={proj.category}
                              onChange={(e) =>
                                handleProjectChange(pIdx, "category", e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase">
                              Metric Tag
                            </label>
                            <input
                              type="text"
                              value={proj.metric || ""}
                              onChange={(e) =>
                                handleProjectChange(pIdx, "metric", e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase">
                            Summary Description
                          </label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) =>
                              handleProjectChange(pIdx, "description", e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 5: CONTACT & WEB3FORMS KEY */}
                {activeTab === "contact" && (
                  <div className="space-y-4">
                    {/* Explanation Box for What is Form Key */}
                    <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-200 text-xs">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span>What is the Web3Forms Access Key?</span>
                      </div>
                      <p className="text-[11px] text-indigo-800 dark:text-indigo-300 leading-relaxed">
                        Because this portfolio is <strong>100% Front-End</strong> (without backend servers or hosting costs), Web3Forms provides a <strong>free email forwarder</strong>. When someone submits the contact form, Web3Forms automatically delivers their message straight to your personal email!
                      </p>
                      <a
                        href="https://web3forms.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
                      >
                        <span>Get your free key in 10 seconds at web3forms.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Web3Forms Access Key
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 5a1b3c4d-xxxx-xxxx-xxxx"
                        value={data.contact.web3FormsAccessKey}
                        onChange={(e) =>
                          handleContactChange("web3FormsAccessKey", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Contact / Forwarding Email
                      </label>
                      <input
                        type="email"
                        value={data.contact.email}
                        onChange={(e) => handleContactChange("email", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={data.contact.phone || data.personal.phone || ""}
                        onChange={(e) => handleContactChange("phone", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Calendly Video Booking Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={data.contact.calendlyUrl || ""}
                        onChange={(e) => handleContactChange("calendlyUrl", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 6: RAW JSON EDITOR */}
                {activeTab === "json" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Direct data.json Code Editor
                      </span>
                      <button
                        onClick={handleApplyJson}
                        className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-sm transition-all cursor-pointer"
                      >
                        Apply JSON Live
                      </button>
                    </div>

                    {appliedJson && (
                      <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Changes applied successfully across the entire site!</span>
                      </div>
                    )}

                    {jsonError && (
                      <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-300 text-rose-800 dark:text-rose-200">
                        {jsonError}
                      </div>
                    )}

                    <textarea
                      rows={16}
                      value={jsonText}
                      onChange={(e) => setJsonText(e.target.value)}
                      className="w-full p-3 font-mono text-[11px] rounded-xl bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      spellCheck={false}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2">
                <button
                  onClick={exportDataJson}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export & Download data.json</span>
                </button>

                {isModified && (
                  <button
                    onClick={resetData}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Original Defaults</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
