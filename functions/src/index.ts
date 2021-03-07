import * as functions from 'firebase-functions';
import * as express from "express";
import * as cors from "cors";
//import * as cookieParser from "cookie-parser"

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
const corsHandler = cors({origin: true})

main.use('*', corsHandler)
// @ts-ignore
//main.use(cookieParser)

main.use('/unprotectedApi', unprotectedApp)
main.use('/protectedApi', protectedApp)

export const webApi = functions.https.onRequest(main);


export const testApi = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => {
        functions.logger.info("Hello logs!", {structuredData: true});
        response.send("Hello from Firebase!");
    })
});
