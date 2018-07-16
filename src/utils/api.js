import axios from 'axios'

const isProduction = !!(process.env.NODE_ENV === 'production')
// const baseURL = isProduction ? 'http://120.24.244.225/amazonweb' : 'http://50.116.4.46:8082'
const baseURL = isProduction ? 'http://nstart.cc:3888' : 'http://localhost:3888'

// smart service
const api = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
  timeout: 0
})

api.baseURL = baseURL

export default api
