import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";


@Injectable()
export class AppService {
    private microservice2: ClientProxy;

    constructor() {
        this.microservice2 = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: process.env.HOST_MCS2,
                port: Number(process.env.PORT_MCS2)
            }
        })
    }

    async print(message: string){
        console.log("mcs1:"+message);
    }

    async send(){
        this.microservice2.emit("message","some value for msc2 from msc1!");
    }
}