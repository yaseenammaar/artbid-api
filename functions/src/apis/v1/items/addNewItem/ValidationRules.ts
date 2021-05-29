import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {
    newDocId: {
        in: ['body'],
        errorMessage: 'Document Id not found',
        isString: true,
        isEmpty: {
            negated: true,
        },
    },
    basePrice: {
        in: ['body'],
        errorMessage: 'price not found',
        isNumeric: true,
    },
    description: {
        in: ['body'],
        errorMessage: 'description not found',
        isString: true,
        isEmpty: {
            negated: true,
        },
    },
    category: {
        in: ['body'],
        errorMessage: 'category not found',
        isString: true,
        isEmpty: {
            negated: true,
        },
    },
    closingTimestamp: {
        in: ['body'],
        errorMessage: 'closing timestamp not found',
        isEmpty: {
            negated: true,
        },
    },
    title: {
        in: ['body'],
        errorMessage: 'title not found',
        isString: true,
        isEmpty: {
            negated: true,
        },
    },
    featuredImage: {
        in: ['body'],
        errorMessage: 'featured image not found',
        isString: true,
        isEmpty: {
            negated: true,
        },
    },
    supportingImages: {
        in: ['body'],
        errorMessage: 'supporting images not found',
        isArray: true,
    },
}

const addNewItemValidationRules = checkSchema(validationSchema)
export default addNewItemValidationRules