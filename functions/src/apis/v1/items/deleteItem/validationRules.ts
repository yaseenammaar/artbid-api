import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {
    itemId: {
        in: "params",
        isString: true,
        trim: true,
        errorMessage: "item id is not valid",
    },
}

const deleteItemValidationRules = checkSchema(validationSchema)
export default deleteItemValidationRules