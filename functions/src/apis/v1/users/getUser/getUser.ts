import { Response } from "express";
import RequestWithUser from "../../../../utils/RequestWithUser";
import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import User from "../../../../models/User";
import ArtbidDatabaseManager from "../../../../databaseManager/artbid";
import admin from "../../../../utils/firebaseAdmin";
import * as functions from 'firebase-functions'

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

        functions.logger.debug('getUser', 'admin is', admin)
        const databaseManager = new ArtbidDatabaseManager(admin)
        const readRes = await databaseManager.users.getDocument(fetchUserId)
        if(!readRes.doc?.exists) {
            const errorRes: mResponse = {
                statusCode: statusCodes.BAD_REQUEST,
                isError: true,
                error: "document doesn't exists with this id",
                user: null,
            }
            res.status(statusCodes.BAD_REQUEST).send(errorRes)
            return
        }

        const userData: User = <User>readRes.doc.data()
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
        functions.logger.error('getUser:: line: 88', e)
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