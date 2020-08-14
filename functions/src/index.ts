import * as cors from 'cors'
import * as functions from 'firebase-functions';
const express = require('express')
import * as cookieParser from "cookie-parser"
import appAfterAuth from "./appAfterAuth/appAfterAuth";
import appBeforeAuth from "./appBeforeAuth/appBeforeAuth";

// Express instances
const main = express();

main.use(cors({origin:true}))

main.use(cookieParser)

main.use('/authApi', appBeforeAuth)
main.use('/postAuthApi', appAfterAuth)

export const webApi = functions.https.onRequest(main);