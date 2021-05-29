import {Request, Response} from "express";
import errorCodes from "../../../../constants/statusCodes";
import appAdmin from "../../../../utils/firebaseAdmin";
import mResponse from "./Response";

const db = appAdmin.firestore()

const getSearchSuggestions = async (req : Request, res : Response) => {
    console.log("running suggestions function...")
    const {
        searchWord,
    } = req.params

    try {
        const itemCollection = db.collection('keywords')

        const snapshots = await itemCollection
            .where("keyMap", 'array-contains', searchWord)
            .orderBy("score", 'desc')
            .limit(10)
            .get()

        let suggestions: string[] = []
        snapshots.forEach(snap => {
            suggestions.push(snap.id)
        })

        const response: mResponse = {
            statusCode: errorCodes.SUCCESS,
            isError: false,
            error: null,
            suggestions,
        }

        res.status(errorCodes.SUCCESS).send(response)
    }
    catch (e) {
        const response: mResponse = {
            statusCode: errorCodes.BAD_GATEWAY,
            isError: true,
            error: e.message,
            suggestions: null,
        }

        res.status(errorCodes.SUCCESS).send(response)
    }

}

export default getSearchSuggestions