import {Request, Response} from "express";
import admin from "../../../utils/firebaseAdmin"
import updateFirestore from "../Logics/updateFirestore";

const auth = admin.auth()

interface updateResponse {
    writeTime:any,
    userRecord:object,
    isUpdated: boolean,
    isError:boolean,
    error: string
    statusCode:number
}

const updateUserData = async (req : Request, res : Response) => {
    const ph_no = req.body['ph_no']
    const photo_url = req.body['photo_url']
    const email = req.body['email']
    const name = req.body['name']
    const uid = req.body['uid']
    try {

        const userRecord = await auth.updateUser(uid, {
            email: email,
            phoneNumber: ph_no,
            displayName: name,
            photoURL: photo_url,
        })

        const WriteRes:any = await updateFirestore(userRecord, "users/" + userRecord.uid)


        console.log('Successfully updated user', userRecord.toJSON());

        const response: updateResponse = {
            writeTime:WriteRes,
            userRecord: userRecord.toJSON(),
            isUpdated: true,
            isError:false,
            error: '',
            statusCode:200,
        }

        res.send(response)

    } catch (error) {

        const response: updateResponse = {
            userRecord: {
                displayName: name,
                email: email,
                phoneNumber: ph_no,
                photoUrl: photo_url,
            },
            isUpdated: false,
            isError:true,
            error: error,
            writeTime:null,
            statusCode:400,
        }

        res.send(response)
    }
}

export default updateUserData

