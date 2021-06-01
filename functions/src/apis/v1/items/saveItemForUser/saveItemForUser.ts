import RequestWithUser from "../../../../utils/RequestWithUser";
import {Response} from "express";
import appAdmin from "../../../../utils/firebaseAdmin";
import DbCollections from "../../../../constants/DbCollections";
import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import SavedItem from "../../../../models/SavedItem";
import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

const db = appAdmin.firestore()

const saveItemForUser = async (req : RequestWithUser, res : Response) => {
    const uid = req.user.uid
    const {
        itemId,
    } = req.params

    try {

        const savedItemsDocRef = db.collection(`${DbCollections.USERS}/${uid}/${DbCollections.SAVED_ITEMS}`).doc(itemId)
        const transactionRes: mResponse = await db.runTransaction(async (t) => {
            const savedItemDoc = await t.get(savedItemsDocRef)
            if(savedItemDoc.exists) {
                const mRes: mResponse = {
                    error: null,
                    isError: false,
                    statusCode: statusCodes.SUCCESS,
                    itemSaveSuccess: true,
                    itemSavedAlready: true,
                }
                return mRes
            }
            else {
                const saveItemData: SavedItem = {
                    itemId,
                    creationTimestamp: Timestamp.now(),
                }
                t.set(savedItemsDocRef, saveItemData)
                const mRes: mResponse = {
                    error: null,
                    isError: false,
                    statusCode: statusCodes.SUCCESS_RESOURCE_CREATED,
                    itemSaveSuccess: true,
                    itemSavedAlready: false,
                }
                return mRes
            }
        })

        res.status(transactionRes.statusCode).send(transactionRes)
    } catch (e) {
        console.log(e.message)
        const errRes: mResponse = {
            error: e.message,
            isError: true,
            statusCode: statusCodes.SERVICE_UNAVAILABLE,
            itemSaveSuccess: false,
            itemSavedAlready: false,
        }
        res.status(errRes.statusCode).send(errRes)
    }
}

export default saveItemForUser