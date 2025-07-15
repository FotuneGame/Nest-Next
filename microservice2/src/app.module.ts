import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";



@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
            {
                name: "Microservice 2",
                transport: Transport.TCP,
                options: {
                    host: process.env.HOST,
                    port: Number(process.env.PORT)
                }
            }
        ])
    ]
})
export class AppModule{
    
}