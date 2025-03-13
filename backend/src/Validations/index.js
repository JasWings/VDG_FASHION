import { ChangePasswordValidation, createFeature, loginValidations, OtpValidation, RoleValidation, updateFeature, validateUser,validateOtp ,validateResetPassword,validateForgotPassword } from "./administration/index.js";
import { ValidateCustomerAddress } from "./eCommerce/address.js";
import { coupondetails } from "./eCommerce/coupon.js";
import { validateAttribute, validateCategory, validateGroup, validateTag } from "./eCommerce/index.js";
import { offerdetails } from "./eCommerce/offers.js";
import { orderdetails } from "./eCommerce/order.js";
import { Paymentdetails } from "./eCommerce/payment.js";
import { reportdetails } from "./eCommerce/report.js";
import { validateShipping } from "./eCommerce/shipping.js";
import { validateTax } from "./eCommerce/tax.js";



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
    reportdetails: reportdetails,
    validateTax,
    validateShipping,
    offerdetails: offerdetails,validateOtp :validateOtp ,validateForgotPassword,validateResetPassword
}

export default Validations