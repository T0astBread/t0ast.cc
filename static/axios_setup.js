import axios from "axios";

const registerAxiosInterceptors = () => {
    const rqToString = rqConfig => `${rqConfig.method} ${rqConfig.url}`

    axios.interceptors.request.use(config => {
        console.log(`HTTP request: ${rqToString(config)}`)
        return config
    })
    
    axios.interceptors.response.use(response => {
        console.log(`HTTP response: ${response.status} to request ${rqToString(response.config)}`)
        return response
    })
}

const setUpAxios = () => {
    registerAxiosInterceptors()
}

export default setUpAxios
