import {Response} from "express";
import RequestWithUser from "../../../../utils/RequestWithUser";
import * as functions from "firebase-functions";
import admin from "../../../../utils/firebaseAdmin";
import statusCodes from "../../../../constants/statusCodes";
import mResponse from "./Response";
import User from "../../../../models/User";
import ArtbidDatabaseManager from "../../../../databaseManager/artbid";

const addNewUser = async (req : RequestWithUser, res : Response) => {
    try {

        const uid = req.user.uid
        functions.logger.log(req.body)

        const {
            bio,
        } = req.body

        const user = await admin.auth().getUser(uid)

        const userData: User = {
            uid,
            bio,
            creationTimestamp: user.metadata.creationTime === undefined ? null : user.metadata.creationTime,
            email: user.email === undefined ? null : user.email,
            lastSignInTimestamp: user.metadata.lastSignInTime === undefined ? null : user.metadata.lastSignInTime,
            phoneNumber: user.phoneNumber === undefined ? null : user.phoneNumber,
            profilePic: user.photoURL === undefined? "https://image.flaticon.com/icons/svg/2893/2893152.svg" : user.photoURL,
            displayName: user.displayName === undefined ? null : user.displayName,
        }

        const databaseManager = new ArtbidDatabaseManager(admin)
        const creationRes = await databaseManager.users.createNewDocument(userData, uid)

        const response: mResponse = {
            writeTime: creationRes.writeRes?.writeTime,
            isError:false,
            error:null,
            statusCode: statusCodes.SUCCESS_RESOURCE_CREATED,
        }

        res.status(statusCodes.SUCCESS_RESOURCE_CREATED).send(response)

    } catch (error) {
        functions.logger.error(error.name, error.message)
        const response: mResponse = {
            writeTime: null,
            isError:true,
            error:error.message,
            statusCode: statusCodes.SERVICE_UNAVAILABLE,
        }

        res.status(statusCodes.SERVICE_UNAVAILABLE).send(response)
    }

}

export default addNewUser