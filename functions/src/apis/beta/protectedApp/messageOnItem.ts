import {Request, Response} from "express";
import admin from "../../../utils/firebaseAdmin"
import * as functions from 'firebase-functions';
import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

const db = admin.firestore()

interface customRequest extends Request {
    user: any
}

interface mResponse {
    statusCode:number,
    isError:boolean,
    error:any,
    writeTime:any
}

const messageOnItem = async (req : customRequest, res : Response) => {
    let response: mResponse;
    try {

        const {
            message = "",
            itemId,
        } = req.body

        if(!("message" in req.body) || req.body.message == null || typeof req.body.message != "string") {
            throwError("invalid message found")
            return
        }

        if(!("itemId" in req.body) || req.body.itemId == null || typeof req.body.itemId != "string") {
            throwError("invalid item id found")
            return
        }

        if(message.trim() == "") {
            throwError("empty message found.")
            return
        }

        const itemDocRef = db.collection("items").doc(itemId)
        const messageCollectionRef = itemDocRef.collection("bids_and_messages")
        const newMessageDocRef = messageCollectionRef.doc()

        const item = await itemDocRef.get()
        if(!item.exists) {
            throwError("item with given id does not exist.")
            return
        }

        const itemData = item.data()
        if (itemData) {
            throwError("item data is null")
            return
        }

        const writeRes = await newMessageDocRef.set({
            byUser: req.user.uid,
            message: message,
            type: "message",
            creationTimestamp: Timestamp.now(),
        })


        response= {
            writeTime: writeRes.writeTime,
            isError:false,
            error:null,
            statusCode:200,
        }



    } catch (error) {
        functions.logger.error(error.name, error.message)
        response = {
            writeTime: null,
            isError:true,
            error:error.message,
            statusCode:400,
        }

    }
    res.send(response)
}

function throwError(message: string) {
    throw new Error(message)
}

export default messageOnItem

