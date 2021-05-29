import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {
    userId: {
        in: "params",
        isString: true,
        trim: true,
        errorMessage: "user id is not valid",
        isEmpty: {
            negated: true,
        },
    },
}

const getUserValidationRules = checkSchema(validationSchema)
export default getUserValidationRules