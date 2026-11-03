"use client";

import React from "react";
import { ExternalLink, GitFork, Star, FolderGit2, ShieldCheck, Server, Layers, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface OrgCard {
  name: string;
  badge: string;
  tagline: string;
  description: string;
  url: string;
  repoCount: string;
  primaryTech: string[];
  keyRepos: { name: string; url: string; desc: string }[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export function GithubOrgs() {
  const orgs: OrgCard[] = [
    {
      name: "ym-harsha-ecommerce-microservices",
      badge: "Distributed Microservices Ecosystem",
      tagline: "5-Repository Microservices Suite with Kubernetes (AKS) & CI/CD",
      description:
        "Full-scale event-driven eCommerce architecture engineered across 5 decoupled repositories with polyglot persistence, Ocelot API Gateway, RabbitMQ messaging, Redis cache invalidation, Polly resilience, and automated deployment to Kubernetes.",
      url: "https://github.com/ym-harsha-ecommerce-microservices",
      repoCount: "6 Repositories",
      primaryTech: [".NET 8", "Kubernetes", "Ocelot", "RabbitMQ", "Redis", "MongoDB", "MySQL", "PostgreSQL", "Docker"],
      keyRepos: [
        {
          name: "orders-api",
          url: "https://github.com/ym-harsha-ecommerce-microservices/orders-api",
          desc: "MongoDB orchestration hub with Redis caching & Polly resilience policies",
        },
        {
          name: "products-api",
          url: "https://github.com/ym-harsha-ecommerce-microservices/products-api",
          desc: "Minimal API + MySQL, publishing RabbitMQ cache invalidation events",
        },
        {
          name: "users-api",
          url: "https://github.com/ym-harsha-ecommerce-microservices/users-api",
          desc: "Identity microservice with PostgreSQL & high-speed raw Dapper queries",
        },
        {
          name: "ecommerce-infrastructure",
          url: "https://github.com/ym-harsha-ecommerce-microservices/ecommerce-infrastructure",
          desc: "Kubernetes manifests, seeded DB images, and automated GitHub Actions CI/CD",
        },
      ],
      icon: Server,
      accentColor: "from-blue-600 to-cyan-500",
    },
    {
      name: "ym-udemy-dotnet-path",
      badge: "Enterprise Clean Architecture & CQRS",
      tagline: "MediatR, Domain-Driven Design, Azure Cloud & Full Testing",
      description:
        "Comprehensive enterprise repository hub implementing Clean Architecture across scalable .NET applications. Features thin API controllers, MediatR commands/queries, FluentValidation, Serilog logging, and Azure cloud integrations.",
      url: "https://github.com/ym-udemy-dotnet-path",
      repoCount: "8 Repositories",
      primaryTech: ["ASP.NET Core 10", "Clean Architecture", "CQRS", "MediatR", "xUnit & Moq", "Azure SQL", "Serilog"],
      keyRepos: [
        {
          name: "clean-architecture-template",
          url: "https://github.com/ym-udemy-dotnet-path/clean-architecture-template",
          desc: "8-layer production-ready boilerplate with MediatR, Commands & Handlers",
        },
        {
          name: "restaurants-api",
          url: "https://github.com/ym-udemy-dotnet-path/restaurants-api",
          desc: "Resource-based authorization, Serilog logging, and Azure App Service deployment",
        },
        {
          name: "hr-leave-management-api",
          url: "https://github.com/ym-udemy-dotnet-path/hr-leave-management-api",
          desc: "Role-based HR workflow with 100% regression-free xUnit/Moq unit test suite",
        },
        {
          name: "harsha-aspnetcore-assignments",
          url: "https://github.com/ym-udemy-dotnet-path/harsha-aspnetcore-assignments",
          desc: "Stocks Trading Platform, Banking and eCommerce capstones in ASP.NET Core 10",
        },
      ],
      icon: Layers,
      accentColor: "from-indigo-600 to-purple-500",
    },
    {
      name: "ym-route-backend-diploma",
      badge: "Route IT Training Center Enterprise Diploma",
      tagline: "7-Layer Onion Architecture, Redis Caching & Stripe Payments",
      description:
        "Diploma repository collection from Route Academy. Showcases a complete enterprise eCommerce API adhering to Onion Architecture with dual Identity contexts, Redis caching, Generic Repository & Unit of Work, and Stripe checkout.",
      url: "https://github.com/ym-route-backend-diploma",
      repoCount: "6 Repositories",
      primaryTech: [".NET 8", "Onion Architecture", "Redis", "Stripe API", "SQL Server", "EF Core", "Angular Client"],
      keyRepos: [
        {
          name: "ecommerce-api-onion",
          url: "https://github.com/ym-route-backend-diploma/ecommerce-api-onion",
          desc: "7-layer Onion Architecture with Redis basket caching & Stripe payment integration",
        },
        {
          name: "gym-management-mvc",
          url: "https://github.com/ym-route-backend-diploma/gym-management-mvc",
          desc: "3-layer MVC system with presentation, business logic, and repository separation",
        },
        {
          name: "csharp-advanced",
          url: "https://github.com/ym-route-backend-diploma/csharp-advanced",
          desc: "Deep-dive implementations of advanced C# features, delegates, generics & LINQ",
        },
        {
          name: "efcore-linq",
          url: "https://github.com/ym-route-backend-diploma/efcore-linq",
          desc: "Advanced relational mappings, query optimizations, and database-first paradigms",
        },
      ],
      icon: ShieldCheck,
      accentColor: "from-emerald-600 to-teal-500",
    },
    {
      name: "youssef-mohammed317",
      badge: "Personal Flagship & DevOps Repositories",
      tagline: "Modular Monoliths, YARP Gateways, DEPI DevOps & C++ Algorithms",
      description:
        "Primary GitHub profile featuring independent flagship architectures (.NET 10 Modular Monolith with Transactional Outbox, YARP microservices with gRPC), infrastructure automation, and 250+ CodeWars algorithmic solutions.",
      url: "https://github.com/Youssef-Mohammed317",
      repoCount: "9+ Repositories • 250+ Katas",
      primaryTech: [".NET 10", "MediatR Outbox", "YARP Gateway", "Docker", "Kubernetes", "Terraform", "C++ DSA"],
      keyRepos: [
        {
          name: "eshop-modulith",
          url: "https://github.com/youssef-mohammed317/eshop-modulith",
          desc: "Modular Monolith eCommerce with MediatR, Keycloak, and Transactional Outbox + RabbitMQ",
        },
        {
          name: "eshop-microservices",
          url: "https://github.com/youssef-mohammed317/eshop-microservices",
          desc: "4 microservices behind YARP Gateway with MassTransit/RabbitMQ and high-speed gRPC",
        },
        {
          name: "data-structures-implementations",
          url: "https://github.com/youssef-mohammed317/data-structures-implementations",
          desc: "From-scratch C++ DSA implementation organized in dedicated branches (Graphs, DP, Trees)",
        },
        {
          name: "depi-devops-workshop",
          url: "https://github.com/youssef-mohammed317/depi-devops-workshop",
          desc: "Hands-on Infrastructure as Code, Terraform, Docker, and Kubernetes deployment pipelines",
        },
      ],
      icon: Cpu,
      accentColor: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section id="organizations" className="py-20 md:py-28 relative bg-white/40 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>GitHub Architecture Hubs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            GitHub Organizations & Multi-Repo Ecosystems
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            To reflect true enterprise architecture, my projects are structured into dedicated GitHub Organizations
            separating distributed microservices, clean architectures, and cloud DevOps infrastructure.
          </p>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {orgs.map((org, index) => {
            const IconComponent = org.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700/70 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Badge & Repo Count */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{org.badge}</span>
                    </span>

                    <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {org.repoCount}
                    </span>
                  </div>

                  {/* Org Title & Link */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:underline"
                    >
                      <span>{org.name}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {org.tagline}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {org.description}
                  </p>

                  {/* Key Repos List */}
                  <div className="mt-5 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Key Repositories in this Ecosystem:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {org.keyRepos.map((repo, rIdx) => (
                        <a
                          key={rIdx}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/80 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all flex flex-col justify-between group/repo"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/repo:text-indigo-600 dark:group-hover/repo:text-indigo-400 flex items-center gap-1.5 truncate">
                              <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{repo.name}</span>
                            </span>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover/repo:text-indigo-500 shrink-0" />
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                            {repo.desc}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Primary Tech Badges */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                    {org.primaryTech.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Explore all code & architecture
                  </span>
                  <a
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 transition-all hover:scale-[1.02]"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
