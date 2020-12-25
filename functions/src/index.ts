import * as functions from 'firebase-functions';

import * as cors from "cors"
const express = require('express')
import * as cookieParser from "cookie-parser"

import protectedApp from "./protectedApp";
import unprotectedApp from "./unprotectedApp";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Express instances
const main = express();

main.use(cors({origin:true}))

main.use(cookieParser)

main.use('/unprotectedApi', unprotectedApp)
main.use('/protectedApi', protectedApp)

export const webApi = functions.https.onRequest(main);
