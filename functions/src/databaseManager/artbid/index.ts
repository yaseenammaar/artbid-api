import {app} from "firebase-admin";
import App = app.App;
import User from "./user";
import Keywords from "./keywords";
import Items from "./items";

class ArtbidDatabaseManager {
    private readonly _admin: App
    constructor(firebase: App) {
        this._admin = firebase
    }

    get admin(): app.App {
        return this._admin;
    }

    users = new User(this._admin)
    keywords = new Keywords(this._admin)
    items = new Items(this._admin)
}

export default ArtbidDatabaseManager