import {Request, Response} from "express";
import appAdmin from "../firebaseAdmin"
import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

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
const itemUpload = async (req: customRequest, res: Response) => {
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
            supporting_images,
        } = req.body

        const search_tags: string[] = []
        search_tags.push(title.toString().toLowerCase())
        search_tags.push(state.toString().toLowerCase())
        search_tags.push(category.toString().toLowerCase())
        search_tags.push(caption.toString().toLowerCase())

        console.log("search tags : ", search_tags)

        let search_permutations: string[] = []

        const itemCollection = db.collection('items')
        const keywordsCollection = db.collection('keywords')

        let itemRes = null
        const batch = db.batch();

        // take each tag and fill search_permutations with each possibility of search
        for (let i = 0; i < search_tags.length; i++) {
            let keywordPermutation: string[] = []
            const tag: string = search_tags[i];
            console.log("search_tag : ", tag)
            for (let j = 1; j <= tag.length; j++) {
                const tagSubstr = tag.substr(0, j)
                search_permutations.push(tagSubstr);
                keywordPermutation.push(tagSubstr)
            }

            batch.set(keywordsCollection.doc(tag), {
                key_map: keywordPermutation,
                score: 0,
            })
        }

        batch.set(itemCollection.doc(), {
            available_state,
            base_price,
            by_user,
            description: caption,
            category,
            closing_date,
            closing_time,
            state,
            status,
            title,
            featured_image,
            supporting_images,
            search_tags,
            search_permutations,
            upload_timestamp: Timestamp.now(),
        })

        itemRes = await batch.commit()

        const response: mResponse = {
            statusCode: 200,
            isError: false,
            error: null,
            itemRes,
        }

        res.send(response)

    } catch (error) {
        console.log(error)
        console.log(error.message)
        const response: mResponse = {
            statusCode: 400,
            isError: true,
            error: error,
            itemRes: null,
        }

        res.send(response)
    }
}

export default itemUpload
