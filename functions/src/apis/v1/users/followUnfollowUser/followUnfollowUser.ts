import {Response} from "express";
import RequestWithUser from "../../../../utils/RequestWithUser";
import firebaseAdmin from "../../../../utils/firebaseAdmin";
import DbCollections from "../../../../constants/DbCollections";
import mResponse from "./Response";
import statusCodes from "../../../../constants/statusCodes";
import FollowData from "../../../../models/FollowData";
import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

const db = firebaseAdmin.firestore()

const followUnfollowUser = async (req : RequestWithUser, res : Response) => {
    const uid = req.user.uid
    const {
        taskType,
    } = req.params

    const {
        otherUserId,
    } = req.body

    try {

        if(taskType === "follow") {
            await follow(uid, otherUserId)
        }
        else {
            await unfollow(uid, otherUserId)
        }

        const successRes: mResponse = {
            statusCode: statusCodes.SUCCESS,
            error: null,
            isError: false,
            taskCompleted: true,
        }

        res.status(successRes.statusCode).send(successRes)
    } catch (e) {
        const errorRes: mResponse = {
            statusCode: statusCodes.SERVICE_UNAVAILABLE,
            error: e.message,
            isError: true,
            taskCompleted: false,
        }

        res.status(errorRes.statusCode).send(errorRes)
    }


}

async function follow(uid: string, otherUserId: string) {
    const currentUserDocRef = db.collection(DbCollections.USERS).doc(uid)
    const otherUserDocRef = db.collection(DbCollections.USERS).doc(otherUserId)

    const currUserFollowingData: FollowData = {
        creationTimestamp: Timestamp.now(),
        userId: otherUserId,
    }

    const otherUserFollowerData: FollowData = {
        creationTimestamp: Timestamp.now(),
        userId: uid,
    }

    const batch = db.batch()
    batch.set(currentUserDocRef.collection(DbCollections.FOLLOWING).doc(otherUserId), currUserFollowingData)
    batch.set(otherUserDocRef.collection(DbCollections.FOLLOWERS).doc(uid), otherUserFollowerData)
    await batch.commit()
}

async function unfollow(uid: string, otherUserId: string) {
    const currentUserDocRef = db.collection(DbCollections.USERS).doc(uid)
    const otherUserDocRef = db.collection(DbCollections.USERS).doc(otherUserId)

    const batch = db.batch()
    batch.delete(currentUserDocRef.collection(DbCollections.FOLLOWING).doc(otherUserId))
    batch.delete(otherUserDocRef.collection(DbCollections.FOLLOWERS).doc(uid))
    await batch.commit()
}

export default followUnfollowUser