'use client'
import React,{ReactNode} from "react";
import AppWrappers from "./AppWrapper";
import { useLoading } from "@/context/loadingContext";
import "@/style/global.css"
import "rc-pagination/assets/index.css"



export default function RootLayout({children}:{children:ReactNode}){
  
  
  return(
    <html lang="en">
      <head>
      <title>SLR Admin</title>
     <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
      rel="stylesheet"
      />
      <link rel="icon" href="/img/brand/logo.png" type="image/png" />
      </head>
      <body style={{fontFamily:"DM sans"}}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  )
}