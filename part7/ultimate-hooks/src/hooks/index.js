import axios from "axios"
import { useState, useEffect } from "react"

export const useResource = (baseUrl) => {
    const [resource, setResource] = useState([])

    useEffect(() => {
        const getAll = async () => {
            const response = await axios.get(baseUrl)
            setResource(response.data)
        }
        getAll()
    }, [baseUrl])

    const create = async newObject => {
        const response = await axios.post(baseUrl, newObject)
        const newResource = response.data
        const allResources= resource.concat(newResource)
        setResource(allResources)
    }
    const service = {
        create,
        
    }

    return [
        resource,
        service
    ]
}