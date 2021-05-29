import admin from "../../../utils/firebaseAdmin";

const db = admin.firestore()

export default function updateFirestore(userRecord:any, doc:string) {
    return new Promise((resolve,reject) => {
        const mDoc = db.doc(doc)

        mDoc.update(userRecord)
            .then(function (result) {
                const writeTime = result.writeTime
                resolve(writeTime)
            })
            .catch(function (e) {
                reject(e)
            })
    })
}
