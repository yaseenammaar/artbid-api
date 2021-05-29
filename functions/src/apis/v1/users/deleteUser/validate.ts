import {NextFunction, Request, Response} from "express";
import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import BaseValidator from "../../../../utils/BaseValidator";

const validateDeleteUser = (req: Request, res: Response, next: NextFunction) => {
    const errorRes: mResponse = {
        statusCode: statusCodes.BAD_REQUEST,
        isError: true,
        error: "",
        isUserDeleted: false,
    }

    BaseValidator(req, res, next, errorRes)
}

export default validateDeleteUser