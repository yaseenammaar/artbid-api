
import * as express from 'express'
//import helmet from 'helmet'
//import requestLimiter from 'express-rate-limit'
import own_api_v1 from "./own-v1";
import * as cors from 'cors'
import api_v1 from "./v1";


// limiter givers status code 429
/*const limiter = requestLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests.",
});*/

const corsOpts: cors.CorsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'authorization'],
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
    exposedHeaders: '*',

}
const corsHandler = cors(corsOpts)

const apiExpressApp = express();
apiExpressApp.use(corsHandler)
apiExpressApp.options('*', corsHandler)
//apiExpressApp.use(helmet())
//apiExpressApp.use(limiter)

apiExpressApp.get('/', cors(corsOpts), async(req: express.Request, res: express.Response) => {
    res.status(200).send({
        text: "cors succesful",
    });
})

apiExpressApp.use('/v1', api_v1)


export default apiExpressApp
export {own_api_v1}