import axios from "axios"
import { useEffect, useState } from "react"

export const api = axios.create({
    baseURL: "http://192.168.27.15:8000"
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