import api_v1 from "./v1";
import api_beta from "./beta";
import * as express from "express";
import * as cors from "cors";
import * as helmet from 'helmet'
import * as requestLimiter from 'express-rate-limit'

// limiter givers status code 429
const limiter = requestLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests.",
});

const apiExpressApp = express();
const corsHandler = cors({origin: true})

apiExpressApp.use(helmet())
apiExpressApp.use('*', corsHandler)
apiExpressApp.use(limiter)

apiExpressApp.use('/v1', api_v1)
apiExpressApp.use('/beta', api_beta)

export default apiExpressApp