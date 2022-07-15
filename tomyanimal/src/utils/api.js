import axios from 'axios';

const baseAPI = (url, options) => {
    return axios.create({
        baseURL: url, ...options
    })
}

const authAPI = (url, options) => {
    return axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json;',
            'Authorization': localStorage.getItem('logintoken')
        },
        ...options
    })
}

const API = axios.create({
    baseURL: process.env.REACT_APP_BACK_BASE_URL, 
    headers: {
        'Content-Type': 'application/json;',
        'Authorization': localStorage.getItem('logintoken')
    }
})

export const baseInstance = baseAPI(process.env.REACT_APP_BACK_BASE_URL)
export const authInstance = authAPI(process.env.REACT_APP_BACK_BASE_URL)
export default API;
