import BaseCollectionManager from "../../BaseCollectionManager";
import DbCollections from "../../../constants/DbCollections";
import {app, firestore} from "firebase-admin";
import App = app.App;
import DocumentReference = firestore.DocumentReference;

class Following extends BaseCollectionManager{
    constructor(firebase: App, rootDocRef: DocumentReference) {
        super(firebase, rootDocRef, DbCollections.FOLLOWING);
    }
    
}

export default Following