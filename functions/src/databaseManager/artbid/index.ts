import {app} from "firebase-admin";
import App = app.App;
import User from "./user";
import Keywords from "./keywords";
import Items from "./items";
import * as functions from 'firebase-functions'

class ArtbidDatabaseManager {
    private readonly _admin: App
    users: User
    keywords: Keywords
    items: Items
    constructor(firebase: App) {
        functions.logger.debug("ArtbidDatabaseManager; admin is", firebase)
        this._admin = firebase
        this.users = new User(this._admin)
        this.keywords = new Keywords(this._admin)
        this.items = new Items(this._admin)
    }

    get admin(): app.App {
        return this._admin;
    }


}

export default ArtbidDatabaseManager