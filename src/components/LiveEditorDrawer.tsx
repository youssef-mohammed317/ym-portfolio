"use client";

import React, { useState, useEffect } from "react";
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
  FileUp,
  GraduationCap,
} from "lucide-react";

type ActiveTab = "personal" | "stats" | "skills" | "projects" | "experience" | "contact" | "json";

export function LiveEditorDrawer() {
  const { data, updateData, resetData, exportDataJson, isModified } = usePortfolio();
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("personal");
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [appliedJson, setAppliedJson] = useState(false);
  const [uploadedCvName, setUploadedCvName] = useState<string | null>(null);

  // Close on Escape key and manage body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isRendered) handleClose();
    };

    if (isRendered) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRendered]);

  if (!data.siteMetadata.enableLiveEditor) {
    return null;
  }

  const handleOpen = () => {
    setJsonText(JSON.stringify(data, null, 2));
    setJsonError(null);
    setIsRendered(true);
    // Trigger smooth slide-in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    // Wait for transition animation to finish before unmounting
    setTimeout(() => {
      setIsRendered(false);
    }, 280);
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

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      handlePersonalChange("resumeUrl", blobUrl);
      setUploadedCvName(file.name);
    }
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

  // SKILLS CRUD
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

  const handleSkillNameChange = (catIdx: number, skillIdx: number, name: string) => {
    updateData((prev) => {
      const nextSkills = [...prev.skills];
      if (nextSkills[catIdx]?.items[skillIdx]) {
        nextSkills[catIdx].items[skillIdx] = {
          ...nextSkills[catIdx].items[skillIdx],
          name,
        };
      }
      return { ...prev, skills: nextSkills };
    });
  };

  const handleAddSkill = (catIdx: number) => {
    updateData((prev) => {
      const nextSkills = [...prev.skills];
      if (nextSkills[catIdx]) {
        nextSkills[catIdx] = {
          ...nextSkills[catIdx],
          items: [
            ...nextSkills[catIdx].items,
            { name: "New Skill", level: 85, badge: "Proficient", icon: "code" },
          ],
        };
      }
      return { ...prev, skills: nextSkills };
    });
  };

  const handleDeleteSkill = (catIdx: number, skillIdx: number) => {
    updateData((prev) => {
      const nextSkills = [...prev.skills];
      if (nextSkills[catIdx]) {
        nextSkills[catIdx] = {
          ...nextSkills[catIdx],
          items: nextSkills[catIdx].items.filter((_, i) => i !== skillIdx),
        };
      }
      return { ...prev, skills: nextSkills };
    });
  };

  const handleAddCategory = () => {
    updateData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          category: "Specialized Discipline",
          description: "New skill set and practical knowledge",
          items: [{ name: "Core Technology", level: 90, badge: "Expert", icon: "code" }],
        },
      ],
    }));
  };

  const handleDeleteCategory = (catIdx: number) => {
    updateData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== catIdx),
    }));
  };

  // PROJECTS CRUD
  const handleProjectChange = (
    index: number,
    field: "title" | "category" | "description" | "metric" | "tagsString",
    val: string
  ) => {
    updateData((prev) => {
      const nextProjects = [...prev.projects];
      if (nextProjects[index]) {
        if (field === "tagsString") {
          const tags = val.split(",").map((t) => t.trim()).filter(Boolean);
          nextProjects[index] = { ...nextProjects[index], tags };
        } else {
          nextProjects[index] = { ...nextProjects[index], [field]: val };
        }
      }
      return { ...prev, projects: nextProjects };
    });
  };

  const handleAddProject = () => {
    updateData((prev) => ({
      ...prev,
      projects: [
        {
          id: `project-${Date.now()}`,
          title: "New Featured Project",
          tagline: "High-impact digital product summary",
          category: prev.projectCategories[1] || "Full-Stack",
          description: "Detailed description of what this project achieves and key metrics delivered.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          tags: ["Next.js", "React", "Tailwind CSS"],
          demoUrl: "https://example.com",
          githubUrl: "https://github.com",
          featured: true,
          metric: "10,000+ Users",
          keyFeatures: ["High performance architecture", "Sub-second response times"],
        },
        ...prev.projects,
      ],
    }));
  };

  const handleDeleteProject = (projId: string) => {
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projId),
    }));
  };

  // EXPERIENCE CRUD
  const handleAddExperience = () => {
    updateData((prev) => ({
      ...prev,
      experience: [
        {
          id: `exp-${Date.now()}`,
          role: "Senior Engineer / Consultant",
          company: "Enterprise Solutions Co.",
          companyUrl: "https://example.com",
          period: "2024 - Present",
          location: "Remote",
          type: "Full-time",
          description: "Directing frontend technical initiatives, performance optimization, and architectural decisions.",
          achievements: ["Improved core vitals by 40%", "Mentored engineering team"],
          technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        },
        ...prev.experience,
      ],
    }));
  };

  const handleDeleteExperience = (expId: string) => {
    updateData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== expId),
    }));
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
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border border-slate-700/50 dark:border-slate-200/50 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-indigo-400 dark:text-indigo-600 animate-pulse" />
          <span className="text-xs font-bold tracking-tight">Full Live Customizer</span>
          {isModified && (
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Customized" />
          )}
        </button>
      </div>

      {/* Slide-Over Drawer with smooth slide-in and slide-out transitions */}
      {isRendered && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop: Fades smoothly in and out */}
          <div
            onClick={handleClose}
            className={`fixed inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity duration-280 ease-out cursor-pointer ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Close backdrop"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pointer-events-none">
            {/* Drawer Panel: Slides smoothly from right to left and back */}
            <div
              className={`w-screen max-w-2xl sm:max-w-3xl lg:max-w-4xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between pointer-events-auto transform transition-transform duration-280 ease-out ${
                isVisible ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      Complete Live Portfolio Editor
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Add, edit, or delete anything live — 100% data.json binding
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Navigation Tabs without any horizontal scrollbar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-semibold [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "personal"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile & Bio</span>
                </button>

                <button
                  onClick={() => setActiveTab("stats")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "stats"
                      ? "bg-indigo-600 text-white shadow-sm"
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
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Skills & Tech</span>
                </button>

                <button
                  onClick={() => setActiveTab("projects")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "projects"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Projects</span>
                </button>

                <button
                  onClick={() => setActiveTab("experience")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "experience"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Experience</span>
                </button>

                <button
                  onClick={() => setActiveTab("contact")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === "contact"
                      ? "bg-indigo-600 text-white shadow-sm"
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
                      ? "bg-indigo-600 text-white shadow-sm"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    {/* CV PDF Upload Option */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <FileUp className="w-4 h-4 text-indigo-500" />
                          <span>Custom CV / Resume (PDF)</span>
                        </label>
                        {uploadedCvName && (
                          <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            {uploadedCvName}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Choose your personal PDF file to bind it immediately to the &ldquo;Download CV&rdquo; buttons on the site:
                      </p>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleCvUpload}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.stats.map((stat, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2"
                          >
                            <div>
                              <span className="text-[10px] text-slate-500">Metric Value</span>
                              <input
                                type="text"
                                value={stat.value}
                                onChange={(e) => handleStatChange(i, "value", e.target.value)}
                                className="w-full px-2 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500">Metric Label</span>
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                {/* TAB 3: SKILLS (FULL CRUD: ADD/EDIT/DELETE SKILLS & CATEGORIES) */}
                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-500 text-xs">
                        Add, customize, or delete skills and categories with instant live binding.
                      </p>
                      <button
                        onClick={handleAddCategory}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Category</span>
                      </button>
                    </div>

                    {data.skills.map((category, catIdx) => (
                      <div
                        key={catIdx}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                          <input
                            type="text"
                            value={category.category}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateData((prev) => {
                                const nextSkills = [...prev.skills];
                                nextSkills[catIdx] = { ...nextSkills[catIdx], category: val };
                                return { ...prev, skills: nextSkills };
                              });
                            }}
                            className="font-bold text-slate-900 dark:text-white bg-transparent border-b border-dashed border-indigo-400 focus:outline-none text-sm"
                          />

                          <div className="flex items-center gap-2">
                            {/* Fixed Add Skill Hover button */}
                            <button
                              onClick={() => handleAddSkill(catIdx)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-semibold text-[11px] hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all cursor-pointer shadow-sm"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Skill</span>
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(catIdx)}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {category.items.map((skill, skillIdx) => (
                            <div
                              key={skillIdx}
                              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-xs"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <input
                                  type="text"
                                  value={skill.name}
                                  onChange={(e) =>
                                    handleSkillNameChange(catIdx, skillIdx, e.target.value)
                                  }
                                  className="font-semibold text-slate-800 dark:text-slate-200 bg-transparent border-b border-dashed border-slate-300 dark:border-slate-600 focus:outline-none text-xs w-full"
                                />
                                <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0 text-xs">
                                  {skill.level}%
                                </span>
                                <button
                                  onClick={() => handleDeleteSkill(catIdx, skillIdx)}
                                  className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded p-1 transition-colors cursor-pointer"
                                  title="Delete Skill"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
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
                                className="w-full accent-indigo-600 cursor-pointer h-1.5"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 4: PROJECTS (FULL CRUD: ADD/EDIT/DELETE) */}
                {activeTab === "projects" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-500 text-xs">
                        Manage your projects portfolio: edit fields or add brand new project cards.
                      </p>
                      <button
                        onClick={handleAddProject}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Project</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.projects.map((proj, pIdx) => (
                        <div
                          key={proj.id}
                          className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                              Project #{pIdx + 1}
                            </span>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                                Metric / Highlight Pill
                              </label>
                              <input
                                type="text"
                                value={proj.metric || ""}
                                onChange={(e) =>
                                  handleProjectChange(pIdx, "metric", e.target.value)
                                }
                                placeholder="e.g. 10,000+ Users"
                                className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                                Tech Stack Tags (comma separated)
                              </label>
                              <input
                                type="text"
                                value={proj.tags.join(", ")}
                                onChange={(e) =>
                                  handleProjectChange(pIdx, "tagsString", e.target.value)
                                }
                                placeholder="Next.js, React, Tailwind CSS"
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
                  </div>
                )}

                {/* TAB 5: EXPERIENCE & TIMELINE CRUD */}
                {activeTab === "experience" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-500 text-xs">
                        Manage your professional work history and career timeline milestones.
                      </p>
                      <button
                        onClick={handleAddExperience}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Experience</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.experience.map((exp, expIdx) => (
                        <div
                          key={exp.id}
                          className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                              Position #{expIdx + 1}
                            </span>
                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
                              className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Delete position"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                                Role / Title
                              </label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData((prev) => {
                                    const nextExp = [...prev.experience];
                                    nextExp[expIdx] = { ...nextExp[expIdx], role: val };
                                    return { ...prev, experience: nextExp };
                                  });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                                Company Name
                              </label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData((prev) => {
                                    const nextExp = [...prev.experience];
                                    nextExp[expIdx] = { ...nextExp[expIdx], company: val };
                                    return { ...prev, experience: nextExp };
                                  });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                                Period
                              </label>
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData((prev) => {
                                    const nextExp = [...prev.experience];
                                    nextExp[expIdx] = { ...nextExp[expIdx], period: val };
                                    return { ...prev, experience: nextExp };
                                  });
                                }}
                                placeholder="e.g. 2022 - Present"
                                className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                                Location & Type
                              </label>
                              <input
                                type="text"
                                value={`${exp.location} • ${exp.type}`}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData((prev) => {
                                    const nextExp = [...prev.experience];
                                    nextExp[expIdx] = { ...nextExp[expIdx], location: val };
                                    return { ...prev, experience: nextExp };
                                  });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase">
                              Role Summary
                            </label>
                            <textarea
                              rows={2}
                              value={exp.description}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateData((prev) => {
                                  const nextExp = [...prev.experience];
                                  nextExp[expIdx] = { ...nextExp[expIdx], description: val };
                                  return { ...prev, experience: nextExp };
                                });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 6: CONTACT & WEB3FORMS KEY */}
                {activeTab === "contact" && (
                  <div className="space-y-4">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>
                )}

                {/* TAB 7: RAW JSON EDITOR WITH SLEEK DARK SCROLLBAR */}
                {activeTab === "json" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Direct data.json Code Editor
                      </span>
                      <button
                        onClick={handleApplyJson}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        Apply JSON Live
                      </button>
                    </div>

                    {appliedJson && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Changes applied successfully across the entire site!</span>
                      </div>
                    )}

                    {jsonError && (
                      <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200">
                        {jsonError}
                      </div>
                    )}

                    {/* Styled Textarea without ugly Windows scrollbars */}
                    <textarea
                      rows={18}
                      value={jsonText}
                      onChange={(e) => setJsonText(e.target.value)}
                      className="w-full p-4 font-mono text-[11px] sm:text-xs leading-relaxed rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
                      spellCheck={false}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2">
                <button
                  onClick={exportDataJson}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
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
