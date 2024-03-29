import {Router, Request} from "express";
import itemRouter from "./items";
import userRouter from "./users";
import searchRouter from "./search";
import validateFirebaseIdToken from "../../utils/validateFirebaseIdToken";

const api_v1 = Router()

interface customRequest extends Request {
    user: any
}

// Middleware to validate Firebase Id token; This ensures the security of api of this route
api_v1.use((req, res, next) => validateFirebaseIdToken(<customRequest>req, res, next))

api_v1.use(itemRouter)
api_v1.use(userRouter)
api_v1.use(searchRouter)

export default api_v1