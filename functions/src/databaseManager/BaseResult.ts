import {firestore} from "firebase-admin";
import DocumentSnapshot = firestore.DocumentSnapshot;
import WriteResult = firestore.WriteResult;

export default interface BaseResult {
    docId: string,
}

export interface ReadResult extends BaseResult {
    doc: DocumentSnapshot | null
}

export interface WrittenResult extends BaseResult {
    writeRes: WriteResult | null
}