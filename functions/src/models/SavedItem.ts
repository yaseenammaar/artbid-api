import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

export default interface SavedItem {
    itemId: string,
    creationTimestamp: Timestamp,
}