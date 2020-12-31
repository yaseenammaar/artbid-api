import {Request, Response} from "express";
import admin from "../firebaseAdmin"
import * as fireAdmin from "firebase-admin"

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

const searchItems = async (req : customRequest, res : Response) => {
    try {

        const { limit = 10, startingDoc = null, searchTerms } = req.body

        const itemsCollectionRef: fireAdmin.firestore.CollectionReference = db.collection("items");

        let itemsQuery: fireAdmin.firestore.Query
        if(startingDoc == null) {
            itemsQuery = itemsCollectionRef.where('search_tags', "array-contains-any", searchTerms).orderBy("upload_timestamp", 'desc').limit(limit);
        }
        else {
            itemsQuery =
                itemsCollectionRef.where('search_tags', "array-contains-any", searchTerms).orderBy("upload_timestamp", 'desc')
                    .startAt(startingDoc)
                    .limit(limit);
        }


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

export default searchItems

