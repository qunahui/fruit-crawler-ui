import axios from "axios"

// let baseURL = process.env.API_URL

const instance = axios.create({
  // baseURL,
})

instance.defaults.timeout = 60000

// handle before the request is sent

instance.interceptors.request.use(
  async (config) => {
    return Promise.resolve(config)
  },
  async (error) => {
    return Promise.reject(error)
  },
)

// handle after the response is received
instance.interceptors.response.use(
  async (response) => {
    console.log("response: ", response)

    return Promise.resolve(response)
  },
  async (error) => {
    //
    console.log("error: ", error)
    return Promise.reject(error)
  },
)

export default instance
