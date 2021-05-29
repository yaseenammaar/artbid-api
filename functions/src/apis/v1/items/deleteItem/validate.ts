import {NextFunction, Request, Response} from "express";
import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import BaseValidator from "../../../../utils/BaseValidator";

const validateDeleteItem = (req: Request, res: Response, next: NextFunction) => {
    const errorRes: mResponse = {
        statusCode: statusCodes.BAD_REQUEST,
        isError: true,
        error: "",
        isItemDeleted: false,
    }

    BaseValidator(req, res, next, errorRes)
}

export default validateDeleteItem