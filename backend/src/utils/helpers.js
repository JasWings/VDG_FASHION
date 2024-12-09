import { v4 } from "uuid"

export const generateUUID = async () => {
    const uuid = v4()
    return uuid
}