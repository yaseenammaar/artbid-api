import {checkSchema, ParamSchema} from "express-validator";
const validationSchema: Record<string, ParamSchema> = {
    itemId: {
        in: "params",
        isString: true,
        trim: true,
        errorMessage: "item id is not valid",
    },

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
                return true
            },
        },

        customSanitizer: {
            options: (value) => {
                const sortingFieldsCombined = value.split(',')
                let sortingFieldsUncombined: string[][] = []
                sortingFieldsCombined.forEach((combinedField: string, i: number) => {
                    const singleFieldArray = combinedField.trim().split(':')
                    singleFieldArray.forEach((field, fieldIndex) => {
                        if(fieldIndex === singleFieldArray.length - 1) {
                            singleFieldArray[fieldIndex] = singleFieldArray[fieldIndex].trim().toLowerCase()
                        }
                        else {
                            singleFieldArray[fieldIndex] = singleFieldArray[fieldIndex].trim()
                        }
                    })
                    sortingFieldsUncombined.push(singleFieldArray)
                })

                return sortingFieldsUncombined
            },
        },
    },
}

const postBidOrMessageValidationRules = checkSchema(validationSchema)


export default postBidOrMessageValidationRules