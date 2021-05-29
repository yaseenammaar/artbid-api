import {checkSchema, ParamSchema} from "express-validator";
import {allowedOrderingFields} from "./getItemsQuery";

const validationSchema: Record<string, ParamSchema> = {
    sort: {
        in: "query",
        errorMessage: 'sort query is invalid',
        isString: true,
        optional: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
        custom: {
            options: (value) => {
                console.log(value)
                const sortingFieldsCombined = value.split(',')
                let sortingFieldsUncombined: string[][] = []
                sortingFieldsCombined.forEach((combinedField: string, i: number) => {
                    const singleFieldArray = combinedField.trim().split(':')
                    sortingFieldsUncombined.push(singleFieldArray)
                })

                const isValid = sortingFieldsUncombined.every((uncombinedField, i) => {
                    console.log('field ' + i, uncombinedField)
                    if(uncombinedField.length != 2) {
                        console.log('false at length')
                        return false
                    }

                    if(uncombinedField[0].trim() == null || !allowedOrderingFields.includes(uncombinedField[0].trim())) {
                        console.log('false at value 0')
                        return false
                    }

                    if(uncombinedField[1].trim().toLowerCase() != 'asc' && uncombinedField[1].trim().toLowerCase() != 'desc') {
                        console.log('false at value 1')
                        return false
                    }

                    return true
                })

                if(!isValid) {
                    throw new Error('sort query invalid')
                }

                return true
            },
        },

        customSanitizer: {
            options: (value) => {
                const sortingFieldsCombined = value.split(',')
                let sortingFieldsUncombined: string[][] = []
                sortingFieldsCombined.forEach((combinedField: string, i1: number) => {
                    const singleFieldArray = combinedField.trim().split(':')
                    singleFieldArray.forEach((field, i2) => {
                        if(i2 === singleFieldArray.length - 1) {
                            singleFieldArray[i2] = singleFieldArray[i2].trim().toLowerCase()
                        }
                        else {
                            singleFieldArray[i2] = singleFieldArray[i2].trim()
                        }
                    })
                    sortingFieldsUncombined.push(singleFieldArray)
                })

                return sortingFieldsUncombined
            },
        },
    },

    title: {
        in: "query",
        errorMessage: 'title query is invalid',
        isString: true,
        optional: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
        custom: {
            options: (value, {req}) => {

                if(req.query != null) {
                    if('notTitle' in req.query && 'title' in req.query) {
                        throw new Error('title and notTitle cannot be queried simultaneously')
                    }
                }

                return true
            },
        },
    },

    notTitle: {
        in: "query",
        errorMessage: 'notTitle query is invalid',
        isString: true,
        optional: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
        custom: {
            options: (value, {req}) => {

                if(req.query != null) {
                    if('notTitle' in req.query && 'title' in req.query) {
                        throw new Error('title and notTitle cannot be queried simultaneously')
                    }
                }

                return true
            },
        },
    },

    category: {
        in: "query",
        errorMessage: 'category query is invalid',
        isString: true,
        optional: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
        custom: {
            options: (value, {req}) => {

                if(req.query != null) {
                    if('notCategory' in req.query && 'category' in req.query) {
                        throw new Error('title and notTitle cannot be queried simultaneously')
                    }
                }

                return true
            },
        },
    },

    notCategory: {
        in: "query",
        errorMessage: 'notCategory query is invalid',
        isString: true,
        optional: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
        custom: {
            options: (value, {req}) => {

                if(req.query != null) {
                    if('notCategory' in req.query && 'category' in req.query) {
                        throw new Error('title and notTitle cannot be queried simultaneously')
                    }
                }

                return true
            },
        },
    },

    byUser: {
        in: "query",
        errorMessage: 'byUser query is invalid',
        isString: true,
        optional: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
        custom: {
            options: (value, {req}) => {

                if(req.query != null) {
                    if('notByUser' in req.query && 'byUser' in req.query) {
                        throw new Error('title and notTitle cannot be queried simultaneously')
                    }
                }

                return true
            },
        },
    },

    notByUser: {
        in: "query",
        errorMessage: 'notByUser query is invalid',
        isString: true,
        optional: true,
        trim: true,
        isEmpty: {
            negated: true,
        },
        custom: {
            options: (value, {req}) => {

                if(req.query != null) {
                    if('notByUser' in req.query && 'byUser' in req.query) {
                        throw new Error('title and notTitle cannot be queried simultaneously')
                    }
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

    lastDocId: {
        in: "query",
        errorMessage: 'lastDocId query is invalid',
        isString: true,
        optional: true,
        trim: true,
    },
}

const getItemsQueryValidationRules = checkSchema(validationSchema)


export default getItemsQueryValidationRules