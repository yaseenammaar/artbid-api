import {Request, Response} from "express";
import appAdmin from "../../../../utils/firebaseAdmin"
import statusCodes from "../../../../constants/statusCodes";
import mResponse from "./Response";
import Item from "../../../../models/Item";

const db = appAdmin.firestore()

//Function that handles the upload item api
const getSpecificItem = async (req : Request, res : Response) => {
    try {
        const { itemId } = req.params

        const itemSnapshot = await db.collection("items").doc(itemId).get()

        if(!itemSnapshot.exists) {
            res.status(statusCodes.NOT_FOUND).send({
                statusCode: statusCodes.NOT_FOUND,
                isError: true,
                error: "document with this id doesn't exist.",
                itemRes: null,
            })
        }

        const item = <Item>itemSnapshot.data()
        if (item) {
            delete item.searchTags
            delete item.searchPermutations
        }

        const response: mResponse = {
            statusCode: statusCodes.SUCCESS,
            isError: false,
            error: null,
            item: item,
        }

        res.status(statusCodes.SUCCESS).send(response)

    } catch (error) {
        console.log(error)
        const response: mResponse = {
            statusCode: statusCodes.SERVICE_UNAVAILABLE,
            isError: true,
            error: error.message,
            item: null,
        }

        res.status(statusCodes.SERVICE_UNAVAILABLE).send(response)
    }
}

export default getSpecificItem
