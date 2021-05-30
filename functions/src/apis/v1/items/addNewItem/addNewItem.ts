import {Response} from "express";
import appAdmin from "../../../../utils/firebaseAdmin";
import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;
import statusCodes from "../../../../constants/statusCodes";
import mResponse from "./Response";
import RequestWithUser from "../../../../utils/RequestWithUser";
import Keyword from "../../../../models/Keyword";
import Item from "../../../../models/Item";

const db = appAdmin.firestore()

const addNewItem = async (req : RequestWithUser, res : Response) => {
    try {

        const {
            newDocId,
            basePrice,
            description,
            category,
            closingTimestamp,
            title,
            featuredImage,
            supportingImages,
        } = req.body

        const searchTags: string[] = []
        searchTags.push(title.toString().toLowerCase())
        searchTags.push(category.toString().toLowerCase())

        let searchPermutations: string[] = []

        const itemCollection = db.collection('items')
        const keywordsCollection = db.collection('keywords')

        let updateResult
        const batch = db.batch();

        // take each tag and fill search_permutations with each possibility of search
        for (let i = 0; i < searchTags.length; i++) {
            let keywordPermutation: string[] = []
            const tag: string = searchTags[i];

            for (let j = 1; j <= tag.length; j++) {
                const tagSubstr = tag.substr(0, j)
                searchPermutations.push(tagSubstr);
                keywordPermutation.push(tagSubstr)
            }

            const keywordDoc: Keyword = {
                keyMap: keywordPermutation,
                score: 0,
            }
            batch.set(keywordsCollection.doc(tag), keywordDoc)
        }

        const itemData: Item = {
            itemId: newDocId,
            basePrice,
            byUser: req.user.uid,
            description,
            category,
            closingTimestamp: Timestamp.fromDate(new Date(closingTimestamp)),
            title,
            featuredImage,
            supportingImages,
            searchTags,
            searchPermutations,
            uploadTimestamp: Timestamp.now(),
        }
        batch.set(itemCollection.doc(newDocId), itemData)

        updateResult = await batch.commit()

        const response: mResponse = {
            statusCode: statusCodes.SUCCESS,
            isError: false,
            error: null,
            addResult: updateResult,
        }

        res.status(statusCodes.SUCCESS).send(response)

    } catch (error) {
        console.log(error)
        console.log(error.message)
        const response: mResponse = {
            statusCode: statusCodes.SERVICE_UNAVAILABLE,
            isError: true,
            error: error,
            addResult: null,
        }

        res.status(statusCodes.SERVICE_UNAVAILABLE).send(response)
    }
}

export default addNewItem