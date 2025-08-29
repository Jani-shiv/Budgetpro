# 💰 BudgetPro - Modern Budget Management Application

A comprehensive full-stack budget management application built with modern technologies and best practices.

## 🚀 Tech Stack

### Frontend
- **React.js** (Web) with Next.js 14
- **React Native** (Mobile) with Expo
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Query** for data fetching & caching
- **Recharts** for web analytics
- **Victory Native** for mobile charts

### Backend
- **Node.js + Express** REST API
- **MongoDB Atlas** database
- **JWT** authentication
- **Zod** validation
- **TypeScript** throughout

### DevOps & Tools
- **Turborepo** monorepo management
- **Docker** containerization
- **GitHub Actions** CI/CD
- **ESLint + Prettier** code formatting
- **Jest** testing framework

## 📱 Features

- ✅ User authentication (signup/login/reset password)
- ✅ Add/Edit/Delete Income & Expenses
- ✅ Categorize expenses (Food, Travel, Bills, etc.)
- ✅ Set monthly/yearly budgets
- ✅ Reports & analytics with charts
- ✅ Notifications/reminders for bills
- ✅ Offline mode for mobile
- ✅ Sync across devices
- ✅ Responsive design
- ✅ Real-time updates

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- MongoDB (local or Atlas)
- Docker (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Jani-shiv/Budgetpro.git
cd Budgetpro
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env.local
```

4. **Start MongoDB** (if running locally)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. **Start the development servers**
```bash
npm run dev
```

This will start:
- API server on http://localhost:3001
- Web app on http://localhost:3000

## 📦 Available Scripts

- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps for production
- `npm run test` - Run tests across all apps
- `npm run lint` - Lint all code
- `npm run format` - Format all code with Prettier

## 🔧 Configuration

Update environment variables in:
- `apps/api/.env` - Backend configuration
- `apps/web/.env.local` - Frontend configuration

## 🚀 Deployment

### Backend
Deploy to Render, AWS, or any Node.js hosting service

### Frontend  
Deploy to Vercel, Netlify, or any static hosting service

## 📊 API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/transactions` - Get transactions
- `POST /api/transactions` - Create transaction
- `GET /api/budgets` - Get budgets
- `POST /api/budgets` - Create budget
- `GET /api/reports/monthly` - Monthly reports

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch  
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details.

---

**Made with 💻 and ☕ by [Jani-shiv](https://github.com/Jani-shiv)**
