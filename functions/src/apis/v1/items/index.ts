import * as express from "express";
import { validateGetSpecificItem, getSpecificItemValidationRules, getSpecificItem } from './getSpecificItem'
import { getItemsQuery, getItemsQueryValidationRules, validateGetItemsQuery } from './getItemsQuery'
import { validateAddNewItem, addNewItemValidationRules, addNewItem } from './addNewItem'
import { validateUpdateItem, updateItemValidationRules, updateItem } from './updateItem'
import { validateDeleteItem, deleteItemValidationRules, deleteItem } from './deleteItem'
import { validatePostBidOrMessage, postBidOrMessageValidationRules, postBidOrMessage } from './postBidOrMessage'

const itemRouter = express.Router()

itemRouter.get('/item/:itemId', getSpecificItemValidationRules, validateGetSpecificItem, getSpecificItem)
// @ts-ignore
itemRouter.post('/item', addNewItemValidationRules, validateAddNewItem, addNewItem)
itemRouter.put('/item/:itemId', updateItemValidationRules, validateUpdateItem, updateItem)
itemRouter.delete('/item/:itemId', deleteItemValidationRules, validateDeleteItem, deleteItem)

// @ts-ignore
itemRouter.post('/item/:itemId/:bidType(bid|message)', postBidOrMessageValidationRules, validatePostBidOrMessage, postBidOrMessage)

itemRouter.get("/items", getItemsQueryValidationRules , validateGetItemsQuery, getItemsQuery)

export default itemRouter