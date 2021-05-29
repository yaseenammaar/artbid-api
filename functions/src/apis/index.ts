import api_v1 from "./v1";
import api_beta from "./beta";
import * as express from "express";
import * as cors from "cors";

const apiExpressApp = express();
const corsHandler = cors({origin: true})

apiExpressApp.use('*', corsHandler)
apiExpressApp.use('/v1', api_v1)
apiExpressApp.use('/beta', api_beta)

export default apiExpressApp