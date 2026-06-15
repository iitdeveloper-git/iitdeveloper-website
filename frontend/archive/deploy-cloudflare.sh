#!/bin/bash
# Cloudflare Pages deployment helper script

set -e

echo "🚀 IITDeveloper - Cloudflare Deployment Helper"
echo "=============================================="
echo ""

# Check if required commands exist
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed."; exit 1; }

# Function to check environment variables
check_env_vars() {
    local missing_vars=()
    
    if [ -z "$DATABASE_URL" ]; then
        missing_vars+=("DATABASE_URL")
    fi
    
    if [ -z "$RESEND_API_KEY" ]; then
        missing_vars+=("RESEND_API_KEY")
    fi
    
    if [ -z "$FROM_EMAIL" ]; then
        missing_vars+=("FROM_EMAIL")
    fi
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        echo "❌ Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "   - $var"
        done
        echo ""
        echo "💡 Set these in your .env.local file or Cloudflare Dashboard"
        echo "   Example: export DATABASE_URL='postgresql://...'"
        return 1
    fi
    
    echo "✅ All required environment variables are set"
    return 0
}

# Function to test database connection
test_database() {
    echo ""
    echo "🔍 Testing database connection..."
    
    if node -e "
        const { Pool } = require('pg');
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        pool.query('SELECT NOW()')
            .then(() => { console.log('✅ Database connection successful'); process.exit(0); })
            .catch((err) => { console.error('❌ Database connection failed:', err.message); process.exit(1); });
    " 2>/dev/null; then
        echo "✅ Database test passed"
        return 0
    else
        echo "❌ Database test failed"
        echo "   Please check your DATABASE_URL"
        return 1
    fi
}

# Function to build the project
build_project() {
    echo ""
    echo "🔨 Building project..."
    
    if npm run build; then
        echo "✅ Build successful"
        return 0
    else
        echo "❌ Build failed"
        return 1
    fi
}

# Function to run pre-deployment checks
pre_deploy_checks() {
    echo ""
    echo "📋 Running pre-deployment checks..."
    echo ""
    
    # Check package.json exists
    if [ ! -f "package.json" ]; then
        echo "❌ package.json not found. Are you in the frontend directory?"
        exit 1
    fi
    
    # Check dependencies
    echo "📦 Checking dependencies..."
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies..."
        npm install
    else
        echo "✅ Dependencies already installed"
    fi
    
    # Type check
    echo ""
    echo "🔍 Running type check..."
    if npm run type-check; then
        echo "✅ Type check passed"
    else
        echo "❌ Type check failed"
        exit 1
    fi
    
    # Lint
    echo ""
    echo "🧹 Running linter..."
    if npm run lint; then
        echo "✅ Lint passed"
    else
        echo "⚠️  Lint warnings found (non-blocking)"
    fi
}

# Function to show deployment instructions
show_deployment_instructions() {
    echo ""
    echo "======================================"
    echo "📝 Cloudflare Pages Deployment Steps"
    echo "======================================"
    echo ""
    echo "Option 1: GitHub Integration (Recommended)"
    echo "  1. Push code to GitHub"
    echo "  2. Go to Cloudflare Dashboard > Pages"
    echo "  3. Connect your repository"
    echo "  4. Configure build settings:"
    echo "     - Build command: npm run build"
    echo "     - Build output: .next"
    echo "     - Node version: 20"
    echo "  5. Add environment variables in Dashboard"
    echo ""
    echo "Option 2: CLI Deployment"
    echo "  1. Install Wrangler: npm install -g wrangler"
    echo "  2. Login: wrangler login"
    echo "  3. Deploy: wrangler pages deploy .next"
    echo ""
    echo "📚 Full guide: See CLOUDFLARE_DEPLOYMENT.md"
    echo ""
}

# Main script
main() {
    case "${1:-}" in
        "check")
            echo "🔍 Checking deployment readiness..."
            check_env_vars || exit 1
            test_database || exit 1
            pre_deploy_checks || exit 1
            echo ""
            echo "✅ All checks passed! Ready for deployment."
            ;;
        
        "build")
            echo "🔨 Building for deployment..."
            build_project || exit 1
            echo ""
            echo "✅ Build complete!"
            echo "📦 Output in: .next/"
            ;;
        
        "help"|"--help"|"-h")
            echo "Usage: ./deploy-cloudflare.sh [command]"
            echo ""
            echo "Commands:"
            echo "  check   - Run pre-deployment checks"
            echo "  build   - Build the project"
            echo "  help    - Show this help message"
            echo ""
            show_deployment_instructions
            ;;
        
        *)
            echo "Choose an action:"
            echo "  1) Run pre-deployment checks"
            echo "  2) Build project"
            echo "  3) Show deployment instructions"
            echo "  4) Exit"
            echo ""
            read -p "Enter choice [1-4]: " choice
            
            case $choice in
                1)
                    check_env_vars || exit 1
                    test_database || exit 1
                    pre_deploy_checks || exit 1
                    echo ""
                    echo "✅ All checks passed!"
                    ;;
                2)
                    build_project || exit 1
                    echo ""
                    echo "✅ Build complete!"
                    ;;
                3)
                    show_deployment_instructions
                    ;;
                4)
                    echo "👋 Goodbye!"
                    exit 0
                    ;;
                *)
                    echo "❌ Invalid choice"
                    exit 1
                    ;;
            esac
            ;;
    esac
}

# Run main function
main "$@"
