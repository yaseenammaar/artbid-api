import {Request, Response} from "express";
import errorCodes from "../../../../constants/statusCodes";
import admin from "../../../../utils/firebaseAdmin";
import * as fireAdmin from "firebase-admin";
import mResponse from "./Response";
import Item from "../../../../models/Item";

const ITEM_COLLECTION = "items"
const SEARCH_TAG_FIELD = "searchTags"
const UPLOAD_TIMESTAMP_FIELD = "uploadTimestamp"
const SEARCH_PERMUTATIONS_FIELD = "searchPermutations"

const db = admin.firestore()
const itemsCollectionRef: fireAdmin.firestore.CollectionReference = db.collection(ITEM_COLLECTION);

const getSearchResults = async (req : Request, res : Response) => {
    const {
        keyword,
    } = req.params

    const {
        limit = 10,
        method = "search",
        lastResultId = null,
    } = req.query

    try {

        let itemsQuery: fireAdmin.firestore.Query

        if(method === "search") {
            itemsQuery = makeSearchMethodQuery(parseInt(limit.toString()), keyword, lastResultId)
        }
        else {
            itemsQuery = makeSuggestionMethodQuery(parseInt(limit.toString()), keyword, lastResultId)
        }

        const snapshots = await itemsQuery.get()
        const packedItems: Item[] = []

        snapshots.forEach(result => {

            const item = <Item>result.data()
            if(item) {
                delete item.searchTags
                delete item.searchPermutations
            }

            packedItems.push(item)
        })

        const response: mResponse = {
            statusCode: errorCodes.SUCCESS,
            isError: false,
            error: null,
            results: packedItems,
            allItemsFetched: snapshots.size < parseInt(limit.toString()),
        }

        res.status(errorCodes.SUCCESS).send(response)
    }
    catch (e) {
        const response: mResponse = {
            statusCode: errorCodes.SERVICE_UNAVAILABLE,
            isError: true,
            error: e.message,
            results: null,
            allItemsFetched: false,
        }

        res.status(errorCodes.SERVICE_UNAVAILABLE).send(response)
    }

}

const makeSearchMethodQuery = (limit: number, searchText: string, lastResultId: null | string | any) => {
    let query
    if(lastResultId == null) {
        query = itemsCollectionRef.where(SEARCH_PERMUTATIONS_FIELD, "array-contains", searchText).orderBy(UPLOAD_TIMESTAMP_FIELD, 'desc').limit(limit);
    }
    else {
        query =
            itemsCollectionRef.where(SEARCH_PERMUTATIONS_FIELD, "array-contains", searchText).orderBy(UPLOAD_TIMESTAMP_FIELD, 'desc')
                .startAfter(lastResultId)
                .limit(limit);
    }

    return query
}

const makeSuggestionMethodQuery = (limit: number, searchText: string, lastResultId: null | string | any) => {
    let query
    if(lastResultId == null) {
        query = itemsCollectionRef.where(SEARCH_TAG_FIELD, "array-contains", searchText).orderBy(UPLOAD_TIMESTAMP_FIELD, 'desc').limit(limit);
    }
    else {
        query =
            itemsCollectionRef.where(SEARCH_TAG_FIELD, "array-contains", searchText).orderBy(UPLOAD_TIMESTAMP_FIELD, 'desc')
                .startAfter(lastResultId)
                .limit(limit);
    }
    return query
}

export default getSearchResults