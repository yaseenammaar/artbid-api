import {Request, Response} from "express";
import admin from "../firebaseAdmin"

const auth = admin.auth()
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
        const docDetails = {
            uid:userRecord.uid === undefined? null: userRecord.uid,
            phoneNumber:userRecord.phoneNumber === undefined? null: userRecord.phoneNumber,
            email: userRecord.email === undefined? null: userRecord.email,
            lastSignInTime:userRecord.lastSignInTime === undefined? null: userRecord.lastSignInTime,
            photoUrl:userRecord.photoURL === undefined? null: userRecord.photoURL,
            displayName:userRecord.displayName === undefined? null: userRecord.displayName,
            isEmailVerified:userRecord.isEmailVerified === undefined? null: userRecord.isEmailVerified,
            creationTime:userRecord.creationTime === undefined? null: userRecord.creationTime

        }

        const usersDoc = db.doc("users/" + uid)
        usersDoc.set(docDetails, { merge: true })
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
        const userRecord = await auth.getUser(uid)

        const writeRes:any = await createUserInDb(userRecord.toJSON(), uid)

        const response:mResponse = {
            writeTime: writeRes.writeTime,
            isError:false,
            error:null,
            statusCode:200
        }

        res.send(response)

    } catch (error) {
        const response:mResponse = {
            writeTime: null,
            isError:true,
            error:error,
            statusCode:400
        }

        res.send(response)
    }
}

export default saveNewUserInDb

