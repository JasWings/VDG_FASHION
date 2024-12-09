import { createFeature, loginValidations, RoleValidation, updateFeature, validateUser } from "./administration/index.js";
import { validateAttribute, validateCategory, validateTag } from "./eCommerce/index.js";



const Validations = {
    createFeature : createFeature,
    updateFeature : updateFeature,
    RoleValidation : RoleValidation,
    validateUser,
    loginValidations,
    validateTag,
    validateAttribute,
    validateCategory
}

export default Validations