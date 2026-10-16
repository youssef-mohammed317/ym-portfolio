"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Icon } from "@/components/Icons";
import { ArrowUp, Heart, Code2 } from "lucide-react";

export function Footer() {
  const { data } = usePortfolio();
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800/60">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1.5px]">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-indigo-600 text-sm">
                {data.personal.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {data.personal.name}
              </span>
              <p className="text-xs text-slate-500">{data.personal.headline}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {data.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
              >
                <Icon name={social.icon || social.platform} className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Credits & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>
            © {currentYear} {data.personal.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Built with Next.js & Tailwind CSS</span>
            <span>•</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
              100% data.json Driven
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
