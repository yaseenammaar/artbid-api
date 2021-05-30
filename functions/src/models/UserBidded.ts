import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;
import FieldValue = firestore.FieldValue;

export default interface UserBidded {
    uid: string,
    lastBidTimestamp: Timestamp,
    creationTimestamp: Timestamp,
    plusAmount: number | FieldValue,
}