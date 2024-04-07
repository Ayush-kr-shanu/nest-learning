import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CatsModule } from '../src/cats/cats.module';
import { CatsController } from '../src/cats/cats.controller';
import { CatsService } from '../src/cats/cats.service';

describe('CatsController (e2e)', () => {
  let app: INestApplication;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    catsService = moduleFixture.get<CatsService>(CatsService);
  });

  describe('/cats', () => {
    it('(GET) should return cats', () => {
      const cats = ['cat 1', 'cat 2', 'cat 3', 'cat 4', 'cat 5'];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => cats);

      return request(app.getHttpServer())
        .get('/cats')
        .expect(200)
        .expect(['cat 1', 'cat 2', 'cat 3', 'cat 4', 'cat 5']);
    });

    it('(POST) should add a new cat', () => {
      const catName = 'Tom';

      return request(app.getHttpServer())
        .post('/cats')
        .send({ name: catName })
        .expect(201)
        .expect({"name": catName});
    });
  });
});