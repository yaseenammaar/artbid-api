import {Request, Response} from "express";
import admin from "../firebaseAdmin"

/*interface updateResponse {
    writeTime:any,
    isUpdated: boolean,
    isError:boolean,
    error: string
    statusCode:number
}*/

interface customRequest extends Request {
    user: any
}

const db = admin.database()

const checkLatestBidder = async (req : customRequest, res : Response) => {
    try {
        const itemKey:string = req.body['itemKey']
        const uid:string = req.body['uid']

        const ref = db.ref("items/" + itemKey + "/bidders")
        const query = ref.orderByKey().limitToLast(1)

        await query.once("value",successCallback)

        function successCallback(snap:any) {

            const got_uid = snap.child('userid').val()
            if(uid !== got_uid) {
                //response is yes;
                //update the database
                res.status(200).send("he or she becomes latest bidder")
            }
            else {
                //response is no
                //don't update database
                res.status(200).send("he or she is already latest bidder" + got_uid)
            }
        }


    } catch (error) {
        res.status(400).send(`Sorry! Some error came at our side. Please try again`)
    }
}


export default checkLatestBidder
