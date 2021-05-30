import { Response } from "express";
import firebaseAdmin from "../../../../utils/firebaseAdmin";
import Item from "../../../../models/Item";
import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;
import DocumentReference = firestore.DocumentReference;
import FieldValue = firestore.FieldValue;
import ItemBid from "../../../../models/ItemBid";
import BidShard from "../../../../models/BidShard";
import ItemMessage from "../../../../models/ItemMessage";
import RequestWithUser from "../../../../utils/RequestWithUser";
import DbCollections from "../../../../constants/DbCollections";
import UserBidded from "../../../../models/UserBidded";

const db = firebaseAdmin.firestore()
const ITEM_COLLECTION_REF = db.collection(DbCollections.ITEMS)
const NUM_SHARDS = 5

const postBidOrMessage = async (req : RequestWithUser, res : Response) => {
    const {
        plusAmount,
        message,
    }  = req.body

    const {
        bidType,
        itemId,
    } = req.params

    const uid = req.user.uid

    try {
        const itemDocRef = ITEM_COLLECTION_REF.doc(itemId)
        const itemDoc = await itemDocRef.get()

        if(!itemDoc.exists) {
            const errorRes: mResponse = {
                statusCode: statusCodes.BAD_REQUEST,
                error: "item does not exists.",
                isError: true,
                taskCompleted: false,
            }
            res.status(statusCodes.BAD_REQUEST).send(errorRes)
        }

        const itemData = <Item> itemDoc.data()
        const nowTime = Timestamp.now()

        if(nowTime.toDate() > itemData.closingTimestamp.toDate()) {
            const errorRes: mResponse = {
                statusCode: statusCodes.BAD_REQUEST,
                error: "item has closed its bidding.",
                isError: true,
                taskCompleted: false,
            }
            res.status(statusCodes.BAD_REQUEST).send(errorRes)
        }

        if(bidType == "bid") {
            await bidOnItem(itemDocRef, plusAmount, uid)
        }
        else {
            await messageOnItem(itemDocRef, message, uid)
        }

        const successRes: mResponse = {
            statusCode: statusCodes.SUCCESS_RESOURCE_CREATED,
            error: null,
            isError: false,
            taskCompleted: true,
        }
        res.status(statusCodes.SUCCESS_RESOURCE_CREATED).send(successRes)

    }
    catch (e) {
        const catchedRes: mResponse = {
            statusCode: statusCodes.BAD_REQUEST,
            error: e.message,
            isError: true,
            taskCompleted: false,
        }
        res.status(statusCodes.BAD_REQUEST).send(catchedRes)
    }
    res.status(statusCodes.BAD_REQUEST).send("success")
}

async function bidOnItem(itemDocRef: DocumentReference, plusAmount: number, uid: string) {

    const bidCollectionRef = itemDocRef.collection(DbCollections.BIDS_AND_MESSAGES)
    const newBidDocRef = bidCollectionRef.doc()
    const bidShardCollectionRef = itemDocRef.collection(DbCollections.BID_SHARDS)
    const shardId = Math.floor(Math.random() * NUM_SHARDS);
    const bidShardDocRef = bidShardCollectionRef.doc(shardId.toString())
    const biddedUsersCollectionRef = itemDocRef.collection(DbCollections.USERS_BIDDED)

    const bidData: ItemBid = {
        bidId: newBidDocRef.id,
        byUser: uid,
        plusAmount: plusAmount,
        type: "bid",
        creationTimestamp: Timestamp.now(),
    }

    return await db.runTransaction(async (t) => {
        const biddedUser = await t.get(biddedUsersCollectionRef.doc(uid))
        let userBiddedData: UserBidded

        if(biddedUser.exists) {
            const mData = <UserBidded>biddedUser.data()
            userBiddedData = {
                ...mData,
                lastBidTimestamp: Timestamp.now(),
                plusAmount: FieldValue.increment(plusAmount),
            }
        }
        else {
            userBiddedData = {
                uid,
                lastBidTimestamp: Timestamp.now(),
                creationTimestamp: Timestamp.now(),
                plusAmount,
            }
        }

        const bidShardData: BidShard = {
            uniqueUsersBidded: biddedUser.exists? FieldValue.increment(0) : FieldValue.increment(1),
            bidCount: FieldValue.increment(1),
            addedPriceCount: FieldValue.increment(plusAmount),
            creationTimestamp: Timestamp.now(),
        }

        t.set(biddedUsersCollectionRef.doc(uid), userBiddedData, {merge: true})
        t.set(newBidDocRef, bidData)
        t.set(bidShardDocRef, bidShardData, {merge: true})
    })
}

async function messageOnItem(itemDocRef: DocumentReference, message: string, uid: string) {
    const messageCollectionRef = itemDocRef.collection(DbCollections.BIDS_AND_MESSAGES)
    const newMessageDocRef = messageCollectionRef.doc()

    const messageData: ItemMessage = {
        messageId: newMessageDocRef.id,
        byUser: uid,
        message: message,
        type: "message",
        creationTimestamp: Timestamp.now(),
    }

    return await newMessageDocRef.set(messageData)
}

export default postBidOrMessage