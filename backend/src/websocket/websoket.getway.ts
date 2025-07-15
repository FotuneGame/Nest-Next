import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";



@WebSocketGateway()
export class MyWebsokectGetway  {

    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log("WS: websocket work on: " + `http://localhost:${process.env.PORT}`)
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log("WS: client connetion:", client.id);
    }

    handleDisconnect(client: Socket) {
        console.log("WS: client disconnetion:", client.id);
    }

    @SubscribeMessage("message")
    handleMessage(@MessageBody() message: string) {
        console.log("WS: message is "+ message);
        this.server.emit('message',`Echo ${message}`)
    }
}