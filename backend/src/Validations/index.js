import { ChangePasswordValidation, createFeature, loginValidations, OtpValidation, RoleValidation, updateFeature, validateUser } from "./administration/index.js";
import { ValidateCustomerAddress } from "./eCommerce/address.js";
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
    validateGroup,
    OtpValidation,
    ChangePasswordValidation,
    ValidateCustomerAddress
}

export default Validations