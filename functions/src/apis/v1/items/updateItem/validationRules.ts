import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {
    itemId: {
        in: "params",
        isString: true,
        trim: true,
        errorMessage: "item id is not valid",
    },
}

const updateItemValidationRules = checkSchema(validationSchema)
export default updateItemValidationRules