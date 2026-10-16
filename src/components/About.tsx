"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Icon } from "@/components/Icons";
import { User, CheckCircle, Sparkles } from "lucide-react";

export function About() {
  const { data } = usePortfolio();

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Get To Know Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About My Work & Background
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Passionate about turning complex system requirements into intuitive, elegant digital products.
          </p>
        </div>

        {/* Story & Quick Facts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span>My Journey & Philosophy</span>
              </h3>
              {data.about.story.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-slate-600 dark:text-slate-300 leading-relaxed text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Value Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.about.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 hover:border-indigo-300 dark:hover:border-indigo-800/60 transition-all hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                    <Icon name={highlight.icon || "sparkles"} className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                    {highlight.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Facts & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/30 border border-indigo-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Key Information At A Glance</span>
              </h3>

              <div className="space-y-4">
                {data.about.quickFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/60 last:border-0 last:pb-0 gap-1"
                  >
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {fact.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Direct Email Action inside About */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Prefer direct contact?
                </div>
                <a
                  href={`mailto:${data.personal.email}`}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {data.personal.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
