import {NextFunction, Request, Response} from "express";
import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import BaseValidator from "../../../../utils/BaseValidator";

const validateSaveItemForUser = (req: Request, res: Response, next: NextFunction) => {
    const errorRes: mResponse = {
        statusCode: statusCodes.BAD_REQUEST,
        isError: true,
        error: "",
        itemSavedAlready: false,
        itemSaveSuccess: false,
    }

    BaseValidator(req, res, next, errorRes)
}

export default validateSaveItemForUser