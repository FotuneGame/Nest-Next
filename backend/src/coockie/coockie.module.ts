import { Module } from "@nestjs/common";
import { CoockieController } from "./coockie.controller";


@Module({
    controllers: [CoockieController],
})
export class CoockieModule{

}