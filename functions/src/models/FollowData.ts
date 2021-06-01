import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

export default interface FollowData {
    userId: string,
    creationTimestamp: Timestamp,
}