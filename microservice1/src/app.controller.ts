import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { EventPattern } from "@nestjs/microservices";



@Controller()
export class AppController {

    constructor(private appService: AppService){}

    
    @EventPattern('message')
    handleMessage(message: string){
        return this.appService.print(message);
    }

    @Get()
    sendMessage() {
        return this.appService.send();
    }
}