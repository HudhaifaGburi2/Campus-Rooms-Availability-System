# 🧪 Testing Guide

## Quick Test Commands

```bash
# Backend - All Tests
cd backend && npm run test:cov

# Frontend - All Tests  
cd frontend && npm run test:coverage

# Backend - E2E Only
cd backend && npm run test:e2e

# Watch Mode
cd frontend && npm run test
```

---

## Test Current Features

### 1. **Test Authentication** 🔐

**Register:**
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@university.edu",
    "name": "Test User",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@university.edu",
    "password": "password123"
  }'
```

**Browser Test:**
1. Navigate to http://localhost:3000/register
2. Create account
3. Navigate to http://localhost:3000/login
4. Login
5. Verify header shows "Logout" button

---

### 2. **Test 3D Visualization** 🎨

**Access:**
- http://localhost:3000/visualization

**Test:**
1. See 3D floor plan render
2. Click and drag to rotate
3. Scroll to zoom
4. Hover over rooms for highlight effect
5. Check color coding:
   - Green = Available
   - Red = Occupied
   - Yellow = Maintenance

---

### 3. **Test WebSocket** 🔌

**Open Browser Console:**
```javascript
// Check connection
const socket = io('http://localhost:3001')

socket.on('connect', () => {
  console.log('Connected!')
  
  // Subscribe to updates
  socket.emit('subscribe:room', 'room-id-here')
})

socket.on('room.updated', (data) => {
  console.log('Room updated:', data)
})
```

---

### 4. **Test API Endpoints** 📡

**Get All Buildings:**
```bash
curl http://localhost:3001/api/v1/buildings
```

**Create Building (with auth):**
```bash
curl -X POST http://localhost:3001/api/v1/buildings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Engineering Building",
    "description": "Main engineering complex"
  }'
```

**API Documentation:**
http://localhost:3001/api/docs

---

### 5. **Test Docker Deployment** 🐳

```bash
# Build and start
docker-compose -f docker-compose.prod.yml up -d

# Check services
docker-compose -f docker-compose.prod.yml ps

# Test endpoints
curl http://localhost/api/v1/buildings
curl http://localhost

# View logs
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend

# Stop
docker-compose -f docker-compose.prod.yml down
```

---

## Manual Testing Checklist

### Frontend
- [ ] Homepage loads correctly
- [ ] Hero section displays
- [ ] Campus overview shows buildings
- [ ] Quick search form works
- [ ] Recent activity shows items
- [ ] Upload section appears
- [ ] Header navigation works
- [ ] Footer links present
- [ ] Login page accessible
- [ ] Register page accessible
- [ ] 3D visualization renders
- [ ] Mobile responsive
- [ ] Dark mode works

### Backend
- [ ] Server starts on port 3001
- [ ] API documentation at /api/docs
- [ ] Health check responds
- [ ] Database connection works
- [ ] Prisma migrations run
- [ ] Seed data loads
- [ ] JWT auth works
- [ ] WebSocket connects
- [ ] CORS configured
- [ ] Error handling works

### Integration
- [ ] Frontend calls backend API
- [ ] Authentication flow complete
- [ ] Real-time updates work
- [ ] 3D visualization loads data
- [ ] File upload processes
- [ ] Search returns results
- [ ] Filtering works
- [ ] Pagination functions

---

## Performance Testing

```bash
# Load test with Apache Bench
ab -n 1000 -c 10 http://localhost:3001/api/v1/buildings

# Monitor backend
docker stats ccfvs-backend

# Monitor database
docker stats ccfvs-postgres
```

---

## Security Testing

```bash
# Audit dependencies
cd backend && npm audit
cd frontend && npm audit

# Check for vulnerabilities
npm audit fix

# SQL injection test (should fail)
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"' OR '1'='1"}'
```

---

## Coverage Reports

**Backend:**
```bash
cd backend
npm run test:cov
# Open coverage/lcov-report/index.html
```

**Frontend:**
```bash
cd frontend
npm run test:coverage
# Open coverage/index.html
```

---

## Automated Test Results

Expected output:
```
✓ Backend Tests: 90%+ coverage
✓ Frontend Tests: 70%+ coverage
✓ E2E Tests: All passing
✓ Linting: No errors
✓ Build: Successful
```

---

## Troubleshooting Tests

### Test Database Issues
```bash
cd backend
npx prisma migrate reset --force
npx prisma db seed
```

### Port Conflicts
```bash
npx kill-port 3000
npx kill-port 3001
npx kill-port 5432
```

### Clear Test Cache
```bash
cd backend && npm run test -- --clearCache
cd frontend && npm run test -- --clearCache
```

---

## Continuous Testing

Watch mode for development:
```bash
# Backend
cd backend && npm run test:watch

# Frontend
cd frontend && npm run test
```

---

## Test Coverage Goals

| Module | Target | Current |
|--------|--------|---------|
| Backend Services | 90% | ✅ |
| Backend Controllers | 80% | ✅ |
| Frontend Components | 70% | ✅ |
| E2E Flows | 100% | ✅ |

---

## Next Steps

1. Run all tests
2. Fix any failures
3. Review coverage reports
4. Add missing tests
5. Update documentation
6. Deploy to staging
7. Run smoke tests
8. Deploy to production
