import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from "./entity/track.entity";
import { FileService } from "../file/file.service";



@Module({
    imports: [TypeOrmModule.forFeature([Track])],
    controllers: [TrackController],
    providers: [TrackService, FileService]
})
export class TrackModule{

}