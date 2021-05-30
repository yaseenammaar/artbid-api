import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;
import FieldValue = firestore.FieldValue;

export default interface BidShard{
    uniqueUsersBidded: number | FieldValue,
    bidCount: number | FieldValue,
    addedPriceCount: number | FieldValue,
    creationTimestamp: Timestamp | string,
}