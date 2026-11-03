# ⚡ Youssef Mohamed Abd El-Fattah — Official Developer Portfolio

> **Personal developer portfolio and engineering showcase of Youssef Mohamed Abd El-Fattah, .NET Backend Engineer and DevOps Practitioner.**  
> Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4** — statically optimized for global edge delivery on **Cloudflare Pages**.

---

## 🌟 Engineering Profile

- **🚀 Domain Specialization**: Distributed .NET Microservices, Modular Monoliths, Clean Architecture, Onion Architecture, and Domain-Driven Design (DDD).
- **☁️ Cloud & DevOps (DEPI)**: Containerization with Docker, orchestration with Kubernetes (AKS & Minikube), Infrastructure as Code with Terraform, and automated GitHub Actions CI/CD.
- **⚡ High Performance & Messaging**: Asynchronous event-driven communication via RabbitMQ & MassTransit, sub-millisecond inter-service calls via gRPC, and YARP / Ocelot API Gateways.
- **🧠 Problem Solving**: 250+ solved Katas on CodeWars and from-scratch C++ implementations of complex Data Structures & Algorithms.
- **🎓 Academic Background**: Computer Engineering Department, Faculty of Engineering, Benha University (Class of 2027) with an **Excellent grade (92%)**.

---

## 🏛️ GitHub Organizations & Architecture Hubs

My engineering work is organized into dedicated, production-grade GitHub Organizations separating microservices, clean architectures, and diploma implementations:

1. [**`ym-harsha-ecommerce-microservices`**](https://github.com/ym-harsha-ecommerce-microservices):
   - 5-Repository Microservices Suite with Kubernetes (AKS) & GitHub Actions CI/CD.
   - Includes Ocelot API Gateway, Orders API (MongoDB & Polly), Products Minimal API (MySQL), Users API (PostgreSQL + Dapper), and Kubernetes Infrastructure.
2. [**`ym-udemy-dotnet-path`**](https://github.com/ym-udemy-dotnet-path):
   - Enterprise Clean Architecture, CQRS, MediatR, and Azure Cloud services.
   - Features 8-layer Clean Architecture templates, Restaurants API, HR Leave Management, and a full Stocks Trading Platform.
3. [**`ym-route-backend-diploma`**](https://github.com/ym-route-backend-diploma):
   - Route IT Training Center Diploma implementations.
   - 7-layer Onion Architecture eCommerce API with dual Identity contexts, Redis basket caching, and Stripe payments.
4. [**`youssef-mohammed317`**](https://github.com/Youssef-Mohammed317):
   - Personal profile hosting `eshop-modulith` (MediatR & Transactional Outbox), `eshop-microservices` (YARP & gRPC), DEPI DevOps workshops, and C++ DSA.

---

## 📁 Repository Architecture

```
developer-portfolio-template/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Dynamic SEO metadata & OpenGraph tags
│   │   ├── page.tsx           # Assembled portfolio sections
│   │   └── globals.css        # Tailwind v4 theme and custom dark variant
│   ├── components/
│   │   ├── Navbar.tsx         # Glassmorphism header & theme switch
│   │   ├── Hero.tsx           # Headline, bio, avatar, and quick stats
│   │   ├── About.tsx          # Academic standing & engineering journey
│   │   ├── Skills.tsx         # Categorized tech stack & proficiencies
│   │   ├── Experience.tsx     # DEPI DevOps intern, ITI, & Route diploma
│   │   ├── GithubOrgs.tsx     # 🌟 Showcase of 4 GitHub Organizations & repos
│   │   ├── Projects.tsx       # Filterable showcase with smart keyword search
│   │   ├── ProjectModal.tsx   # Project architecture case study dialog
│   │   ├── Testimonials.tsx   # Instructor & academic recommendations
│   │   ├── Contact.tsx        # Direct messaging form with real-time validation
│   │   ├── ResumeModal.tsx    # Live formatted printable CV & PDF download
│   │   ├── Icons.tsx          # SVG & brand icons (GitHub, Codewars, etc.)
│   │   └── Providers.tsx      # Theme and Portfolio context providers
│   ├── context/
│   │   ├── ThemeContext.tsx   # Dark/light theme state
│   │   └── PortfolioContext.tsx # Central data provider
│   ├── data/
│   │   └── data.json          # 🌟 Single source of truth for portfolio data
│   └── types/
│       └── portfolio.ts       # TypeScript interfaces for portfolio data
├── public/
│   ├── avatar.jpg             # User portrait
│   ├── resume.pdf             # Youssef's verified CV
│   └── _headers               # Cloudflare Pages edge caching & security headers
├── wrangler.toml              # Cloudflare Pages static assets configuration
└── package.json
```

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build Static HTML Export
```bash
npm run build
```
Generates the optimized static distribution in `out/`.

---

## ⚡ Deployment & CI/CD

This website is automatically built and deployed to **Cloudflare Pages** via GitHub Actions on every push to `main` or `master`.
- **Workflow**: `.github/workflows/ci-cd.yml`
- **Output Directory**: `out`
