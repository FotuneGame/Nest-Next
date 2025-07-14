import { IsString } from "class-validator";



export class CreateTrackDto{
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
}