import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

const bootstrap = async () => {
    try{
        const app = await NestFactory.create(AppModule);
        await app.listen(Number(process.env.PORT),()=>{
            console.log("Server is runnig on port: "+ `http://${process.env.HOST}:${process.env.PORT}`);
        })


        const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
            AppModule,
            {
                transport: Transport.TCP,
                options: {
                    host: process.env.HOST,
                    port: Number(process.env.PORT_MCS)
                }
            },
        );
        await microservice.listen();
        console.log("Microservice 1 work on:" + `http://${process.env.HOST}:${process.env.PORT_MCS}`);
    }catch(err){
        console.error(err);
    }
}

bootstrap();