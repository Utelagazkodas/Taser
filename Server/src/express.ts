import { existsSync, readFile } from "fs";
import * as express from "express"
import * as fs from "fs"

const loaded = {}

// reads and returns a file
function sendFile( path : string, req : express.Request, res : express.Response, stayLoaded : boolean = true ){

    console.log(path)

    //checks if the path they are trying to send has already been loaded
    if(loaded[path] && stayLoaded){
        res.write(loaded[path])
        res.end()
        return 
    }
    if(req.url == "/favicon.ico"){
        res.end()
        return
    }

    console.log(req.url.slice(req.url.length - 3))

    if(req.url.slice(req.url.length - 3) == ".js"){
        res.setHeader('Content-Type', 'application/javascript'); 
    }
    

    // reads and sends a file
    fs.readFile(path, (err, data) =>{

        //if no error is encountered then sends the file and loads it 
        if(err === null){
            loaded[path] = data
            res.write(data)
            res.end()
            return  
        }

        else{
            sendFile("Frontend/docs/index.html", req, res, true)
            return
        }
    })
    
}

export function get(req : express.Request, res : express.Response){

    sendFile("Frontend/docs" + req.url, req, res, true)
}