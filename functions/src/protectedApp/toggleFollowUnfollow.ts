import {Request, Response} from "express";
import admin from "../firebaseAdmin";
import * as firebase from 'firebase-admin';

const db = admin.firestore()
const FOLLOWED = "followed"
const UNFOLLOWED = "unfollowed"

interface customRequest extends Request {
    user: any
}

interface mResponse {
    statusCode:number,
    isError:boolean,
    error:any,
    writeRes:firebase.firestore.WriteResult | any
    toggleAction: string | any
}

const toggleFollowUnfollow = async (req : customRequest, res : Response) => {
    try {
        const uid: string = req.user['uid']
        const followingCollectionRef: firebase.firestore.CollectionReference = db.collection("users/" + uid + "/following")

        const {
            other_user_id
        } = req.body

        const requiredFollowerDoc: firebase.firestore.DocumentSnapshot = await followingCollectionRef.doc(other_user_id).get()
        let Res: firebase.firestore.WriteResult;
        let toggleAction: string;

        if(!requiredFollowerDoc.exists) {
            // follow him or her
            const data = {
                follow_date: firebase.firestore.Timestamp.now(),
                following_id: other_user_id
            }

            Res = await followingCollectionRef.doc(other_user_id).set(data)
            toggleAction = FOLLOWED

        }
        else {
            // unfollow him or her
            // delete the doc
            Res = await followingCollectionRef.doc(other_user_id).delete()
            toggleAction = UNFOLLOWED
        }

        const response:mResponse = {
            writeRes: Res,
            isError:false,
            error:null,
            statusCode:200,
            toggleAction: toggleAction
        }

        res.send(response)

    } catch (error) {
        const response:mResponse = {
            writeRes: null,
            isError:true,
            error:error,
            statusCode:400,
            toggleAction: null
        }

        res.send(response)
    }
}

export default toggleFollowUnfollow

