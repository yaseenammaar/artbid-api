import {app} from "firebase-admin";
import App = app.App;
import DbCollections from "../../../constants/DbCollections";
import BaseCollectionManager from "../../BaseCollectionManager";

class Keywords extends BaseCollectionManager{
    constructor(firebase: App) {
        super(firebase, null, DbCollections.KEYWORDS)
    }
}

export default Keywords