//import * as bodyParser from "body-parser"
import {Request, Response} from "express";

const express = require('express')

const appBeforeAuth = express.Router();

appBeforeAuth.get("/checkPreAuthApi", async(req : Request, res : Response) => {
    try {
        res.status(200).send("check complete")
    }
    catch(error) {
        res.status(400).send("error occurred " + error)
    }
})

//const jsonParser = bodyParser.json()
//const urlEncodedParser = bodyParser.urlencoded({ extended: false })


export default appBeforeAuth
