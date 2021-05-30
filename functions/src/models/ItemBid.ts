import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

export default interface ItemBid {
    bidId: string,
    byUser: string,
    type: "bid",
    plusAmount: number,
    creationTimestamp: Timestamp,
}