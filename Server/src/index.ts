import { readFileSync} from "fs"
import { removeComments } from "./functions.js"
import * as webSocket from "ws"
import { connection } from "./ws.js"
import * as express from "express"
import { get } from "./express.js"

// Counter
export let count : number = 0

export function addToCount(){
    count += 1
}

// Read in the settings
var rawData = readFileSync("settings.json", "utf8")
export const settings: {
    HTTPPort : number,
    WebSocketPort: number
} = JSON.parse(removeComments(rawData))



// WebSocket server
export const wss: webSocket.WebSocketServer = new webSocket.WebSocketServer({ port: settings.WebSocketPort })

wss.on("connection", connection)
wss.on("listening", ()=>{console.log("Web Socket Server is open")})

// Express server
export const app : express.Express = express.default()

app.get("*", get)
app.listen(settings.HTTPPort, ()=>{console.log("Started express")})