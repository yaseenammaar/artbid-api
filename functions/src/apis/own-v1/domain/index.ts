import * as express from "express";
import { validateGetSearchResults, getSearchResultsValidationRules, getSearchResults } from './getSearchResults'

const domainRouter = express.Router()

domainRouter.get("/domain/search/:domain", getSearchResultsValidationRules, validateGetSearchResults, getSearchResults)

export default domainRouter