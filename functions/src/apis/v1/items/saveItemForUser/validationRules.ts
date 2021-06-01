import {checkSchema, ParamSchema} from "express-validator";
import firebaseAdmin from "../../../../utils/firebaseAdmin";
import DbCollections from "../../../../constants/DbCollections";

const validationSchema: Record<string, ParamSchema> = {
    itemId: {
        in: "params",
        isString: true,
        trim: true,
        errorMessage: "item id is not valid",
        isEmpty: {
            negated: true,
        },
        custom: {
            options: async (value) => {
                const itemDoc = await firebaseAdmin.firestore().collection(DbCollections.ITEMS).doc(value).get()
                if(!itemDoc.exists) {
                    throw new Error("item doesn't exist.")
                }
                return true
            },
        },
    },

}

const saveItemForUserValidationRules = checkSchema(validationSchema)
export default saveItemForUserValidationRules