import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

export default interface ItemMessage {
    messageId: string,
    byUser: string,
    message: string,
    type: "message",
    creationTimestamp: Timestamp | string,
}