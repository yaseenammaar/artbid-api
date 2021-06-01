import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {
    itemId: {
        in: "params",
        isString: true,
        trim: true,
        errorMessage: "item id is not valid",
        isEmpty: {
            negated: true,
        },

    },

    bidType: {
        in: "params",
        isString: true,
        trim: true,
        errorMessage: "bidType is not valid",
        isEmpty: {
            negated: true,
        },
    },

    plusAmount: {
        in: "body",
        trim: true,
        errorMessage: "plus amount invalid.",
        custom: {
            options: (value, {req}) => {

                if(req.params?.bidType === "bid") {
                    if(value === null || value === "" || value === undefined || typeof value !== "string") {
                        throw new Error("plus amount required")
                    }

                    const numValue = Number(value)
                    if(isNaN(numValue) || numValue < 0) {
                        throw new Error("plus amount is invalid")
                    }
                }

                return true
            },

        },

        customSanitizer: {
            options: (value, {req}) => {
                if(req.params?.bidType === "bid") {
                    return Number(value)
                }
                else {
                    return null
                }

            },
        },

    },

    message: {
        in: "body",
        trim: true,
        errorMessage: "message invalid.",
        custom: {
            options: (value, {req}) => {

                console.log(typeof value, value)
                if(req.params?.bidType === "message") {
                    if(value === null || value === "" || value === undefined || typeof value !== "string") {
                        throw new Error("message required")
                    }
                }

                return true
            },

        },

        customSanitizer: {
            options: (value, {req}) => {
                console.log(value)
                if(req.params?.bidType === "message") {
                    return value
                }
                else {
                    return null
                }

            },
        },

    },
}

const postBidOrMessageValidationRules = checkSchema(validationSchema)


export default postBidOrMessageValidationRules