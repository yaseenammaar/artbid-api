import * as express from "express";
import * as cors from "cors";
import itemRouter from "./items";
import userRouter from "./users";
import searchRouter from "./search";
import validateFirebaseIdToken from "../../utils/validateFirebaseIdToken";

const api_v1 = express.Router()
const corsHandler = cors({origin: true})

interface customRequest extends express.Request {
    user: any
}

api_v1.use('*', corsHandler)
// Middleware to validate Firebase Id token; This ensures the security of api of this route
api_v1.use((req, res, next) => validateFirebaseIdToken(<customRequest>req, res, next))

api_v1.use(itemRouter)
api_v1.use(userRouter)
api_v1.use(searchRouter)

export default api_v1