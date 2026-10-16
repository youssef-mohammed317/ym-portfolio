"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Icon } from "@/components/Icons";
import { Cpu, CheckCircle } from "lucide-react";

export function Skills() {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section id="skills" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Stack & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & Technical Expertise
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            A comprehensive overview of technologies, frameworks, and modern developer tooling I use in production.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {data.skills.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(index)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === index
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]"
                  : "bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Selected Category Description */}
        {data.skills[selectedCategory]?.description && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            {data.skills[selectedCategory].description}
          </p>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.skills[selectedCategory]?.items.map((skill, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700/70 shadow-sm transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={skill.icon || "code"} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {skill.name}
                    </h4>
                    {skill.badge && (
                      <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                        {skill.badge}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
