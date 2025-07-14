import { IsString, IsNumber } from "class-validator";



export class UpdateTrackDto{
    @IsString({
        message: "Имя не строка!"
    })
    readonly name;

    @IsString({
        message: "Артист не строка!"
    })
    readonly artist;

    @IsString({
        message: "Текст пексни не строка!"
    })
    readonly text;

    @IsNumber()
    readonly listens;
}