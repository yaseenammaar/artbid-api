import { validateGetSearchResults, getSearchResultsValidationRules, getSearchResults } from './getSearchResults'
import { validateGetSearchSuggestions, getSearchSuggestionsValidationRules, getSearchSuggestions } from './getSearchSuggestions'
import {Router} from "express";

const searchRouter = Router()

searchRouter.get("/search/suggestions/:searchWord", getSearchSuggestionsValidationRules, validateGetSearchSuggestions, getSearchSuggestions)
searchRouter.get("/search/results/:keyword", getSearchResultsValidationRules, validateGetSearchResults, getSearchResults)

export default searchRouter