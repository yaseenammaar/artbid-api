import validateFirebaseIdToken from "./validateFirebaseIdToken";
import {Request, Response} from "express";
import updateUserData from "./updateUserData";
import * as bodyParser from "body-parser";
import getFirebaseRecord from "./getFirestoreRecord";
import checkLatestBidder from "./checkLatestBidder";
import searchItems from "./searchItems";
import saveNewUserInDb from "./saveNewUserInDb";
import itemUpload from "./itemUpload";

const express = require('express')

// express instance of after auth middleware
const protectedApp = express();

//Body Parser which will parse json body of request;
//Use it with every route which has json body in the request
//Use it as a middleware
const jsonParser = bodyParser.json()

// Middleware to validate Firebase Id token; This ensures the security of api of this route
protectedApp.use(validateFirebaseIdToken)

//api to check this route
//no Parser is needed
protectedApp.get("/checkPostAuth", async(req : Request, res : Response) => {
    try {
        res.send("check complete")
    }
    catch(error) {
        res.send("error occurred " + error)
    }
})

//api to update the personal details of user
// json Parser is needed
protectedApp.post("/updateUserData", jsonParser, updateUserData)

//api to save new user in firestore after successful login
// json Parser is needed
protectedApp.post("/searchItems", jsonParser, searchItems)

//api to update session doc
//json Parser is needed
protectedApp.post("/checkLatestBidder", jsonParser, checkLatestBidder)

//api to any any document from firestore
//json Parser is needed
protectedApp.post("/getFirestoreDocument", jsonParser, getFirebaseRecord)

//api to save new user in firestore after successful login
// json Parser is needed
protectedApp.post("/saveNewUserInDb", jsonParser, saveNewUserInDb)

//api to upload new item
// json Parser is needed
protectedApp.post("/itemUpload", jsonParser, itemUpload)

export default protectedApp
