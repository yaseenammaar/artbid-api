import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {
    bio: {
        in: "body",
        isString: true,
        trim: true,
        errorMessage: "bio is not valid",
    },
}

const addNewUserValidationRules = checkSchema(validationSchema)
export default addNewUserValidationRules