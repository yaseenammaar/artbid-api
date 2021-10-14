import {Router} from "express";
import { validateGetSearchResults, getSearchResultsValidationRules, getSearchResults } from './getSearchResults'

const domainRouter = Router()

domainRouter.get("/domain/search/:domain", getSearchResultsValidationRules, validateGetSearchResults, getSearchResults)

export default domainRouter