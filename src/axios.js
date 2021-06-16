import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://whatsapp-mern-backend-y31.herokuapp.com'
})

export default instance