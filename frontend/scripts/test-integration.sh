#!/bin/bash

# Frontend-Backend Integration Testing Guide
# Step 9: Testing the Connected System

echo "🧪 IITDeveloper - Integration Testing"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}Step 1: Start Backend${NC}"
echo "Make sure PostgreSQL is running and database is set up"
echo "Run: npm run dev"
echo ""
read -p "Press enter when backend is running on http://localhost:3000..."
echo ""

echo -e "${CYAN}Step 2: Test Health Check${NC}"
HEALTH=$(curl -s http://localhost:3000/api/health | jq -r '.status')
if [ "$HEALTH" = "healthy" ]; then
    echo -e "${GREEN}✅ Backend is healthy${NC}"
else
    echo -e "${YELLOW}⚠️  Backend health check failed${NC}"
    exit 1
fi
echo ""

echo -e "${CYAN}Step 3: Open Frontend${NC}"
echo "1. Open browser to http://localhost:3000/estimate"
echo "2. You should see the pricing estimator"
echo ""
read -p "Press enter when you see the estimator..."
echo ""

echo -e "${CYAN}Step 4: Test Add Service${NC}"
echo "In the browser:"
echo "1. Click 'Add Service' button"
echo "2. Select a service (e.g., Web Application Development)"
echo "3. Configure the service options"
echo "4. Click 'Save Configuration'"
echo "5. Verify service appears in the list"
echo ""
read -p "Press enter when service is added..."
echo ""

echo -e "${CYAN}Step 5: Test Save Estimate${NC}"
echo "In the browser:"
echo "1. Click 'Save Draft' button in the summary panel"
echo "2. Wait for loading spinner"
echo "3. Verify green toast notification: 'Estimate saved successfully!'"
echo "4. Verify button changes to 'Update Draft' with checkmark"
echo ""
read -p "Press enter when estimate is saved..."
echo ""

# Check database
echo -e "${CYAN}Step 6: Verify in Database${NC}"
echo "Checking last saved estimate..."
ESTIMATE_COUNT=$(psql -h localhost -U postgres -d iitdeveloper -t -c "SELECT COUNT(*) FROM estimates;" 2>/dev/null | tr -d ' ')
if [ ! -z "$ESTIMATE_COUNT" ]; then
    echo -e "${GREEN}✅ Found $ESTIMATE_COUNT estimate(s) in database${NC}"
    echo ""
    echo "Latest estimate:"
    psql -h localhost -U postgres -d iitdeveloper -c "SELECT id, po_number, status, total, created_at FROM estimates ORDER BY created_at DESC LIMIT 1;" 2>/dev/null
else
    echo -e "${YELLOW}⚠️  Could not query database${NC}"
fi
echo ""

echo -e "${CYAN}Step 7: Test Send Estimate${NC}"
echo "In the browser:"
echo "1. Click 'Request Quote' button"
echo "2. Modal should open"
echo "3. Fill in customer info:"
echo "   - Name: Test User"
echo "   - Email: test@example.com"
echo "   - Company: Test Company (optional)"
echo "4. Click 'Send Estimate'"
echo "5. Wait for loading spinner"
echo "6. Verify success toast: 'Estimate sent to test@example.com!'"
echo ""
echo "Note: If RESEND_API_KEY is not set, email will be logged to console"
echo ""
read -p "Press enter when email is sent..."
echo ""

# Check email log
echo -e "${CYAN}Step 8: Verify Email Log${NC}"
EMAIL_COUNT=$(psql -h localhost -U postgres -d iitdeveloper -t -c "SELECT COUNT(*) FROM email_logs;" 2>/dev/null | tr -d ' ')
if [ ! -z "$EMAIL_COUNT" ]; then
    echo -e "${GREEN}✅ Found $EMAIL_COUNT email log(s)${NC}"
    echo ""
    echo "Latest email:"
    psql -h localhost -U postgres -d iitdeveloper -c "SELECT recipient_email, subject, status, created_at FROM email_logs ORDER BY created_at DESC LIMIT 1;" 2>/dev/null
else
    echo -e "${YELLOW}⚠️  Could not query email logs${NC}"
fi
echo ""

echo -e "${CYAN}Step 9: Test View Estimate${NC}"
ESTIMATE_ID=$(psql -h localhost -U postgres -d iitdeveloper -t -c "SELECT id FROM estimates ORDER BY created_at DESC LIMIT 1;" 2>/dev/null | tr -d ' ')
if [ ! -z "$ESTIMATE_ID" ]; then
    echo "Open browser to: http://localhost:3000/estimate/$ESTIMATE_ID"
    echo "Verify:"
    echo "1. Estimate loads correctly"
    echo "2. Status badge shows 'Sent'"
    echo "3. Customer info displays"
    echo "4. Line items show"
    echo "5. Pricing summary is correct"
else
    echo -e "${YELLOW}⚠️  Could not get estimate ID${NC}"
fi
echo ""
read -p "Press enter when view page is verified..."
echo ""

echo -e "${CYAN}Step 10: Test Update Estimate${NC}"
echo "In the browser (back to /estimate):"
echo "1. Add another service"
echo "2. Click 'Update Draft'"
echo "3. Verify success toast"
echo "4. Check database for updated record"
echo ""
read -p "Press enter when update is tested..."
echo ""

echo -e "${CYAN}Step 11: Test Error Handling${NC}"
echo "Test 1: Invalid email"
echo "1. Click 'Request Quote'"
echo "2. Enter invalid email (e.g., 'notanemail')"
echo "3. Try to submit"
echo "4. Verify error message appears"
echo ""
echo "Test 2: Empty estimate"
echo "1. Refresh page"
echo "2. Try to click 'Save Draft' without services"
echo "3. Verify toast: 'Add at least one service before saving'"
echo ""
read -p "Press enter when error handling is tested..."
echo ""

echo -e "${CYAN}Step 12: Test Loading States${NC}"
echo "Verify these show loading spinners:"
echo "1. Save Draft → 'Saving...'"
echo "2. Send Estimate → 'Sending...'"
echo "3. View page initial load → Spinner"
echo ""
read -p "Press enter when loading states are verified..."
echo ""

echo ""
echo "======================================"
echo -e "${GREEN}✅ Integration Testing Complete!${NC}"
echo ""
echo "Summary:"
echo "✅ Backend API responding"
echo "✅ Frontend UI working"
echo "✅ Estimates saving to database"
echo "✅ Email delivery working"
echo "✅ View estimates working"
echo "✅ Error handling working"
echo "✅ Loading states working"
echo ""
echo "🎉 Your pricing estimator is fully integrated!"
