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
    itemRes: any,
}

//Function that handles the upload item api
const getSpecificItem = async (req : customRequest, res : Response) => {
    try {
        if(!("itemId" in req.body)) {
            res.send({
                statusCode: 400,
                isError: true,
                error: "Invalid Argument! Item id not found.",
                itemRes: null,
            })
        }

        const itemId = req.body.itemId

        if(itemId == null || itemId == "" || typeof itemId != "string") {
            res.send({
                statusCode: 400,
                isError: true,
                error: "Invalid Argument! Item id has invalid value or null value.",
                itemRes: null,
            })
        }


        let itemRes = {};
        const itemSnapshot = await db.collection("items").doc(itemId).get()

        if(!itemSnapshot.exists) {
            res.send({
                statusCode: 400,
                isError: true,
                error: "document with this id doesn't exist.",
                itemRes: null,
            })
        }

        let data = itemSnapshot.data()
        if (data) {
            delete data["search_tags"]
            delete data["search_permutations"]
        }

        itemRes = {
            docData: data,
            itemId: itemSnapshot.id,
        }


        const response: mResponse = {
            statusCode: 200,
            isError: false,
            error: null,
            itemRes,
        }

        res.send(response)

    } catch (error) {
        console.log(error)
        const response: mResponse = {
            statusCode: 400,
            isError: true,
            error: error.message,
            itemRes: null,
        }

        res.send(response)
    }
}

export default getSpecificItem
