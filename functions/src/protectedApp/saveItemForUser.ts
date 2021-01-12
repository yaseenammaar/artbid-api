import {Request, Response} from "express";
import appAdmin from "../firebaseAdmin"
import * as firebase from "firebase-admin";

const db = appAdmin.firestore()

interface customRequest extends Request {
    user: any
}

interface mResponse {
    statusCode: number,
    isError: boolean,
    error: string | any,
    writeRes: any
}

//Function that handles the upload item api
const saveItemForUser = async (req : customRequest, res : Response) => {
    try {

        const uid: string = req.user['uid']
        const savedItemsCollectionRef: firebase.firestore.CollectionReference = db.collection("users/" + uid + "/saved_items")

        const {
            item_id
        } = req.body

        const data = {
            saving_date: firebase.firestore.Timestamp.now(),
            item_id
        }

        const Res = await savedItemsCollectionRef.doc(item_id).set(data)

        const response:mResponse = {
            writeRes: Res,
            isError:false,
            error:null,
            statusCode:200,
        }

        res.send(response)

    } catch (error) {
        const response: mResponse = {
            statusCode: 400,
            isError: true,
            error: error,
            writeRes: null
        }

        res.send(response)
    }
}

export default saveItemForUser
