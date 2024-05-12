import { existsSync, readFile } from "fs";
import express from "express"
import * as fs from "fs"

const loaded = {}


// reads and returns a file
function sendFile( path : string, req : express.Request, res : express.Response, stayLoaded : boolean = true ){

    //checks if the path they are trying to send has already been loaded
    if(loaded[path] && stayLoaded){
        res.write(loaded[path])
        res.end()
        return 
    }

    if(existsSync(path)){

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
           
            return
        }
    })
    }
    else {
        sendFile("/", req, res, true)
    }
}