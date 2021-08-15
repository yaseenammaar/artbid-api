import * as admin from "firebase-admin"
const ownServiceCredentials = require('../../own-domains-firebase-service-account-key.json')

const app = admin.initializeApp();

const ownApp = admin.initializeApp({
    credential: admin.credential.cert(ownServiceCredentials),
}, "own-app")

export default app;
export {ownApp}
