import mResponse from "../deleteItem/Response";
import statusCodes from "../../../../constants/statusCodes";
import {Request, Response} from "express";

const updateItem = async (req : Request, res : Response) => {
    // no implementation yet
    const response: mResponse = {
        isError: true,
        error: "no implementation yet",
        isItemDeleted: false,
        statusCode: statusCodes.SERVICE_UNAVAILABLE,
    }
    res.status(statusCodes.SERVICE_UNAVAILABLE).send(response)
}

export default updateItem