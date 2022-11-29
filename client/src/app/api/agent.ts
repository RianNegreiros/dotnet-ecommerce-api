import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

axios.defaults.baseURL = "http://localhost:7055/api/"

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.response.use(async response => {
  return response
}, (error: AxiosError) => {
  const { data, status } = error.response!
  
  switch (status) {
    case 400:
      if (data.errors) {
        const modalStateErrors = []
        for (const key in data.errors) {
          if (data.errors[key]) {
            modalStateErrors.push(data.errors[key])
          }
        }
        throw modalStateErrors.flat()
      }
      toast.error(data.title)
      break;
    case 401:
      toast.error(data.title)
      break;
    case 500:
      history.push({
        pathname: '/server-error',
        state: { error: data }
      })
      break;
    default:
      break;
  }
  return Promise.reject(error.response)
})

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
  list: () => requests.get("/catalog"),
  details: (id: number) => requests.get(`/catalog/${id}`),
}

const agent = {
  Catalog,
}

export default agent;