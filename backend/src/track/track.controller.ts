import { Body, Param, Controller, Get, Post, Put, Delete, ParseIntPipe, UseInterceptors, UploadedFiles, Query, UseGuards, UseFilters } from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { MyParseIntPipe } from "src/pipe/pipe";
import { AuthGuard } from "src/guard/guard";
import { MyLoggingInterceptor } from "src/interceptor/interceptor";
import { MyHttpExceptionFilter } from "src/filters/filter";



@Controller("/track")
@UseInterceptors(MyLoggingInterceptor)
export class TrackController{

    constructor(private trackService: TrackService){}



    @Post("/create")
    @UseInterceptors(FileFieldsInterceptor([
        {name: "picture", maxCount: 1},
        {name: "audio", maxCount: 1}
    ]))
    create(
        @UploadedFiles() files,
        @Body() dto: CreateTrackDto
    ) {
        const {picture, audio} = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }



    @Get("/all")
    @UseFilters(MyHttpExceptionFilter)
    getAll(
        @Query("offset", ParseIntPipe) offset: number,
        @Query("limit", ParseIntPipe) limit: number,
    ) {
        //Для вызова фильтра обработки ошибок для клиента;
        //throw new MyHttpExceptionFilter();
        return this.trackService.getAll(offset, limit);
    }


    
    @Get("/search")
    search(
        @Query("query") query: string,
        @Query("offset", ParseIntPipe) offset: number,
        @Query("limit", ParseIntPipe) limit: number
    ) {
        return this.trackService.search(query, limit, offset);
    }



    @Get(":id")
    getOne(@Param("id", MyParseIntPipe) id:number) {
        return this.trackService.getOne(id);
    }



    @Put(":id")
    update(
        @Param("id", ParseIntPipe) id:number,
        @Body() dto: UpdateTrackDto
    ){
        return this.trackService.update(id, dto);
    }



    @Delete(":id")
    @UseGuards(AuthGuard)
    delete(@Param("id", ParseIntPipe) id:number) {
        return this.trackService.delete(id);
    }
}