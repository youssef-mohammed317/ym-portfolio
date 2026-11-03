"use client";

import React, { useState, useMemo } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ProjectItem } from "@/types/portfolio";
import { ProjectModal } from "@/components/ProjectModal";
import {
  FolderGit2,
  Search,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Layers,
  X,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export function Projects() {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = useMemo(() => {
    if (data.projectCategories && data.projectCategories.length > 0) {
      return data.projectCategories;
    }
    const cats = new Set(data.projects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [data.projectCategories, data.projects]);

  const filteredProjects = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    const cleanQuery = rawQuery.replace(/[^a-z0-9]/g, "");

    const isMatch = (project: ProjectItem) => {
      if (!rawQuery) return true;

      const titleRaw = project.title.toLowerCase();
      const titleClean = titleRaw.replace(/[^a-z0-9]/g, "");

      const taglineRaw = (project.tagline || "").toLowerCase();
      const taglineClean = taglineRaw.replace(/[^a-z0-9]/g, "");

      const descRaw = project.description.toLowerCase();
      const descClean = descRaw.replace(/[^a-z0-9]/g, "");

      const categoryRaw = project.category.toLowerCase();
      const categoryClean = categoryRaw.replace(/[^a-z0-9]/g, "");

      const tagsRaw = project.tags.map((t) => t.toLowerCase()).join(" ");
      const tagsClean = tagsRaw.replace(/[^a-z0-9]/g, "");

      const featuresRaw = (project.keyFeatures || []).join(" ").toLowerCase();
      const featuresClean = featuresRaw.replace(/[^a-z0-9]/g, "");

      return (
        titleRaw.includes(rawQuery) ||
        (cleanQuery && titleClean.includes(cleanQuery)) ||
        taglineRaw.includes(rawQuery) ||
        (cleanQuery && taglineClean.includes(cleanQuery)) ||
        descRaw.includes(rawQuery) ||
        (cleanQuery && descClean.includes(cleanQuery)) ||
        categoryRaw.includes(rawQuery) ||
        (cleanQuery && categoryClean.includes(cleanQuery)) ||
        tagsRaw.includes(rawQuery) ||
        (cleanQuery && tagsClean.includes(cleanQuery)) ||
        featuresRaw.includes(rawQuery) ||
        (cleanQuery && featuresClean.includes(cleanQuery))
      );
    };

    // If a search query is active
    if (rawQuery) {
      // If user selected a specific category, first check within that category
      if (selectedCategory !== "All") {
        const withinCategory = data.projects.filter(
          (p) =>
            p.category.toLowerCase() === selectedCategory.toLowerCase() &&
            isMatch(p)
        );
        // If results exist in the selected category, return them
        if (withinCategory.length > 0) return withinCategory;
      }
      // Otherwise, search across all projects so user never misses a result
      return data.projects.filter(isMatch);
    }

    // Default category filtering when not searching
    return data.projects.filter((project) => {
      return (
        selectedCategory === "All" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    });
  }, [data.projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Enterprise Repositories & Architectures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Engineering Projects & Repositories
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Architected with strict Clean Architecture, Domain-Driven Design, distributed messaging, and cloud deployments.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input with Clear Button */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by tech, name, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results Summary Status */}
        {searchQuery && (
          <div className="mb-8 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              Found <strong className="text-indigo-600 dark:text-indigo-400">{filteredProjects.length}</strong> project{filteredProjects.length === 1 ? "" : "s"} matching &ldquo;{searchQuery}&rdquo;
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mt-6">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No projects found matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset the filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700/70 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Project Image */}
                <div
                  onClick={() => setActiveProject(project)}
                  className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-sm">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-600 text-white shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Metric on bottom of image */}
                  {project.metric && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/90 text-white backdrop-blur-md shadow-sm">
                        {project.metric}
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setActiveProject(project)}
                      className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[11px] font-medium text-slate-400">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        Case Study & Details
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View source code"
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View live demo"
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
