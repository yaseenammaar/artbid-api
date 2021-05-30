import {Request, Response} from "express";
import appAdmin from "../../../../utils/firebaseAdmin"
import statusCodes from "../../../../constants/statusCodes";
import mResponse from "./Response";
import Item from "../../../../models/Item";

const db = appAdmin.firestore()

export const allowedOrderingFields = ['closingTimestamp', 'uploadTimestamp', 'basePrice']

const getItemsQuery = async (req : Request, res : Response) => {
    try {

        const {
            sort,
            title,
            notTitle,
            category,
            notCategory,
            byUser,
            notByUser,
            limit = 10,
            lastDocId,
        } = req.query

        let query:  FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db.collection('items')

        if(title != null && title != "") {
            query = query.where('title', '==', title)
        }

        if(notTitle != null && notTitle != "") {
            query = query.where('title', '!=', notTitle)
        }

        if(category != null && category != "") {
            query = query.where('category', '==', category)
        }

        if(notCategory != null && notCategory != "") {
            query = query.where('category', '!=', notCategory)
        }

        if(byUser != null && byUser != "") {
            query = query.where('byUser', '==', byUser)
        }

        if(notByUser != null && notByUser != "") {
            query = query.where('byUser', '!=', notByUser)
        }

        if(sort != null) {
            // @ts-ignore
            sort.forEach((fieldArray, i) => {
                query = query.orderBy(fieldArray[0], fieldArray[1])
            })
        }

        if(lastDocId != null && lastDocId != "") {
            query = query.startAfter(lastDocId)
        }

        query = query.limit(parseInt(limit.toString()))
        const dataSnapshots = await query.get()
        const packedItems: Item[] = []

        dataSnapshots.forEach(result => {

            let item = <Item>result.data()
            if(item) {
                delete item.searchTags
                delete item.searchPermutations
            }

            packedItems.push(item)
        })


        const response: mResponse = {
            statusCode: 200,
            isError: false,
            error: null,
            items: packedItems,
        }

        res.send(response)

    } catch (error) {
        console.log(error.message)
        const response: mResponse = {
            statusCode: statusCodes.SERVICE_UNAVAILABLE,
            isError: true,
            error: error.message,
            items: null,
        }

        res.status(statusCodes.SERVICE_UNAVAILABLE).send(response)
    }
}


export default getItemsQuery
