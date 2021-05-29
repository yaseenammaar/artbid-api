import * as express from "express";
import { validateGetSearchResults, getSearchResultsValidationRules, getSearchResults } from './getSearchResults'
import { validateGetSearchSuggestions, getSearchSuggestionsValidationRules, getSearchSuggestions } from './getSearchSuggestions'

const searchRouter = express.Router()

searchRouter.get("/search/suggestions/:searchWord", getSearchSuggestionsValidationRules, validateGetSearchSuggestions, getSearchSuggestions)
searchRouter.get("/search/results/:keyword", getSearchResultsValidationRules, validateGetSearchResults, getSearchResults)

export default searchRouter