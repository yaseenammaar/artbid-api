import {ReadResult, WrittenResult} from "./BaseResult";
import {app, firestore} from "firebase-admin";
import App = app.App;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import CollectionReference = firestore.CollectionReference;

class BaseCollectionManager {
    readonly admin: App
    readonly collection: CollectionReference
    constructor(firebase: App, rootDocRef: DocumentReference | null, collectionName: string) {
        this.admin = firebase
        if(rootDocRef == null) {
            this.collection = this.admin.firestore().collection(collectionName)
        }
        else {
            this.collection = rootDocRef.collection(collectionName)
        }
    }

    async createNewDocument(data: DocumentData | object, docId: string | null = null, merge: boolean = true) {
        const doc = docId == null? this.collection.doc() : this.collection.doc(docId)
        try {
            const writeRes = await doc.set(data, {merge: merge})
            const result: WrittenResult = {
                writeRes: writeRes,
                docId: doc.id,
            }
            return result
        }
        catch (e) {
            throw e
        }

    }

    async updateDocument(docId: string, data: DocumentData | object) {
        const doc = this.collection.doc(docId)
        try {
            const writeRes = await doc.update(data)
            const result: WrittenResult = {
                writeRes: writeRes,
                docId: doc.id,
            }
            return result
        }
        catch (e) {
            throw e
        }
    }

    async getDocument(docId: string) {
        const doc = this.collection.doc(docId)
        try {
            const res = await doc.get()
            const result: ReadResult = {
                doc: res,
                docId: doc.id,
            }
            return result
        }
        catch (e) {
            throw e
        }
    }

}

export default BaseCollectionManager