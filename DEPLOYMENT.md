# 🚀 Deployment Guide - Campus Rooms Availability System

## Quick Start

### Development Mode

**Backend:**
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```
Access: http://localhost:3001

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Access: http://localhost:3000

---

## Docker Deployment

### Build and Run with Docker Compose

```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Individual Docker Builds

**Backend:**
```bash
docker build -f Dockerfile.backend -t ccfvs-backend:latest .
docker run -p 3001:3001 --env-file backend/.env ccfvs-backend:latest
```

**Frontend:**
```bash
docker build -f Dockerfile.frontend -t ccfvs-frontend:latest .
docker run -p 3000:3000 ccfvs-frontend:latest
```

---

## Environment Configuration

### Backend (.env)
```env
DATABASE_URL=postgresql://ccfvs:ccfvs_password@localhost:5432/ccfvs_db
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-change-this
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_WS_URL=http://localhost:3001
```

---

## Testing

### Backend Tests
```bash
cd backend
npm run test              # Unit tests
npm run test:cov          # With coverage
npm run test:e2e          # E2E tests
```

### Frontend Tests
```bash
cd frontend
npm run test              # Unit tests
npm run test:coverage     # With coverage
```

---

## Database Setup

### Initialize Database
```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

### Reset Database
```bash
npx prisma migrate reset
```

---

## Production Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Update CORS_ORIGIN to production domain
- [ ] Configure PostgreSQL with strong password
- [ ] Enable HTTPS with SSL certificates
- [ ] Set up database backups
- [ ] Configure monitoring and logging
- [ ] Run security audit: `npm audit`
- [ ] Enable rate limiting
- [ ] Configure firewall rules
- [ ] Set up CI/CD pipeline

---

## Nginx Configuration

Place SSL certificates in `nginx/ssl/` and update `nginx/nginx.conf` for HTTPS:

```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    # ... rest of config
}
```

---

## Monitoring

### Health Checks
- Backend: http://localhost:3001/health
- Frontend: http://localhost:3000
- Database: `docker exec ccfvs-postgres pg_isready`

### Logs
```bash
# Backend
docker logs ccfvs-backend

# Frontend
docker logs ccfvs-frontend

# Nginx
docker logs ccfvs-nginx
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000/3001
npx kill-port 3000
npx kill-port 3001
```

### Database Connection Error
- Verify DATABASE_URL
- Check PostgreSQL is running
- Verify network connectivity

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## Performance Optimization

- Enable Redis for caching
- Configure CDN for static assets
- Enable database connection pooling
- Implement API response caching
- Use PM2 for process management

---

## Security Best Practices

1. **Never commit .env files**
2. **Use strong JWT secrets**
3. **Enable HTTPS in production**
4. **Implement rate limiting**
5. **Validate all user inputs**
6. **Keep dependencies updated**
7. **Regular security audits**
8. **Implement proper CORS policies**

---

## Support

For issues or questions:
- Check logs: `docker-compose logs`
- Review documentation in `/docs`
- Open GitHub issue
