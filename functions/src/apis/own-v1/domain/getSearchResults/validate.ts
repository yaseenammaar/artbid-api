import {NextFunction, Request, Response} from "express";
import mResponse from "./Response";
import BaseValidator from "../../../../utils/BaseValidator";

const validateGetSearchResults = (req: Request, res: Response, next: NextFunction) => {
        const errorRes: mResponse = {
            status: 400,
            error: "",
            available: false,
            coolDomains: [],
            normalDomains: [],
        }

        BaseValidator(req, res, next, errorRes)
}

export default validateGetSearchResults