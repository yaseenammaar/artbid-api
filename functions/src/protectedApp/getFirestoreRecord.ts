import {Request, Response} from "express";
import admin from "../firebaseAdmin"

const db = admin.firestore()

interface customRequest extends Request {
    user: any
}

interface updateResponse {
    docRecord:any,
    isError:boolean,
    error: string
    statusCode:number
}

const getFirebaseRecord = async (req : customRequest, res : Response) => {
    const documentPath = req.body['docPath']

    try {

        const mDocRef = db.doc(documentPath)
        const doc = await mDocRef.get()

        let response: updateResponse

        if(doc.exists) {
            response = {
                docRecord: doc,
                isError:false,
                error: '',
                statusCode:200,
            }
        }
        else {
            response = {

                docRecord: {},
                isError:true,
                error: 'doc does not exist',
                statusCode:200,
            }
        }


        res.send(response)

    } catch (error) {

        const response: updateResponse = {
            docRecord: {},
            isError:true,
            error: error,
            statusCode:400,
        }

        res.send(response)
    }
}

export default getFirebaseRecord
