import { TrackController } from "../src/track/track.controller";
import { TrackService } from "../src/track/track.service";
import { Test } from "@nestjs/testing";



describe("Track controller: ", ()=>{
    let controller: TrackController;

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            controllers: [TrackController],
            providers: [{
                provide: TrackService,
                useValue: {
                    create: jest.fn().mockResolvedValue({
                        "id": 2,
                        "name": "Шишки",
                        "artist": "DJ Aligator",
                        "text": "тЕКСТ ПЕСНИ ЛОЛ 3",
                        "listens": 0,
                        "picture": "1ea6c43f-2461-4c65-8aa8-6e7a6622aff0.png",
                        "audio": "74bbea13-9f58-4ed2-96e2-aaff5dad7977.mp3"
                    }),
                    getAll: jest.fn().mockResolvedValue([
                        {
                            "id": 2,
                            "name": "Шишки",
                            "artist": "DJ Aligator",
                            "text": "тЕКСТ ПЕСНИ ЛОЛ 3",
                            "listens": 0,
                            "picture": "1ea6c43f-2461-4c65-8aa8-6e7a6622aff0.png",
                            "audio": "74bbea13-9f58-4ed2-96e2-aaff5dad7977.mp3"
                        },
                        {
                            "id": 1,
                            "name": "Moskoy",
                            "artist": "Rammstaim",
                            "text": "Текст песни",
                            "listens": 1200,
                            "picture": null,
                            "audio": null
                        }
                    ]),
                    getOne: jest.fn().mockResolvedValue({
                        "id": 2,
                        "name": "Шишки",
                        "artist": "DJ Aligator",
                        "text": "тЕКСТ ПЕСНИ ЛОЛ 3",
                        "listens": 0,
                        "picture": "1ea6c43f-2461-4c65-8aa8-6e7a6622aff0.png",
                        "audio": "74bbea13-9f58-4ed2-96e2-aaff5dad7977.mp3"
                    }),
                    update: jest.fn().mockResolvedValue({
                        "id": 2,
                        "name": "Шишечки",
                        "artist": "DJ Aligator",
                        "text": "тЕКСТ ПЕСНИ ЛОЛ 3",
                        "listens": 0,
                        "picture": "1ea6c43f-2461-4c65-8aa8-6e7a6622aff0.png",
                        "audio": "74bbea13-9f58-4ed2-96e2-aaff5dad7977.mp3"
                    }),
                    delete: jest.fn().mockResolvedValue(true),
                    search: jest.fn().mockResolvedValue({
                        "id": 2,
                        "name": "Шишечки",
                        "artist": "DJ Aligator",
                        "text": "тЕКСТ ПЕСНИ ЛОЛ 3",
                        "listens": 0,
                        "picture": "1ea6c43f-2461-4c65-8aa8-6e7a6622aff0.png",
                        "audio": "74bbea13-9f58-4ed2-96e2-aaff5dad7977.mp3"
                    }),
                }
            }]
        }).compile();

        controller = module.get<TrackController>(TrackController);
    });


    it("should create track", async ()=> {

        const files = {picture: [{}], audio: [{}]};
        const dto = {
            "name": "Шишки",
            "artist": "DJ Aligator",
            "text": "тЕКСТ ПЕСНИ ЛОЛ 3",
        }

        expect(await controller.create(files, dto)).toEqual({
            "id": 2,
            "name": "Шишки",
            "artist": "DJ Aligator",
            "text": "тЕКСТ ПЕСНИ ЛОЛ 3",
            "listens": 0,
            "picture": "1ea6c43f-2461-4c65-8aa8-6e7a6622aff0.png",
            "audio": "74bbea13-9f58-4ed2-96e2-aaff5dad7977.mp3"
        })
    })

    // аналогично записываем все остальные тесты 
})