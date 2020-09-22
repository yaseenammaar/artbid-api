import {Request, Response} from "express";
import admin from "../firebaseAdmin"


const db = admin.firestore()

interface customRequest extends Request {
    user: any
}

interface mResponse {
    statusCode: number,
    isError: boolean,
    error: string | any,
    items: any
}

const getNextHomeItems = async (req : customRequest, res : Response) => {
    try {

        const { limit = 10} = req.body
        const startingDoc = req.body['startingDoc']

        const itemsCollectionRef: admin.firestore.CollectionReference = db.collection("items");
        const itemsQuery: admin.firestore.Query =
            itemsCollectionRef.orderBy("creation_timestamp", 'desc')
                .startAt(startingDoc)
                .limit(limit);

        const snapshots = await itemsQuery.get()

        const response: mResponse = {
            statusCode: 200,
            isError: false,
            error: null,
            items: snapshots
        }

        res.send(response)

    } catch (error) {
        const response: mResponse = {
            statusCode: 400,
            isError: true,
            error: error,
            items: null
        }

        res.send(response)
    }
}

export default getNextHomeItems

