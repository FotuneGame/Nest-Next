import { Module } from "@nestjs/common";
import { MyWebsokectGetway } from "./websoket.getway";


@Module({
    providers: [MyWebsokectGetway]
})
export class MyWebsocketModule{

}