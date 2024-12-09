/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            'api.slrexports.com'
        ]
    }
}
const dotenv = require('dotenv');
dotenv.config();


module.exports = nextConfig
