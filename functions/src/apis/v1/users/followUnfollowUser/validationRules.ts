import {checkSchema, ParamSchema} from "express-validator";
import firebaseAdmin from "../../../../utils/firebaseAdmin";
import DbCollections from "../../../../constants/DbCollections";

const validationSchema: Record<string, ParamSchema> = {
    otherUserId: {
        in: "body",
        isString: true,
        trim: true,
        errorMessage: "other user id param invalid.",
        isEmpty: {
            negated: true,
        },
        custom: {
            options: async (value, {req}) => {
                if(value === req.user.uid) {
                    throw new Error("other user id cannot be same as this user")
                }

                try {
                    await firebaseAdmin.auth().getUser(value)
                } catch (e) {
                    throw new Error(e.message)
                }
                return true
            },
        },

    },

    taskType: {
        in: "params",
        isString: true,
        trim: true,
        errorMessage: "task type is not valid",
        isEmpty: {
            negated: true,
        },
        custom: {
            options: async (value, {req}) => {
                const db = firebaseAdmin.firestore()
                const currentUser = req.user.uid
                const otherUser = req.body.otherUserId

                const followingDocRef = db.collection(DbCollections.USERS).doc(currentUser).collection(DbCollections.FOLLOWING).doc(otherUser)
                const followingDoc = await followingDocRef.get()
                if(followingDoc.exists && value === "follow") {
                    throw new Error("current user is already following the other user.")
                }
                else if(!followingDoc.exists && value === "unfollow") {
                    throw new Error("current user does not follow the other user.")
                }

                return true
            },
        },

    },
}

const followUnfollowUserValidationRules = checkSchema(validationSchema)
export default followUnfollowUserValidationRules