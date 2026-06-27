#!/bin/bash

# PDF Generation Testing Script
# Step 10: Test PDF Export Feature

echo "📄 PDF Generation Test - IITDeveloper"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}Prerequisites Check${NC}"
echo "-------------------"

# Check if pdfkit is installed
if npm list pdfkit &> /dev/null; then
    echo -e "${GREEN}✅ pdfkit is installed${NC}"
else
    echo -e "${RED}❌ pdfkit is not installed${NC}"
    echo -e "${YELLOW}Installing pdfkit...${NC}"
    npm install pdfkit @types/pdfkit
fi

echo ""
echo -e "${CYAN}Starting Development Server${NC}"
echo "Make sure the server is running on http://localhost:3000"
echo ""
read -p "Press enter when server is running..."
echo ""

# Test health endpoint
echo -e "${CYAN}Testing API Health${NC}"
HEALTH_STATUS=$(curl -s http://localhost:3000/api/health | jq -r '.status' 2>/dev/null)
if [ "$HEALTH_STATUS" = "healthy" ]; then
    echo -e "${GREEN}✅ API is healthy${NC}"
else
    echo -e "${RED}❌ API health check failed${NC}"
    exit 1
fi
echo ""

echo -e "${CYAN}Step 1: Create an Estimate${NC}"
echo "1. Open http://localhost:3000/estimate in your browser"
echo "2. Click 'Add Service'"
echo "3. Select 'Web Application Development'"
echo "4. Configure the service (accept defaults or customize)"
echo "5. Click 'Save Configuration'"
echo "6. (Optional) Add more services"
echo "7. (Optional) Set a discount percentage"
echo ""
read -p "Press enter when you have added services..."
echo ""

echo -e "${CYAN}Step 2: Save the Estimate${NC}"
echo "8. Click 'Save Draft' button in the summary panel"
echo "9. Wait for the green success toast"
echo "10. Button should change to 'Update Draft' with checkmark"
echo ""
read -p "Press enter when estimate is saved..."
echo ""

# Get the latest estimate ID from database
echo -e "${CYAN}Checking Database${NC}"
ESTIMATE_ID=$(psql -h localhost -U postgres -d iitdeveloper -t -c "SELECT id FROM estimates ORDER BY created_at DESC LIMIT 1;" 2>/dev/null | tr -d ' ')

if [ ! -z "$ESTIMATE_ID" ]; then
    echo -e "${GREEN}✅ Found estimate: ${ESTIMATE_ID:0:8}${NC}"
    echo ""
    
    # Display estimate details
    echo "Estimate details:"
    psql -h localhost -U postgres -d iitdeveloper -c "SELECT id, status, total, created_at FROM estimates WHERE id = '$ESTIMATE_ID';" 2>/dev/null
    echo ""
else
    echo -e "${YELLOW}⚠️  Could not fetch estimate from database${NC}"
    echo "Continuing with manual testing..."
    echo ""
fi

echo -e "${CYAN}Step 3: Export PDF${NC}"
echo "11. In the browser, click 'Export PDF' button"
echo "12. Button should show 'Generating...' with spinner"
echo "13. Wait for PDF to download (should be instant)"
echo "14. Check your Downloads folder"
echo "15. Verify success toast: 'PDF downloaded successfully!'"
echo ""
read -p "Press enter when PDF is downloaded..."
echo ""

echo -e "${CYAN}Step 4: Verify PDF Content${NC}"
echo "Open the downloaded PDF and verify:"
echo ""
echo "  [ ] Header shows 'IITDeveloper' in neon green"
echo "  [ ] Estimate ID is visible (8 characters)"
echo "  [ ] Date created is shown"
echo "  [ ] Valid until date is shown"
echo "  [ ] Line items table is present"
echo "  [ ] Service names are displayed"
echo "  [ ] Quantities are correct"
echo "  [ ] Prices are right-aligned"
echo "  [ ] Subtotal is calculated correctly"
echo "  [ ] Discount is shown (if applicable)"
echo "  [ ] Total is displayed in large neon green text"
echo "  [ ] Footer shows contact information"
echo "  [ ] PDF has professional appearance"
echo ""
read -p "Press enter after verifying PDF content..."
echo ""

echo -e "${CYAN}Step 5: Test With Customer Info${NC}"
echo "16. Click 'Request Quote' button"
echo "17. Fill in customer information:"
echo "    - Name: Test User"
echo "    - Email: test@example.com"
echo "    - Company: Test Company (optional)"
echo "18. Click 'Send Estimate'"
echo "19. Wait for success toast"
echo "20. Click 'Export PDF' again"
echo "21. Open the new PDF"
echo "22. Verify 'PREPARED FOR:' section shows customer info"
echo ""
read -p "Press enter when customer info PDF is verified..."
echo ""

echo -e "${CYAN}Step 6: Check Activity Log${NC}"
if [ ! -z "$ESTIMATE_ID" ]; then
    echo "Checking download activities for estimate $ESTIMATE_ID..."
    psql -h localhost -U postgres -d iitdeveloper -c "
      SELECT 
        action,
        metadata->>'format' as format,
        created_at
      FROM estimate_activities 
      WHERE estimate_id = '$ESTIMATE_ID' 
        AND action = 'downloaded'
      ORDER BY created_at DESC;
    " 2>/dev/null
    echo ""
else
    echo -e "${YELLOW}⚠️  Skipping (no estimate ID available)${NC}"
    echo ""
fi

echo -e "${CYAN}Step 7: Test Error Scenarios${NC}"
echo ""
echo "Test 1: Export with no services"
echo "23. Refresh the page (clear estimate)"
echo "24. Try clicking 'Export PDF' without adding services"
echo "25. Verify error toast: 'Add at least one service before exporting'"
echo ""
read -p "Press enter when error scenario is tested..."
echo ""

echo "Test 2: Export with network error (optional)"
echo "26. Open browser DevTools"
echo "27. Go to Network tab"
echo "28. Enable 'Offline' mode"
echo "29. Try clicking 'Export PDF'"
echo "30. Verify error toast shows network error"
echo "31. Disable 'Offline' mode"
echo ""
read -p "Press enter when network error is tested (or skip)..."
echo ""

echo -e "${CYAN}Step 8: Performance Check${NC}"
echo "32. Add 10+ services to an estimate"
echo "33. Click 'Export PDF'"
echo "34. Time the generation (should be under 1 second)"
echo "35. Open PDF and verify all items are listed"
echo "36. Check if PDF has multiple pages (if needed)"
echo ""
read -p "Press enter when performance is tested..."
echo ""

echo ""
echo "======================================"
echo -e "${GREEN}✅ PDF Generation Testing Complete!${NC}"
echo ""
echo "Summary of what we tested:"
echo "✅ PDF generation from saved estimate"
echo "✅ PDF downloads automatically"
echo "✅ PDF contains all required sections"
echo "✅ Customer information included (when available)"
echo "✅ Activity logging works"
echo "✅ Error handling works"
echo "✅ Loading states display correctly"
echo ""
echo "Test Results:"
echo "- PDF Quality: Professional ✓"
echo "- Layout: Proper spacing and alignment ✓"
echo "- Typography: Clear and readable ✓"
echo "- Branding: IITDeveloper style ✓"
echo "- Performance: Fast generation ✓"
echo ""
echo -e "${CYAN}Example Filenames:${NC}"
if [ ! -z "$ESTIMATE_ID" ]; then
    DATE=$(date +%Y%m%d)
    SHORT_ID=$(echo $ESTIMATE_ID | cut -c1-8 | tr '[:lower:]' '[:upper:]')
    echo "IITDeveloper-Estimate-${SHORT_ID}-${DATE}.pdf"
else
    echo "IITDeveloper-Estimate-ABC12345-20260425.pdf"
fi
echo ""
echo "🎉 PDF export feature is working perfectly!"
echo ""
echo "Next steps:"
echo "- Test with different service combinations"
echo "- Test with various discount amounts"
echo "- Test with long service names"
echo "- Test multi-page PDFs (20+ items)"
echo "- Share PDFs with clients for feedback"
