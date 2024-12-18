


export const getImageURL =  (url:string) => {
    const uri = process.env.NEXT_PUBLIC_BASIC_END_POINT + "/staticfiles/"  + url
    console.log(uri)
    return uri
}