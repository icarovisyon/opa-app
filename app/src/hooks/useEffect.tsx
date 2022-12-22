import axios from "axios"
import { useEffect, useState } from "react"

export const api = axios.create({
    baseURL: "http://10.255.0.113:8000",
    headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIERlYyAyMSAyMDIyIDE3OjI3OjQ1IEdNVC0wMzAwIChCcmFzaWxpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6MTIsImlhdCI6MTY3MTY1NDQ2NX0.lJMMqlIAiSfguHPtt2IhiDNi_2fzquAXDDSGg7pEgGo'
    }
})

export function useFetch<T = unknown>(url: string, valueDefaultt: T) {
    const [data, setData] = useState<T>(valueDefaultt)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        api.get(url)
            .then((response) => setData(response.data))
            .catch(err => setError(err))
            .finally(() => {
                setIsFetching(false)
            })
    }, [])
    return { data, error, isFetching }
}