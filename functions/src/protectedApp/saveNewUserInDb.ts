import {Request, Response} from "express";
import admin from "../firebaseAdmin"

const db = admin.firestore()

interface customRequest extends Request {
    user: any
}

interface mResponse {
    statusCode:number,
    isError:boolean,
    error:any,
    writeTime:any
}

function createUserInDb(userRecord:any, uid:string) {
    return new Promise((resolve, reject) => {

        const usersDoc = db.doc("users/" + uid)
        usersDoc.set(userRecord, { merge: true })
            .then(function (result) {
                //result.writeTime
                resolve(result)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

const saveNewUserInDb = async (req : customRequest, res : Response) => {
    try {
        const uid = req.user['uid']

        const {
            bio,
            creation_date,
            email,
            last_signin,
            phone_no,
            profile_pic = "https://image.flaticon.com/icons/svg/2893/2893152.svg",
            username,
        } = req.body

        const writeRes:any = await createUserInDb({
            bio,
            creation_date,
            email,
            last_signin,
            phone_no,
            profile_pic,
            username,
        }, uid)

        const response:mResponse = {
            writeTime: writeRes.writeTime,
            isError:false,
            error:null,
            statusCode:200,
        }

        res.send(response)

    } catch (error) {
        const response:mResponse = {
            writeTime: null,
            isError:true,
            error:error,
            statusCode:400,
        }

        res.send(response)
    }
}

export default saveNewUserInDb

