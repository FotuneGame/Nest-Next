import {Module, NestModule, MiddlewareConsumer} from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TrackModule } from "./track/track.module";
import { CoockieModule } from "./coockie/coockie.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from "./file/file.module";
import { join } from 'path';
import { LoggerMiddleware } from "./middleware/middleware";
import { MyWebsocketModule } from "./websocket/websoket.module";


@Module({
    imports: [    
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST, 
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER, 
            password: process.env.DB_PASSWORD, 
            database: process.env.DB_NAME, 
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: Boolean(process.env.DEV)
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'static'),
        }),
        TrackModule,
        FileModule,
        MyWebsocketModule,
        CoockieModule
    ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('track');
  }
}