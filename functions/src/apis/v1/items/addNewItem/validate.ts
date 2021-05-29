import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import {NextFunction, Request, Response} from 'express'
import BaseValidator from "../../../../utils/BaseValidator";

const validateAddNewItem = (req: Request, res: Response, next: NextFunction) => {
    const errorRes: mResponse = {
        statusCode: statusCodes.BAD_REQUEST,
        isError: true,
        error: "",
        addResult: null,
    }

    BaseValidator(req, res, next, errorRes)
}

export default validateAddNewItem