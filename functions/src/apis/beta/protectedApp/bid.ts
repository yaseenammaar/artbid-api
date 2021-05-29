import {Request, Response} from "express";
import admin from "../../../utils/firebaseAdmin"
import * as functions from 'firebase-functions';
import {firestore} from "firebase-admin/lib/firestore";
import FieldValue = firestore.FieldValue;
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

const bid = async (req : customRequest, res : Response) => {
    let response: mResponse;
    try {

        const NUM_SHARDS = 5

        const {
            plusAmount = 0,
            itemId,
        } = req.body

        if(!("plusAmount" in req.body) || req.body.plusAmount == null || typeof req.body.plusAmount != "number") {
            throwError("invalid amount data found")
            return
        }

        if(!("itemId" in req.body) || req.body.itemId == null || typeof req.body.itemId != "string") {
            throwError("invalid item data found")
            return
        }

        if(plusAmount <= 0) {
            throwError("amount is less than or equal to zero.")
            return
        }

        const itemDocRef = db.collection("items").doc(itemId)
        const bidCollectionRef = itemDocRef.collection("bids_and_messages")
        const newBidDocRef = bidCollectionRef.doc()
        const bidShardCollectionRef = itemDocRef.collection("bid_shards")
        const shardId = Math.floor(Math.random() * NUM_SHARDS);
        const bidShardDocRef = bidShardCollectionRef.doc(shardId.toString())

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

        // @ts-ignore
        const validityTime: admin.firestore.Timestamp = itemData["closingTimestamp"]
        const currTime = admin.firestore.Timestamp.now()
        if(currTime.toDate() > validityTime.toDate()) {
            throwError("validity time has passed.")
        }

        const batch = db.batch();
        batch.set(newBidDocRef, {
            byUser: req.user.uid,
            plusAmount: plusAmount,
            type: "bid",
            creationTimestamp: Timestamp.now(),
        })

        batch.set(bidShardDocRef, {
            bidCount: FieldValue.increment(1),
            addedPriceCount: FieldValue.increment(plusAmount),
            creationTimestamp: Timestamp.now(),
        }, {merge: true})

        const batchRes = await batch.commit()


        response= {
            writeTime: batchRes,
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

export default bid

