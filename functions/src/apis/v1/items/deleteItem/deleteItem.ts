import {Response, Request} from "express";
import statusCodes from "../../../../constants/statusCodes";
import mResponse from "./Response";

const deleteItem = async (req : Request, res : Response) => {
    // no implementation yet
    const response: mResponse = {
        isError: true,
        error: "no implementation yet",
        isItemDeleted: false,
        statusCode: statusCodes.SERVICE_UNAVAILABLE,
    }
    res.status(statusCodes.SERVICE_UNAVAILABLE).send(response)
}

export default deleteItem