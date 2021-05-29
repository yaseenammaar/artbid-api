import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {
    keyword: {
        in: "params",
        errorMessage: 'keyword parameter invalid',
        isString: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
    },

    method: {
        in: "query",
        errorMessage: 'method query is invalid',
        isString: true,
        optional: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
        custom: {
            options: (value) => {
                if(value !== "search" && value !== "suggestion") {
                    throw new Error('method is not valid')
                }

                return true
            },
        },
    },

    limit: {
        in: "query",
        errorMessage: 'limit query is invalid',
        isString: true,
        optional: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
        custom: {
            options: (value) => {
                if(typeof value != 'string' || !Number.isInteger(parseInt(value))) {
                    throw new Error('limit is not valid')
                }

                return true
            },
        },

        customSanitizer: {
            options: (value) => {
                return parseInt(value)
            },
        },
    },

    lastResultId: {
        in: "query",
        errorMessage: 'lastDocId query is invalid',
        isString: true,
        optional: true,
        trim: true,
    },
}

const getSearchResultsValidationRules = checkSchema(validationSchema)
export default getSearchResultsValidationRules