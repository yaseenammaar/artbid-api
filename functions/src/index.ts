import * as functions from 'firebase-functions';
import * as cors from "cors";
import apiExpressApp, {own_api_v1} from "./apis";

export const api = functions
    .region('asia-south1')
    .https.onRequest(apiExpressApp)
export const own_api = functions.region('asia-south1').https.onRequest(own_api_v1)

const corsHandler = cors({origin: '*'})
export const testApi = functions.region('asia-south1').https.onRequest((request, response) => {
    corsHandler(request, response, () => {
        functions.logger.info("Hello logs!", {structuredData: true});
        response.send("Hello from Firebase!");
    })
});

/*export const saveNewUserInDb = functions.auth.user().onCreate(async (user, context) => {
    const providerData = user.providerData
    const uid = user.uid

    // check if provider data is not null or empty...
    // if it is null or empty, that means user is anonymous
    if(providerData != null && providerData.length > 0) {
        await createUserInDb({
            uid,
            bio: "",
            creation_date: user.metadata.creationTime === undefined ? null : user.metadata.creationTime,
            email: user.email === undefined ? null : user.email,
            last_signin: user.metadata.lastSignInTime === undefined ? null : user.metadata.lastSignInTime,
            phone_no: user.phoneNumber === undefined ? null : user.phoneNumber,
            profile_pic: user.photoURL === undefined? "https://image.flaticon.com/icons/svg/2893/2893152.svg" : user.photoURL,
            username: user.displayName === undefined ? null : user.displayName,
            city: "",
        }, uid)
    }
})*/
