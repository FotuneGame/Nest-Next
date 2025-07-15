import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { MyParseIntPipe } from "../src/pipe/pipe";
import * as request from "supertest";


// По уму тут так же надо прописать перед каждым тестом ввод тестовых данных для бд но мне лень, 
// так что см аналогию в track.service.spec.ts
describe("Track (e2e)",()=>{
    let app: INestApplication;

    beforeAll(async ()=>{
        const moduleMixture:TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleMixture.createNestApplication();
        app.useGlobalPipes(new MyParseIntPipe());
        await app.init();
    })

    it("/all (GET)", () => {
        return request(app.getHttpServer()).get("/track/all?limit=10&offset=0").expect(200).expect([
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
        ])
    })

    /*
    it("/post (POST)", ()=>{
        return request(app.getHttpServer()).post(url).send({...body}).expect(201).expect
    })*/


    afterAll(async ()=>{
       await app.close();
    })
})