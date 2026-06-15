#!/bin/bash

echo "🚀 Setting up IITDeveloper Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Navigate to frontend directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your configuration"
fi

echo ""
echo "✨ Frontend setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Update .env.local with your API URL"
echo "   2. Run 'npm run dev' to start development server"
echo "   3. Open http://localhost:3000"
echo ""
