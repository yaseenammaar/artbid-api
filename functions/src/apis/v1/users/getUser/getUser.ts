import { Response } from "express";
import RequestWithUser from "../../../../utils/RequestWithUser";
import appAdmin from "../../../../utils/firebaseAdmin";
import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import User from "../../../../models/user";

const db = appAdmin.firestore()
const Modes = {
    CURRENT_USER: 1,
    PROTECTED_USER: 2,
}

const getUser = async (req : RequestWithUser, res : Response) => {
    const {
        userId,
    } = req.params

    try {
        let mode = Modes.PROTECTED_USER
        let fetchUserId = userId

        if(userId === "currentUser" || userId === req.user.uid) {
            mode = Modes.CURRENT_USER
            fetchUserId = req.user.uid
        }

        const userDoc = await db.collection('users').doc(fetchUserId).get()
        if(!userDoc.exists) {
            const errorRes: mResponse = {
                statusCode: statusCodes.BAD_REQUEST,
                isError: true,
                error: "document doesn't exists with this id",
                user: null,
            }
            res.status(statusCodes.BAD_REQUEST).send(errorRes)
            return
        }

        const userData: User = <User>userDoc.data()
        console.log(userData)

        const {
            displayName,
            bio,
            uid,
            phoneNumber,
            email,
            creationTimestamp,
            lastSignInTimestamp,
            profilePic,
        } = userData


        let sendingData: {}
        if(mode === Modes.PROTECTED_USER) {
            sendingData = {
                displayName,
                bio,
                uid,
                profilePic,
            }
        }
        else {
            sendingData = {
                displayName,
                bio,
                uid,
                email,
                phoneNumber,
                creationTimestamp,
                lastSignInTimestamp,
                profilePic,
            }
        }

        const response: mResponse = {
            statusCode: statusCodes.SUCCESS,
            isError: false,
            error: null,
            user: sendingData,
        }
        res.status(statusCodes.SUCCESS).send(response)
    }
    catch (e) {
        const response: mResponse = {
            statusCode: statusCodes.SERVICE_UNAVAILABLE,
            isError: true,
            error: e.message,
            user: null,
        }
        res.status(statusCodes.SERVICE_UNAVAILABLE).send(response)
    }
}

export default getUser