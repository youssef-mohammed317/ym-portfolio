"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2, ArrowUpRight } from "lucide-react";

export function Experience() {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Experience & Education
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            A track record of high-impact engineering roles, successful projects, and academic background.
          </p>
        </div>

        {/* Tab Toggle: Experience vs Education */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "experience"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "education"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education & Certs</span>
            </button>
          </div>
        </div>

        {/* Timeline View */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {activeTab === "experience"
            ? data.experience.map((exp, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={exp.id}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? "md:flex-row-reverse" : ""
                    } group`}
                  >
                    {/* Timeline Node Icon in Center */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center shadow-md z-10 top-5 group-hover:scale-125 transition-transform">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                    </div>

                    {/* Content Card */}
                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isEven ? "md:mr-auto md:text-right" : "md:ml-auto"
                      }`}
                    >
                      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700/70 shadow-sm hover:shadow-md transition-all">
                        {/* Period & Role Type */}
                        <div
                          className={`flex items-center gap-2 mb-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 ${
                            isEven ? "md:justify-end" : "justify-start"
                          }`}
                        >
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.period}
                          </span>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50">
                            {exp.type}
                          </span>
                        </div>

                        {/* Role Title */}
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {exp.role}
                        </h3>

                        {/* Company & Location */}
                        <div
                          className={`flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-1 mb-3 ${
                            isEven ? "md:justify-end" : "justify-start"
                          }`}
                        >
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
                            >
                              <span>{exp.company}</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="font-semibold">{exp.company}</span>
                          )}
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 text-left">
                          {exp.description}
                        </p>

                        {/* Bullet Achievements */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="space-y-1.5 mb-4 text-left">
                            {exp.achievements.map((ach, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{ach}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Technologies */}
                        <div
                          className={`flex flex-wrap gap-1.5 ${
                            isEven ? "md:justify-end" : "justify-start"
                          }`}
                        >
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : data.education.map((edu, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={edu.id}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? "md:flex-row-reverse" : ""
                    } group`}
                  >
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center shadow-md z-10 top-5 group-hover:scale-125 transition-transform">
                      <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>

                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isEven ? "md:mr-auto md:text-right" : "md:ml-auto"
                      }`}
                    >
                      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700/70 shadow-sm transition-all">
                        <span className="inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                          {edu.period} • {edu.location}
                        </span>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {edu.degree}
                        </h3>

                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1 mb-3">
                          {edu.institution}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3 text-left">
                          {edu.description}
                        </p>

                        {edu.highlights && (
                          <div className="space-y-1 text-left">
                            {edu.highlights.map((h, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
