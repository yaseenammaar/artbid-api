import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import * as requestLimiter from "express-rate-limit";
import domainRouter from "./domain";
import validateFirebaseIdToken from "../../utils/validateFirebaseIdToken";
import {ownApp} from "../../utils/firebaseAdmin";

interface customRequest extends express.Request {
    user: any
}

const own_api_v1 = express()
const corsHandler = cors({origin: true})

// limiter givers status code 429
const limiter = requestLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests.",
});

own_api_v1.use(helmet())
own_api_v1.use('*', corsHandler)
own_api_v1.use(limiter)

// Middleware to validate Firebase Id token; This ensures the security of api of this route
own_api_v1.use((req, res, next) => validateFirebaseIdToken(<customRequest>req, res, next, ownApp))

own_api_v1.use(domainRouter)

export default own_api_v1