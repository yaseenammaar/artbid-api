import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {

}

const updateUserValidationRules = checkSchema(validationSchema)
export default updateUserValidationRules