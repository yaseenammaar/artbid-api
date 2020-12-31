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

//Function that handles the upload item api
const itemUpload = async (req : customRequest, res : Response) => {
    try {

        const {
            available_state = 'All',
            base_price,
            by_user,
            caption,
            category,
            closing_date,
            closing_time,
            state,
            status,
            title,
            featured_image,
            supporting_images
        } = req.body

        const itemCollection = db.collection('items')

        const itemRes = await itemCollection.add({
            available_state,
            base_price,
            by_user,
            caption,
            category,
            closing_date,
            closing_time,
            state,
            status,
            title,
            featured_image,
            supporting_images
        })

        const response: mResponse = {
            statusCode: 200,
            isError: false,
            error: null,
            itemRes
        }

        res.send(response)

    } catch (error) {
        const response: mResponse = {
            statusCode: 400,
            isError: true,
            error: error,
            itemRes: null
        }

        res.send(response)
    }
}

export default itemUpload
