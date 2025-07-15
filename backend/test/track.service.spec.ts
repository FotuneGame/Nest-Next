import { FileService } from "../src/file/file.service";
import { TrackService } from "../src/track/track.service";
import { Test } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Track } from "../src/track/entity/track.entity";
import { Repository } from "typeorm";
import { DataSource } from "typeorm";
import { ConfigModule } from "@nestjs/config";

describe("TrackService (integration)", () => {
  let service: TrackService;
  let trackRepository: Repository<Track>;
  let fileService: FileService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: "postgres",
          host: process.env.DB_TEST_HOST,
          port: Number(process.env.DB_TEST_PORT),
          username: process.env.DB_TEST_USER,
          password: process.env.DB_TEST_PASSWORD || "", // Пустая строка, если пароль не нужен
          database: process.env.DB_TEST_NAME,
          entities: [Track],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Track]),
      ],
      providers: [TrackService, FileService],
    }).compile();

    service = module.get<TrackService>(TrackService);
    trackRepository = module.get<Repository<Track>>(getRepositoryToken(Track));
    fileService = module.get<FileService>(FileService);
    dataSource = module.get<DataSource>(DataSource);

    // Инициализация тестовых данных
    await trackRepository.clear();
    await trackRepository.save([
        {
            "name": "Шишки",
            "artist": "DJ Aligator",
            "text": "тЕКСТ ПЕСНИ ЛОЛ 3",
            "listens": 0,
            "picture": "1ea6c43f-2461-4c65-8aa8-6e7a6622aff0.png",
            "audio": "74bbea13-9f58-4ed2-96e2-aaff5dad7977.mp3"
        },
        {
            "name": "Фура",
            "artist": "tsb",
            "text": "тЕКСТ ПЕСНИ ЛОЛ 2",
            "listens": 0,
            "picture": "49b95dc6-d1f6-49b4-9fb9-32db16700c2b.png",
            "audio": "07b4b751-e41c-45c0-bc2d-b7763918193d.mp3"
        },
        {
            "name": "Moskoy",
            "artist": "Rammstaim",
            "text": "Текст песни",
            "listens": 1200,
            "picture": null,
            "audio": null
        }
    ]);
  }, 10000); // Увеличиваем таймаут для beforeEach до 10 секунд

  
  afterEach(async () => {
    await trackRepository.clear(); // Очищаем таблицу
  });


  it("should getAll from DB PG", async () => {
    const result = await service.getAll(0, 10);
    expect(result).toEqual([
          {
              "id": 3,
              "name": "Moskoy",
              "artist": "Rammstaim",
              "text": "Текст песни",
              "listens": 1200,
              "picture": null,
              "audio": null
          },
          {
              "id": 2,
              "name": "Фура",
              "artist": "tsb",
              "text": "тЕКСТ ПЕСНИ ЛОЛ 2",
              "listens": 0,
              "picture": "49b95dc6-d1f6-49b4-9fb9-32db16700c2b.png",
              "audio": "07b4b751-e41c-45c0-bc2d-b7763918193d.mp3"
          },
          {
              "id": 1,
              "name": "Шишки",
              "artist": "DJ Aligator",
              "text": "тЕКСТ ПЕСНИ ЛОЛ 3",
              "listens": 0,
              "picture": "1ea6c43f-2461-4c65-8aa8-6e7a6622aff0.png",
              "audio": "74bbea13-9f58-4ed2-96e2-aaff5dad7977.mp3"
          }
    ]);
  }, 10000); // Увеличиваем таймаут для теста

});