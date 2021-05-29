import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import statusCodes from "../constants/statusCodes";

const BaseValidator = (req: Request, res: Response, next: NextFunction, response: any) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        res.status(statusCodes.BAD_REQUEST).send({
            ...response,
            error: validationErrors.array({onlyFirstError: true})[0].msg,
            statusCode: statusCodes.BAD_REQUEST,
            isError: true,
        })
        return
    }
    else {
        next()
        return
    }
}

export default BaseValidator