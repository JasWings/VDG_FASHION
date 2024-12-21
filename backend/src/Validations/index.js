import { ChangePasswordValidation, createFeature, loginValidations, OtpValidation, RoleValidation, updateFeature, validateUser } from "./administration/index.js";
import { ValidateCustomerAddress } from "./eCommerce/address.js";
import { coupondetails } from "./eCommerce/coupon.js";
import { validateAttribute, validateCategory, validateGroup, validateTag } from "./eCommerce/index.js";
import { orderdetails } from "./eCommerce/order.js";
import { Paymentdetails } from "./eCommerce/payment.js";
import { reportdetails } from "./eCommerce/report.js";



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
    ValidateCustomerAddress,
    orderdetails: orderdetails,
    Paymentdetails:Paymentdetails,
    coupondetails:coupondetails,
    reportdetails: reportdetails
}

export default Validations