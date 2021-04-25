import {Request, Response} from "express";
import admin from "../firebaseAdmin"
import * as fireAdmin from "firebase-admin"

const ITEM_COLLECTION = "items"
const SEARCH_TAG_FIELD = "search_tags"
const SEARCH_PERMUTATIONS_FIELD = "search_permutations"

const db = admin.firestore()
const itemsCollectionRef: fireAdmin.firestore.CollectionReference = db.collection(ITEM_COLLECTION);


interface customRequest extends Request {
    user: any
}

interface mResponse {
    statusCode: number,
    isError: boolean,
    error: string | any,
    items: any,
    allItemsFetched: boolean,
}

const getSearchResults = async (req : customRequest, res : Response) => {
    try {

        const { limit = 10, startingDoc = null, searchText, method = "search" } = req.body

        const isDataValid = isRequestDataValid(req.body)
        if(!isDataValid.isValid) {
            // data is not valid
            const errRes: mResponse = {
                isError: true,
                error: isDataValid.message,
                items: null,
                allItemsFetched: false,
                statusCode: 400,
            }

            res.send(errRes)  // terminate here and send the error response
        }

        let itemsQuery: fireAdmin.firestore.Query

        if(method == "search") {
            itemsQuery = makeSearchMethodQuery(limit, searchText, startingDoc)
        }
        else {
            itemsQuery = makeSuggestionMethodQuery(limit, searchText, startingDoc)
        }

        const snapshots = await itemsQuery.get()
        let packedItems: { docData: FirebaseFirestore.DocumentData; id: string; }[] = []

        snapshots.forEach(result => {

            let data = result.data()
            if(data) {
                delete data["search_tags"]
                delete data["search_permutations"]
            }

            packedItems.push({
                docData: data,
                id: result.id,
            })
        })

        const response: mResponse = {
            statusCode: 200,
            isError: false,
            error: null,
            items: packedItems,
            allItemsFetched: snapshots.size < limit,
        }

        res.send(response)

    } catch (error) {
        const response: mResponse = {
            statusCode: 400,
            isError: true,
            error: error,
            items: null,
            allItemsFetched: false,
        }

        res.send(response)
    }
}

const makeSearchMethodQuery = (limit: number, searchText: string, startingDoc: null | any) => {
    let query
    if(startingDoc == null) {
        query = itemsCollectionRef.where(SEARCH_PERMUTATIONS_FIELD, "array-contains", searchText).orderBy("upload_timestamp", 'desc').limit(limit);
    }
    else {
        query =
            itemsCollectionRef.where(SEARCH_PERMUTATIONS_FIELD, "array-contains", searchText).orderBy("upload_timestamp", 'desc')
                .startAt(startingDoc)
                .limit(limit);
    }

    return query
}

const makeSuggestionMethodQuery = (limit: number, searchText: string, startingDoc: null|any) => {
    let query
    if(startingDoc == null) {
        query = itemsCollectionRef.where(SEARCH_TAG_FIELD, "array-contains", searchText).orderBy("upload_timestamp", 'desc').limit(limit);
    }
    else {
        query =
            itemsCollectionRef.where(SEARCH_TAG_FIELD, "array-contains", searchText).orderBy("upload_timestamp", 'desc')
                .startAt(startingDoc)
                .limit(limit);
    }
    return query
}

const isRequestDataValid = (body: any) => {
    let isValid: boolean
    let message: string
    if( !("searchText" in body) || !("method" in body) ) {
        isValid = false
        message = "searchText or method is not found."
    }
    else if(body["searchText"] === undefined || body["searchText"] === null) {
        isValid = false
        message = "searchText cannot be null or undefined."
    }
    else if(body["method"] !== "search" && body["method"] !== "suggestion") {
        console.log(body["method"])
        isValid = false
        message = "method can only be 'search' or 'suggestion'"
    }
    else {
        isValid = true
        message = "request data is valid."
    }

    return {
        isValid,
        message,
    }
}

export default getSearchResults

