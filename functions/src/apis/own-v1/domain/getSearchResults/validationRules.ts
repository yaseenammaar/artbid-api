import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {
    domain: {
        in: "params",
        errorMessage: 'keyword parameter invalid',
        isString: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
    },
}

const getSearchResultsValidationRules = checkSchema(validationSchema)
export default getSearchResultsValidationRules