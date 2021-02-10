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
        const user = req.user
        const uid = user.uid

        const {
            bio,
            city,
        } = req.body

        const writeRes:any = await createUserInDb({
            uid,
            bio,
            creation_date: user.metadata.creationTime === undefined ? null : user.metadata.creationTime,
            email: user.email === undefined ? null : user.email,
            last_signin: user.metadata.lastSignInTime === undefined ? null : user.metadata.lastSignInTime,
            phone_no: user.phoneNumber === undefined ? null : user.phoneNumber,
            profile_pic: user.photoURL === undefined? "https://image.flaticon.com/icons/svg/2893/2893152.svg" : user.photoURL,
            username: user.displayName === undefined ? null : user.displayName,
            city,
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

