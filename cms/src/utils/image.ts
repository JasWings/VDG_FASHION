

const end_point = process.env.NEXT_PUBLIC_REST_API_ENDPOINT_MAIN

export const getImageURL = (url:string) => {
    const image_url = end_point + "staticfiles/" + url
    return image_url
}