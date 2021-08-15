import {app} from "firebase-admin";
import App = app.App;
import DbCollections from "../../../constants/DbCollections";
import BaseCollectionManager from "../../BaseCollectionManager";

class Items extends BaseCollectionManager{
    constructor(firebase: App) {
        super(firebase, null, DbCollections.ITEMS);
    }

}

export default Items