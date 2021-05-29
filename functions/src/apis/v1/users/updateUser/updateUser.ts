import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import RequestWithUser from "../../../../utils/RequestWithUser";
import {Response} from "express";

const updateUser = async (req : RequestWithUser, res : Response) => {
    // no implementation yet
    const response: mResponse = {
        isError: true,
        error: "no implementation yet",
        isUserUpdated: false,
        statusCode: statusCodes.SERVICE_UNAVAILABLE,
    }
    res.status(statusCodes.SERVICE_UNAVAILABLE).send(response)
}

export default updateUser