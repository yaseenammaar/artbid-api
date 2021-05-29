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
}

const getSpecificItemValidationRules = checkSchema(validationSchema)
export default getSpecificItemValidationRules