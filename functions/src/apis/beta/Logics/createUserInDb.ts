import admin from "../../../utils/firebaseAdmin";
const db = admin.firestore()

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

export default createUserInDb