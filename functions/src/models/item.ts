import {firestore} from "firebase-admin/lib/firestore";
import Timestamp = firestore.Timestamp;

export default interface Item {
    itemId: string,
    basePrice: number,
    byUser: string,
    category: string,
    closingTimestamp: Timestamp,
    description: string,
    featuredImage: string,
    supportingImages: string[],
    searchTags: string[],
    searchPermutations: string[],
    title: string,
    uploadTimestamp: Timestamp,
}