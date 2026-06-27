# Backend API Testing with curl

# Set base URL
BASE_URL="http://localhost:3000/api"

echo "🧪 IITDeveloper API Tests"
echo "========================="
echo ""

# 1. Health Check
echo "1️⃣  Health Check"
curl -s $BASE_URL/health | jq
echo ""

# 2. Get All Services
echo "2️⃣  Get All Services"
curl -s $BASE_URL/services | jq '.services | length'
echo ""

# 3. Get Single Service
echo "3️⃣  Get Web App Service"
curl -s $BASE_URL/services/web-app | jq '.name'
echo ""

# 4. Calculate Price
echo "4️⃣  Calculate Price for Simple Web App"
curl -s -X POST $BASE_URL/estimates/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "web-app",
    "configuration": {
      "complexity": "simple",
      "features": ["auth"],
      "users": "1k"
    },
    "quantity": 1
  }' | jq '.totalPrice'
echo ""

# 5. Create Estimate
echo "5️⃣  Create Estimate"
ESTIMATE_ID=$(curl -s -X POST $BASE_URL/estimates \
  -H "Content-Type: application/json" \
  -d '{
    "lineItems": [
      {
        "id": "item-1",
        "serviceId": "web-app",
        "serviceName": "Web Application Development",
        "quantity": 1,
        "configuration": {
          "complexity": "simple",
          "features": ["auth"],
          "users": "1k"
        },
        "basePrice": 15000,
        "totalPrice": 17000,
        "unit": "project"
      }
    ],
    "discount": {
      "type": "percentage",
      "value": 10,
      "reason": "Early bird discount"
    },
    "customerInfo": {
      "name": "Test User",
      "email": "test@example.com",
      "company": "Test Company"
    }
  }' | jq -r '.id')

echo "Created estimate: $ESTIMATE_ID"
echo ""

# 6. Get Estimate
echo "6️⃣  Get Estimate"
curl -s $BASE_URL/estimates/$ESTIMATE_ID | jq '.total'
echo ""

# 7. Update Estimate
echo "7️⃣  Update Estimate Status"
curl -s -X PATCH $BASE_URL/estimates/$ESTIMATE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "sent"
  }' | jq '.status'
echo ""

# 8. Get Activities
echo "8️⃣  Get Estimate Activities"
curl -s $BASE_URL/estimates/$ESTIMATE_ID/activities | jq '.count'
echo ""

# 9. List Estimates
echo "9️⃣  List All Estimates"
curl -s $BASE_URL/estimates | jq '.count'
echo ""

echo "✅ All tests completed!"
