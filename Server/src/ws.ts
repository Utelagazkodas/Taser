import * as webSocket from "ws"
import { ClientRequest } from "http"
import { addToCount, count, wss } from "./index.js"

export function connection(ws: webSocket.WebSocket, req: ClientRequest) {
    ws.send(JSON.stringify(count))

    console.log("Someone connected to websocket")

    ws.on("message", (data: webSocket.RawData, isBinary: boolean)=>{
        addToCount()

        sendOut(count)

        console.log("Message received, increased count, sent out to " + wss.clients.size+  " clients")
    })
}

function sendOut(data : any){
    let t : string = JSON.stringify(data)

    wss.clients.forEach(element => {
        if(element.OPEN){
            element.send(t)
        }
    });
}
