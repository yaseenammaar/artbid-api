import {Request, Response} from "express";
import appAdmin from "../firebaseAdmin"

const db = appAdmin.firestore()

interface customRequest extends Request {
    user: any
}

interface mResponse {
    statusCode: number,
    isError: boolean,
    error: string | any,
    suggestions: any
}

//Function that handles the upload item api
const getSearchSuggestions = async (req : customRequest, res : Response) => {
    try {

        const {
            searchText = null,
        } = req.body

        if(searchText === "" || searchText == null) {
            const errorRes: mResponse = {
                statusCode : 400,
                error: "search text is empty or null",
                isError: true,
                suggestions: null,
            }
            res.send(errorRes)

        }

        const itemCollection = db.collection('keywords')

        const snapshots = await itemCollection
            .where("key_map", 'array-contains', searchText)
            .orderBy("score")
            .limit(10)
            .get()


        const response: mResponse = {
            statusCode: 200,
            isError: false,
            error: null,
            suggestions: snapshots,
        }

        res.send(response)

    } catch (error) {
        const response: mResponse = {
            statusCode: 400,
            isError: true,
            error: error,
            suggestions: null,
        }

        res.send(response)
    }
}

export default getSearchSuggestions
