import { createFeature, loginValidations, RoleValidation, updateFeature, validateUser } from "./administration/index.js";
import { validateAttribute, validateCategory, validateGroup, validateTag } from "./eCommerce/index.js";



const Validations = {
    createFeature : createFeature,
    updateFeature : updateFeature,
    RoleValidation : RoleValidation,
    validateUser,
    loginValidations,
    validateTag,
    validateAttribute,
    validateCategory,
    validateGroup
}

export default Validations