import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
})

export default instance
//https://api-web2.vercel.app/api
//https://api-huellitas.vercel.app/api
//http://localhost:4000/api