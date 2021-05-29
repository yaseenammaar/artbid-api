// Express instances
import * as express from "express";
import * as cors from "cors";
import unprotectedApp from "./unprotectedApp";
import protectedApp from "./protectedApp";

const api_beta = express.Router();
const corsHandler = cors({origin: true})

api_beta.use('*', corsHandler)
api_beta.use('/unprotectedApi', unprotectedApp)
api_beta.use('/protectedApi', protectedApp)

export default api_beta