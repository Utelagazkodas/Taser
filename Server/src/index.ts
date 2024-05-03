import { readFileSync} from "fs"
import { removeComments } from "./functions.js"
import * as webSocket from "ws"


// Read in the settings
var rawData = readFileSync("settings.json", "utf8")
export const settings: {
    HTTPPort : number,
    WebSocketPort: number
} = JSON.parse(removeComments(rawData))



// WebSocket server
export const wss: webSocket.WebSocketServer = new webSocket.WebSocketServer({ port: settings.WebSocketPort })

wss.on("connection", connection)