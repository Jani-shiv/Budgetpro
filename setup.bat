@echo off
REM BudgetPro Development Setup Script for Windows

echo 🚀 Setting up BudgetPro Development Environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is required but not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

REM Copy environment files if they don't exist
echo 🔧 Setting up environment files...

if not exist "apps\api\.env" (
    copy "apps\api\.env.example" "apps\api\.env"
    echo ✅ Created apps/api/.env from example
) else (
    echo ℹ️ apps/api/.env already exists
)

if not exist "apps\web\.env.local" (
    copy "apps\web\.env.local.example" "apps\web\.env.local"
    echo ✅ Created apps/web/.env.local from example
) else (
    echo ℹ️ apps/web/.env.local already exists
)

REM Build shared package
echo 🏗️ Building shared package...
cd packages\shared
call npm run build
cd ..\..

if %errorlevel% neq 0 (
    echo ❌ Failed to build shared package
    exit /b 1
)

echo ✅ Setup complete!
echo.
echo 🚀 To start development servers:
echo    npm run dev
echo.
echo 📱 This will start:
echo    • API server on http://localhost:3001
echo    • Web app on http://localhost:3000
echo.
echo 🔧 Next steps:
echo    1. Update environment variables in apps/api/.env and apps/web/.env.local
echo    2. Make sure MongoDB is running
echo    3. Run 'npm run dev' to start all services
echo.
echo 📚 Documentation: https://github.com/Jani-shiv/Budgetpro#readme

pause
