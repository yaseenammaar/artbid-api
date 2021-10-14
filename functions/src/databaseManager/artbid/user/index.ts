import {app} from "firebase-admin";
import * as functions from 'firebase-functions'
import App = app.App;
import DbCollections from "../../../constants/DbCollections";
import BaseCollectionManager from "../../BaseCollectionManager";
import Following from "./Following";
import Followers from "./Followers";

class User extends BaseCollectionManager{
    constructor(firebase: App) {
        functions.logger.debug('UserDatabaseManager', 'admin is', firebase)
        super(firebase, null, DbCollections.USERS);

    }

    getFollowing(userId: string): Following {
        return new Following(this.admin, this.collection.doc(userId))
    }

    getFollowers(userId: string): Followers {
        return new Followers(this.admin, this.collection.doc(userId))
    }

}

export default User