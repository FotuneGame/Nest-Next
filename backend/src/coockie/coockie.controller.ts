import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";


@Controller("/coockie")
export class CoockieController {

    @Get("/get")
    getCoockie(@Req() request: Request) {
        return request.cookies;
    }

    @Get("/set")
    setCoockie(@Res({ passthrough: true }) response: Response) {
        response.cookie('key', new Date());
        return "update coockie!"
    }


}