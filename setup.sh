#!/bin/bash

# BudgetPro Development Setup Script
echo "🚀 Setting up BudgetPro Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Copy environment files if they don't exist
echo "🔧 Setting up environment files..."

if [ ! -f "apps/api/.env" ]; then
    cp apps/api/.env.example apps/api/.env
    echo "✅ Created apps/api/.env from example"
else
    echo "ℹ️ apps/api/.env already exists"
fi

if [ ! -f "apps/web/.env.local" ]; then
    cp apps/web/.env.local.example apps/web/.env.local
    echo "✅ Created apps/web/.env.local from example"
else
    echo "ℹ️ apps/web/.env.local already exists"
fi

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.runCommand('ping')" --quiet > /dev/null 2>&1; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️ MongoDB is not running. Starting with Docker..."
        if command -v docker &> /dev/null; then
            docker run -d -p 27017:27017 --name budgetpro-mongodb mongo:latest
            echo "✅ MongoDB started with Docker"
        else
            echo "❌ MongoDB is not running and Docker is not available"
            echo "Please start MongoDB manually or install Docker"
        fi
    fi
else
    echo "⚠️ MongoDB CLI (mongosh) not found. Assuming MongoDB is available..."
fi

# Build shared package
echo "🏗️ Building shared package..."
cd packages/shared
npm run build
cd ../..

if [ $? -ne 0 ]; then
    echo "❌ Failed to build shared package"
    exit 1
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development servers:"
echo "   npm run dev"
echo ""
echo "📱 This will start:"
echo "   • API server on http://localhost:3001"
echo "   • Web app on http://localhost:3000"
echo ""
echo "🔧 Next steps:"
echo "   1. Update environment variables in apps/api/.env and apps/web/.env.local"
echo "   2. Make sure MongoDB is running"
echo "   3. Run 'npm run dev' to start all services"
echo ""
echo "📚 Documentation: https://github.com/Jani-shiv/Budgetpro#readme"
