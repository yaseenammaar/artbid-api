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
    itemRes: any
}

const ALL_ITEMS = 1
const TRENDING_ITEMS = 2
const SPECIFIC_ITEM = 3

//Function that handles the upload item api
const getItems = async (req : customRequest, res : Response) => {
    try {

        if("type" ! in req.body) {
            res.send({
                statusCode: 400,
                isError: true,
                error: "Invalid Argument! Type not found.",
                itemRes: null,
            })
        }
        const type = req.body.type

        if(type == ALL_ITEMS || type == TRENDING_ITEMS)  {
            if("limit" ! in req.body || "last_snapshot" ! in req.body) {
                res.send({
                    statusCode: 400,
                    isError: true,
                    error: "Invalid Argument! limit or anchor snapshot not found.",
                    itemRes: null,
                })
            }
        }

        if(type == SPECIFIC_ITEM) {
            if("item_id" ! in req.body) {
                res.send({
                    statusCode: 400,
                    isError: true,
                    error: "Invalid Argument! Item id not found.",
                    itemRes: null,
                })
            }
        }

        let itemRes = {};

        if(type === ALL_ITEMS) {
            itemRes = await getAllItems(req);
        }


        const response: mResponse = {
            statusCode: 200,
            isError: false,
            error: null,
            itemRes,
        }

        res.send(response)

    } catch (error) {
        const response: mResponse = {
            statusCode: 400,
            isError: true,
            error: error,
            itemRes: null,
        }

        res.send(response)
    }
}

async function getAllItems(req : customRequest) {
    const {
        limit = 10,
        last_snapshot,
    } = req.body

    let itemSnapshots;

    if(last_snapshot == null) {
        const query = db.collection("items").limit(limit);
        itemSnapshots = await query.get();
    }
    else {
        const query = db.collection("items").startAfter(last_snapshot).limit(limit);
        itemSnapshots = await query.get();
    }

    return itemSnapshots
}

export default getItems
