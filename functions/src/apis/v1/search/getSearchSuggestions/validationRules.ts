import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {
    searchWord: {
        in: "params",
        errorMessage: 'searchWord parameter invalid',
        isString: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
    },
}

const getSearchSuggestionsValidationRules = checkSchema(validationSchema)
export default getSearchSuggestionsValidationRules