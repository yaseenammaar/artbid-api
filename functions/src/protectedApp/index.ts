import validateFirebaseIdToken from "./validateFirebaseIdToken";
import {Request, Response} from "express";
import updateUserData from "./updateUserData";
import * as bodyParser from "body-parser";
import getFirebaseRecord from "./getFirestoreRecord";
import searchItems from "./searchItems";
import saveNewUserInDb from "./saveNewUserInDb";
import itemUpload from "./itemUpload";
import toggleFollowUnfollow from "./toggleFollowUnfollow";
import saveItemForUser from "./saveItemForUser";
import getItems from "./getItems";

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

//api to search items
// json Parser is needed
protectedApp.post("/searchItems", jsonParser, searchItems)

//api to any any document from firestore
//json Parser is needed
protectedApp.post("/getFirestoreDocument", jsonParser, getFirebaseRecord)

//api to save new user in firestore after successful login
// json Parser is needed
protectedApp.post("/saveNewUserInDb", jsonParser, saveNewUserInDb)

//api to upload new item
// json Parser is needed
protectedApp.post("/itemUpload", jsonParser, itemUpload)

//api to toggle follow unfollow status
// json Parser is needed
protectedApp.post("/toggleFollowUnfollow", jsonParser, toggleFollowUnfollow)

//api to save item for a authenticated user
// json Parser is needed
protectedApp.post("/saveItemForUser", jsonParser, saveItemForUser)

//api to get items from db
// json Parser is needed
protectedApp.post("/getItems", jsonParser, getItems)

export default protectedApp
