# 🚀 AIHR4U – Futuristic HRMS Web Application

**AIHR4U** is a modern, scalable, and responsive Human Resource Management System (HRMS) portal designed for IT and non-IT companies. It supports multi-tenant companies, advanced dashboards, and real-time features with an attractive, lightning-fast UI.

---

## 📌 Features

- ✅ Company ID Check + Smart Redirect
- ✅ Secure Login with Reset/Forgot Password
- ✅ HR/Admin Dashboard with:
  - Recharts for analytics
  - Leave Balances
  - Payroll stats
  - Smart Leave Suggestions
- ✅ Role-based authentication (Admin, HR, Employee)
- ✅ Responsive design with animations
- ✅ Multi-language support (English, Hindi)
- ✅ Progressive Web App (PWA) ready
- ✅ Modern UI using `shadcn/ui` + Tailwind CSS

---

## 🛠 Tech Stack

| Tech                         | Purpose                                |
|-----------------------------|----------------------------------------|
| React + TypeScript          | Frontend logic & structure             |
| Tailwind CSS                | Utility-first responsive styling       |
| Framer Motion               | Page & element animations              |
| Chart.js / Recharts         | Graphs and analytics                   |
| React Hook Form + Yup       | Smart form validation                  |
| shadcn/ui                   | Reusable and styled UI components      |
| i18next                     | Multi-language support                 |
| Axios                       | API calls                              |
| PWA (Vite + Service Worker) | Offline support & app installation     |

---

## 📁 Folder Structure



aihr4u/
├── public/
├── src/
│ ├── assets/
│ ├── components/ # Reusable UI components
│ ├── pages/ # CompanyCheck, Login, Dashboard
│ ├── services/ # Axios instances, API helpers
│ ├── hooks/ # Custom hooks like useAuth
│ ├── i18n/ # Multi-language config
│ ├── utils/ # Form validation, constants
│ ├── App.tsx
│ ├── main.tsx
├── .env # Environment config
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts


## yaml file


## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/aihr4u.git
cd aihr4u

# Install dependencies
npm install

# Set up .env
cp .env.example .env
# Update API URLs and keys

# Run dev server
npm run dev
