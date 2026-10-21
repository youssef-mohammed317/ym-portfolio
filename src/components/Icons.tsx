"use client";

import React from "react";
import {
  Globe,
  ExternalLink,
  Code,
  Layers,
  Cpu,
  Server,
  Database,
  Cloud,
  Shield,
  GitBranch,
  Box,
  CheckCircle2,
  TrendingUp,
  Zap,
  Sparkles,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Moon,
  Sun,
  Menu,
  X,
  Send,
  Eye,
  Check,
  Palette,
  ArrowUpRight,
  Terminal,
} from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

// Brand SVG Icons
export function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function TwitterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function DribbbleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}

export function FigmaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

export function CodewarsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.012 0c-.57 0-1.11.23-1.51.64L1.768 9.38a2.14 2.14 0 0 0 0 3.03l8.734 8.74c.4.41.94.64 1.51.64.57 0 1.11-.23 1.51-.64l8.734-8.74a2.14 2.14 0 0 0 0-3.03L13.522.64A2.12 2.12 0 0 0 12.012 0zm0 4.19l6.39 6.39-6.39 6.39-6.39-6.39 6.39-6.39z" />
    </svg>
  );
}

export function Icon({ name, className = "w-5 h-5", size }: IconProps) {
  const cleanName = name?.toLowerCase().trim() || "";

  // Handle custom brand SVGs
  if (cleanName === "github") return <GithubIcon className={className} />;
  if (cleanName === "linkedin") return <LinkedinIcon className={className} />;
  if (cleanName === "twitter" || cleanName === "x") return <TwitterIcon className={className} />;
  if (cleanName === "dribbble") return <DribbbleIcon className={className} />;
  if (cleanName === "figma") return <FigmaIcon className={className} />;
  if (cleanName === "codewars") return <CodewarsIcon className={className} />;

  // Lucide icon components
  const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
    globe: Globe,
    "external-link": ExternalLink,
    code: Code,
    layers: Layers,
    cpu: Cpu,
    server: Server,
    database: Database,
    cloud: Cloud,
    shield: Shield,
    git: GitBranch,
    box: Box,
    "check-circle": CheckCircle2,
    "trending-up": TrendingUp,
    zap: Zap,
    sparkles: Sparkles,
    "message-square": MessageSquare,
    mail: Mail,
    phone: Phone,
    "map-pin": MapPin,
    calendar: Calendar,
    download: Download,
    "file-text": FileText,
    briefcase: Briefcase,
    "graduation-cap": GraduationCap,
    award: Award,
    star: Star,
    moon: Moon,
    sun: Sun,
    menu: Menu,
    close: X,
    send: Send,
    eye: Eye,
    check: Check,
    palette: Palette,
    "arrow-up-right": ArrowUpRight,
    terminal: Terminal,
    nextjs: Code,
    react: Code,
    typescript: Code,
    tailwind: Palette,
    network: Server,
  };

  const Component = iconMap[cleanName] || Code;
  return <Component className={className} size={size} />;
}
