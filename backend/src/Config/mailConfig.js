import nodemailer from "nodemailer"


export const getEmailServiceProvider = (email) => {
    const domain = email.split("@")[1]
    if(domain.includes('gmail.com')){
        return "Gmail";
     }else if (domain.includes('outlook.com') || domain.includes('hotmail.com') || domain.includes('live.com')) {
         return 'Outlook';
     } else if (domain.includes('yahoo.com')) {
         return 'Yahoo';
     }else{
         return domain
     }
}

export const createTransport = (emailService,email,password) =>{
    let transport ;

    if(emailService==="Gmail"){
       transport = nodemailer.createTransport({
        service : "gmail",
        secure:false,
        auth: {
            user : email ,
            pass : password
        },
        tls: {
            rejectUnauthorized: false
          }
       });
    }else if(emailService === "outlook"){
        transport = nodemailer.createTransport({
            host : 'smtp.office365.com',
            port : 587,
            secure : true,
            auth : {
                user : email,
                pass : password
            }
        })
    }else{
        transport = nodemailer.createTransport({
            service : "gmail",
            secure:false,
            auth: {
                user : email ,
                pass : password
            },
            tls: {
                rejectUnauthorized: false
              }
           });
    }
    return transport
}