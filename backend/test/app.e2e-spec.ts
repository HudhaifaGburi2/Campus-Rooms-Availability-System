import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/common/prisma/prisma.service';

describe('App E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    prisma = app.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prisma.cleanDatabase();
    await app.close();
  });

  describe('Authentication', () => {
    const testUser = {
      email: 'test@university.edu',
      name: 'Test User',
      password: 'password123',
    };

    it('/auth/register (POST) - should register a new user', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.email).toBe(testUser.email);
          expect(res.body.name).toBe(testUser.name);
          expect(res.body.password).toBeUndefined();
        });
    });

    it('/auth/login (POST) - should login user', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.access_token).toBeDefined();
        });
    });
  });

  describe('Buildings', () => {
    let authToken: string;
    let buildingId: string;

    beforeAll(async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'test@university.edu',
          password: 'password123',
        });
      authToken = loginResponse.body.access_token;
    });

    it('/buildings (POST) - should create a building', () => {
      return request(app.getHttpServer())
        .post('/api/v1/buildings')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Engineering Building',
          description: 'Main engineering complex',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.name).toBe('Engineering Building');
          buildingId = res.body.id;
        });
    });

    it('/buildings (GET) - should get all buildings', () => {
      return request(app.getHttpServer())
        .get('/api/v1/buildings')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('/buildings/:id (GET) - should get building by id', () => {
      return request(app.getHttpServer())
        .get(`/api/v1/buildings/${buildingId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(buildingId);
          expect(res.body.name).toBe('Engineering Building');
        });
    });
  });
});
