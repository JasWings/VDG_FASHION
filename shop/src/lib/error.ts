

export const getErrorMessage = (error) => {
    const error_message = error?.response?.data?.message ? error?.response?.data?.message : error?.message
    return error_message
}