<div align="center">

# 🏠 Airbnb Homepage Clone

### *A pixel-perfect, feature-rich Airbnb-inspired travel platform — built with modern React ecosystem*

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5-FF6B35?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-siddheshsonje29-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/siddheshsonje29)

<br/>

> 🌍 **[Live Demo](#-live-demo)** &nbsp;|&nbsp; 💻 **[Source Code](https://github.com/siddheshsonje29/airbnb-homepage-clone)** &nbsp;|&nbsp; 🐛 **[Report Bug](https://github.com/siddheshsonje29/airbnb-homepage-clone/issues)** &nbsp;|&nbsp; ✨ **[Request Feature](https://github.com/siddheshsonje29/airbnb-homepage-clone/issues)**

</div>

---

## 📖 Project Overview

**Airbnb Homepage Clone** is a full-featured, production-grade front-end application that faithfully recreates the Airbnb user experience with modern tooling and additional AI-powered capabilities. Built as a showcase of advanced React development skills, this project goes far beyond a simple UI clone — it includes interactive maps, real-time weather integration, AI travel assistance, a wishlist system, budget planning, and full authentication flows.

Designed to demonstrate recruiter-ready code quality, clean architecture, and an eye for design details — all packaged with smooth animations and a polished dark/light theme.

---

## 🚀 Live Demo

> 🔗 **[Click here to view the live demo](https://airbnb-homepage-clone-siddhesh.vercel.app)**

*Deployed on Vercel — live and always up to date with the `main` branch.*

---

## ✨ Features

- 🔍 **Smart Search Bar** — Location, date range, and guest picker with smooth UX
- 🏡 **Property Cards** — Responsive grid of rental listings with ratings, prices, and image carousels
- 🗺️ **Interactive Map** — Leaflet-powered map section with property pins
- 🌤️ **Live Weather Widget** — Real-time weather data for searched destinations via `weatherService`
- 🤖 **AI Travel Assistant** — AI-powered chat assistant to help plan trips
- 📅 **Travel Planner** — Dedicated page to organize itineraries
- 💰 **Budget Calculator** — Estimate trip costs with a built-in budget tool
- ❤️ **Wishlist System** — Save and manage favourite properties (persisted via Zustand)
- 🔐 **Authentication Modal** — Sign up / log in flow with `react-hook-form` validation
- 👤 **User Profile Page** — View and manage account details
- 🎨 **Dark / Light Theme** — System-aware theming with smooth transitions
- 📱 **Fully Responsive** — Mobile-first design across all screen sizes
- ⚡ **Framer Motion Animations** — Page transitions and micro-animations throughout
- 🧭 **Category Filter** — Filter listings by property type / category

---

## 🛠️ Technologies Used

| Category | Technology | Version |
|---|---|---|
| **UI Framework** | React | ^19.2.6 |
| **Language** | TypeScript | ~6.0.2 |
| **Build Tool** | Vite | ^8.0.12 |
| **Styling** | Tailwind CSS v4 | ^4.3.1 |
| **State Management** | Zustand | ^5.0.14 |
| **Routing** | React Router DOM | ^7.18.0 |
| **Animations** | Framer Motion | ^12.40.0 |
| **Maps** | Leaflet + React Leaflet | ^1.9.4 / ^5.0.0 |
| **Forms** | React Hook Form | ^7.80.0 |
| **Icons** | Lucide React | ^1.21.0 |
| **HTTP Client** | Axios | ^1.18.0 |
| **Linting** | ESLint + TypeScript ESLint | ^10.3.0 |

---

## 📁 Folder Structure

```
airbnb-homepage-clone/
├── public/                     # Static assets (favicon, og-image, etc.)
├── src/
│   ├── assets/                 # Images, SVGs, and static media
│   ├── components/             # Reusable UI components
│   │   ├── AITravelAssistant/  # AI-powered travel chat component
│   │   ├── AuthModal/          # Login / Signup modal
│   │   ├── BudgetCalculator/   # Trip budget estimator
│   │   ├── CategoryFilter/     # Property category filter bar
│   │   ├── ExperienceCard/     # Airbnb Experiences listing card
│   │   ├── Footer/             # Site footer
│   │   ├── Hero/               # Homepage hero / banner section
│   │   ├── Logo/               # Brand logo component
│   │   ├── MapSection/         # Interactive Leaflet map
│   │   ├── Navbar/             # Top navigation bar
│   │   ├── PropertyCard/       # Individual property listing card
│   │   ├── SearchBar/          # Location / date / guest search
│   │   └── WeatherWidget/      # Live weather display
│   ├── data/                   # Static mock data (properties, experiences)
│   ├── pages/                  # Route-level page components
│   │   ├── Auth/               # Authentication page
│   │   ├── Experiences/        # Airbnb Experiences listing page
│   │   ├── Home/               # Main homepage
│   │   ├── NotFound/           # 404 page
│   │   ├── Profile/            # User profile page
│   │   ├── PropertyDetails/    # Single property detail view
│   │   ├── TravelPlanner/      # Trip planning page
│   │   └── Wishlist/           # Saved properties page
│   ├── routes/
│   │   └── AppRoutes.tsx       # Centralised React Router route definitions
│   ├── services/
│   │   └── weatherService.ts   # Axios-based weather API integration
│   ├── store/                  # Zustand global state stores
│   │   ├── useAuthStore.ts     # Authentication state
│   │   ├── usePropertyStore.ts # Property listings state
│   │   ├── useThemeStore.ts    # Dark/light theme toggle
│   │   └── useWishlistStore.ts # Wishlist state
│   ├── App.tsx                 # Root app component with layout
│   ├── main.tsx                # React DOM entry point
│   ├── index.css               # Global styles & Tailwind directives
│   └── App.css                 # App-level scoped styles
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript root config
├── tsconfig.app.json           # TypeScript app config
├── tailwind.config.ts          # Tailwind CSS configuration
├── eslint.config.js            # ESLint configuration
└── package.json                # Project metadata and scripts
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- **npm** ≥ 9.x (comes with Node.js)
- **Git** — [Download](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/siddheshsonje29/airbnb-homepage-clone.git
cd airbnb-homepage-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root (see [Environment Variables](#-environment-variables) section below):

```bash
cp .env.example .env
```

### 4. Start Development Server

```bash
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)** 🎉

---

## 🔨 Build for Production

```bash
npm run build
```

The optimized output will be generated in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

### ▲ Deploy on Vercel *(Recommended)*

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set the **Framework Preset** to `Vite`.
5. Add your [environment variables](#-environment-variables) in the Vercel dashboard.
6. Click **"Deploy"** — Vercel handles the rest!

**Or use the Vercel CLI:**

```bash
npm install -g vercel
vercel --prod
```

---

### 🌍 Deploy on Netlify

1. Push your code to GitHub.
2. Go to [netlify.com](https://netlify.com) and click **"Add new site" → "Import an existing project"**.
3. Connect your GitHub repository.
4. Configure the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add your [environment variables](#-environment-variables) in the Netlify dashboard under **Site settings → Environment variables**.
6. Click **"Deploy site"**.

> **⚠️ Important for Netlify SPA routing:** Create a `public/_redirects` file with the following content to handle client-side routing:
>
> ```
> /* /index.html 200
> ```

---

## 🔑 Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```env
# Weather API (OpenWeatherMap)
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5

# AI Travel Assistant API (if applicable)
VITE_AI_API_KEY=your_ai_api_key_here
VITE_AI_API_BASE_URL=https://your-ai-api-endpoint.com
```

> **Note:** All Vite environment variables **must** be prefixed with `VITE_` to be accessible in the browser.
>
> Never commit your `.env` file — it's already listed in `.gitignore`.

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><strong>🏠 Homepage — Light Mode</strong></td>
    <td align="center"><strong>🌙 Homepage — Dark Mode</strong></td>
  </tr>
  <tr>
    <td><img src="./public/screenshots/home-light.png" alt="Homepage Light Mode" width="100%"/></td>
    <td><img src="./public/screenshots/home-dark.png" alt="Homepage Dark Mode" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><strong>🗺️ Map View</strong></td>
    <td align="center"><strong>🏡 Property Details</strong></td>
  </tr>
  <tr>
    <td><img src="./public/screenshots/map-view.png" alt="Map View" width="100%"/></td>
    <td><img src="./public/screenshots/property-details.png" alt="Property Details" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><strong>🤖 AI Travel Assistant</strong></td>
    <td align="center"><strong>❤️ Wishlist Page</strong></td>
  </tr>
  <tr>
    <td><img src="./public/screenshots/ai-assistant.png" alt="AI Travel Assistant" width="100%"/></td>
    <td><img src="./public/screenshots/wishlist.png" alt="Wishlist" width="100%"/></td>
  </tr>
</table>

> **📸 Note:** Replace the placeholder paths above with actual screenshots from your project. Store screenshots in `public/screenshots/`.

---

## 🔮 Future Enhancements

- [ ] 🗓️ **Booking System** — Full date-range booking flow with availability calendar
- [ ] 💳 **Payment Integration** — Stripe-powered checkout for mock bookings
- [ ] 🌐 **i18n / Localization** — Multi-language support (English, Hindi, Spanish)
- [ ] 🔔 **Push Notifications** — Real-time alerts for wishlist price drops
- [ ] 📊 **Host Dashboard** — Analytics and listing management for property hosts
- [ ] 🧪 **Unit & E2E Tests** — Vitest + Playwright test coverage
- [ ] ♿ **Accessibility Audit** — Full WCAG 2.1 AA compliance
- [ ] 📱 **PWA Support** — Offline mode and installable Progressive Web App
- [ ] 🔗 **Backend Integration** — Connect to a real REST / GraphQL API with authentication
- [ ] 🤖 **Enhanced AI Planner** — Multi-turn conversation with itinerary export

---

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! 🎉

1. **Fork** the repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/your-amazing-feature
   ```
3. **Commit** your changes (follow [Conventional Commits](https://www.conventionalcommits.org/)):
   ```bash
   git commit -m "feat: add your amazing feature"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-amazing-feature
   ```
5. Open a **Pull Request** on GitHub and describe your changes clearly.

### Code Style

- Run `npm run lint` before submitting a PR.
- Follow the existing TypeScript and component conventions.
- Keep components small, focused, and reusable.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

> This project is a **front-end clone built for educational and portfolio purposes only**. It is not affiliated with, endorsed by, or connected to Airbnb, Inc.

---



[![GitHub](https://img.shields.io/badge/GitHub-siddheshsonje29-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/siddheshsonje29)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/siddheshsonje29)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF5A5F?style=for-the-badge&logo=airbnb&logoColor=white)](https://siddheshsonje29.github.io)


</div>

---


</div>
