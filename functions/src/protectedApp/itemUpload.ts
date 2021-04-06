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
            supporting_images,
        } = req.body

        const search_tags = [title, state, category, caption]
        let search_permutations: string[] = []

        const itemCollection = db.collection('items')
        const keywordsCollection = db.collection('keywords')

        let itemRes = null

        await db.runTransaction(async (t) => {

            // take each tag and fill search_permutations with each possibility of search
            for (let i = 0; i < search_tags.length; i ++) {
                let keywordPermutation: string[] = []
                const tag: string = search_tags[i];
                for(let j = 1; j <= search_tags.length; j++) {
                    const tagSubstr = tag.substr(0, j)
                    search_permutations.push(tagSubstr);
                    keywordPermutation.push(tagSubstr)
                }

                await keywordsCollection.doc(tag).set({
                    key_map: keywordPermutation,
                    score: 0,
                })
            }

            itemRes = await itemCollection.add({
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
                supporting_images,
                search_tags,
                search_permutations,
            })


        })

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

export default itemUpload
