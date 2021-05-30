import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

export default interface User {
    displayName: string | null,
    phoneNumber: string | null,
    email: string | null,
    creationTimestamp: Timestamp | null | string,
    lastSignInTimestamp: Timestamp | null | string,
    bio: string | null,
    profilePic: string | null,
    uid: string,
}