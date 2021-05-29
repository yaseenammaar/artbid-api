//import * as bodyParser from "body-parser"
import * as express from "express";
import * as functions from 'firebase-functions';

const unprotectedApp = express.Router();

//const jsonParser = bodyParser.json()
//const urlEncodedParser = bodyParser.urlencoded({ extended: false })

unprotectedApp.get("/checkUnprotectedApp", (req, res) => {
    functions.logger.debug('unprotected app check api called...');
    res.send('unprotected app check complete...')
})


export default unprotectedApp
