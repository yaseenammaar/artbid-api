import {checkSchema, ParamSchema} from "express-validator";

const validationSchema: Record<string, ParamSchema> = {

}

const deleteUserValidationRules = checkSchema(validationSchema)
export default deleteUserValidationRules