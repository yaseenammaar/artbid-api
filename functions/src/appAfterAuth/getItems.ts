import {Request, Response} from "express";
import admin from "../firebaseAdmin"

const db = admin.database()

interface customRequest extends Request {
    user: any
}

const getItems = async (req : customRequest, res : Response) => {
    try {
        const ref = db.ref("items")
        const query = ref.orderByKey()

        await query.once("value",successCallback)

        function successCallback(snap:any) {

            const items = snap.val()
            res.status(200).send(items)

        }


    } catch (error) {
        res.status(400).send(`Sorry! Some error came at our side. Please try again`)
    }
}

export default getItems

