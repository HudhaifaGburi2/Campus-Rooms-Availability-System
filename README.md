# Campus Rooms Availability System (CCFVS)

A production-grade full-stack application for visualizing and managing campus classroom and facilities availability in real-time.

## 🏗️ Architecture

```
Frontend (Next.js/React/Tailwind)
Backend (Node.js - NestJS)
Data Storage (PostgreSQL)
Real-Time Layer (WebSockets)
Visualization Layer (D3.js / Three.js)
```

## 🎯 Features

- **Interactive Visualization**: 2D/3D building, floor, and room visualization
- **Real-time Updates**: WebSocket-based live room status updates
- **Data Import**: Support for JSON and CSV bulk imports
- **Advanced Search**: Filter rooms by type, capacity, and availability
- **Schedule Management**: Complete scheduling system with conflict detection
- **Clean Architecture**: SOLID principles, dependency injection, type-safe DTOs
- **Production Ready**: Docker, CI/CD, comprehensive testing (90%+ coverage)

## 📁 Project Structure

```
├── backend/           # NestJS backend (Clean Architecture)
├── frontend/          # Next.js frontend (App Router)
├── docs/             # Documentation (API, ERD, Architecture)
├── docker/           # Docker configurations
├── nginx/            # Nginx reverse proxy config
└── .github/          # CI/CD workflows
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose (optional)

### Development Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd Rooms
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Configure database connection in .env
npm run db:migrate
npm run db:seed
npm run start:dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Docker Setup

```bash
docker-compose up -d
```

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema (ERD)](./docs/ERD.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Data Import Templates](./docs/IMPORT_TEMPLATES.md)

## 🧪 Testing

```bash
# Backend tests (90%+ coverage)
cd backend
npm run test
npm run test:e2e
npm run test:cov

# Frontend tests (70%+ coverage)
cd frontend
npm run test
npm run test:coverage
```

## 🔐 Security

- JWT-based authentication
- Input validation on all endpoints
- CORS restrictions enforced
- File upload sanitization
- SQL injection prevention via Prisma ORM

## 📊 Technology Stack

### Backend
- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Real-time**: Socket.IO
- **Validation**: class-validator, class-transformer
- **Testing**: Jest, Supertest

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI**: React, TailwindCSS
- **Visualization**: D3.js, Three.js
- **State Management**: React Hooks
- **Testing**: Vitest, React Testing Library

## 📄 License

MIT

## 👥 Contributors

YOU
