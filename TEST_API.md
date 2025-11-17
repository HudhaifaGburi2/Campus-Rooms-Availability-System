# API Testing Guide

## Test Buildings Endpoint

**Backend must be running on port 3001**

### 1. Test from Browser
Open: http://localhost:3001/api/v1/buildings

Expected Response:
- If database is empty: `[]` (empty array)
- If has data: JSON array of buildings

### 2. Test from PowerShell
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/v1/buildings" -Method GET | Select-Object -ExpandProperty Content
```

### 3. Test from Command Line (curl)
```bash
curl http://localhost:3001/api/v1/buildings
```

### 4. Check API Documentation
Open: http://localhost:3001/api/docs

---

## What Was Fixed

**Problem:** Buildings endpoint required authentication for ALL requests

**Solution:** Made GET endpoints public (no authentication needed)
- ✅ GET /api/v1/buildings - Public (view all)
- ✅ GET /api/v1/buildings/:id - Public (view one)
- 🔒 POST /api/v1/buildings - Requires Auth (create)
- 🔒 PUT /api/v1/buildings/:id - Requires Auth (update)
- 🔒 DELETE /api/v1/buildings/:id - Requires Auth (delete)

---

## Expected Frontend Behavior

**Before Fix:**
❌ Error: "API endpoint not configured correctly"

**After Fix:**
✅ Empty State: "Welcome to Campus Buildings - No buildings added yet"
✅ With Data: Shows building cards with green success banner

---

## Troubleshooting

If still getting errors:

1. **Check backend is running:**
   ```powershell
   Get-Process | Where-Object {$_.ProcessName -eq "node"}
   ```

2. **Test endpoint directly:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3001/api/v1/buildings"
   ```

3. **Check frontend dev server:**
   - Should be running on http://localhost:3000
   - Check browser console for errors

4. **Restart both servers:**
   ```powershell
   # Kill all Node processes
   Get-Process -Name node | Stop-Process -Force
   
   # Start backend
   cd backend
   npm run start:dev
   
   # Start frontend (in new terminal)
   cd frontend
   npm run dev
   ```
