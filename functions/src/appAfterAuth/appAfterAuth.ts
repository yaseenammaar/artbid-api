import validateFirebaseIdToken from "./validateFirebaseIdToken";
import {Request, Response} from "express";
import updateUserData from "./updateUserData";
import * as bodyParser from "body-parser";
import getFirebaseRecord from "./getFirestoreRecord";
import checkLatestBidder from "./checkLatestBidder";
import getNextHomeItems from "./getNextHomeItems";
import saveNewUserInDb from "./saveNewUserInDb";

const express = require('express')

// express instance of after auth middleware
const appAfterAuth = express();

//Body Parser which will parse json body of request;
//Use it with every route which has json body in the request
//Use it as a middleware
const jsonParser = bodyParser.json()

// Middleware to validate Firebase Id token; This ensures the security of api of this route
appAfterAuth.use(validateFirebaseIdToken)

//api to check this route
//no Parser is needed
appAfterAuth.get("/checkPostAuth", async(req : Request, res : Response) => {
    try {
        res.send("check complete")
    }
    catch(error) {
        res.send("error occurred " + error)
    }
})

//api to update the personal details of user
// json Parser is needed
appAfterAuth.post("/updateUserData", jsonParser, updateUserData)

//api to save new user in firestore after successful login
// json Parser is needed
appAfterAuth.post("/getNextHomeItems", jsonParser, getNextHomeItems)

//api to update session doc
//json Parser is needed
appAfterAuth.post("/checkLatestBidder", jsonParser, checkLatestBidder)

//api to any any document from firestore
//json Parser is needed
appAfterAuth.post("/getFirestoreDocument", jsonParser, getFirebaseRecord)

//api to save new user in firestore after successful login
// json Parser is needed
appAfterAuth.post("/saveNewUserInDb", jsonParser, saveNewUserInDb)

export default appAfterAuth
