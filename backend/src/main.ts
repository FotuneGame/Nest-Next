import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from 'cookie-parser';



const start = async () =>{
    try{
        const PORT = process.env.PORT || 5000;
        const ULR_CORS = process.env.URL_CORS?.split(" ") || ["http://localhost:5000"]
        const app = await NestFactory.create(AppModule);

        app.enableCors({
            origin: function (origin,callback){
                if(!origin || origin && ULR_CORS.includes(origin))
                    callback(null,true);
            },
            methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
            allowedHeaders: ['Authorization', 'Content-Type'],
            credentials: true
        });
        app.use(cookieParser());

        await app.listen(PORT,()=>{
            console.log("Server is runnig on port: "+PORT);
        })
    }catch(error){
        console.error(error);
    }
}

start();