import axios from 'axios'
import Cookie from 'js-cookie'
import { MS_HOST } from '../consts/configConst'

const msProvider = async (method, data) => {
  const authToken = Cookie.get('authToken')
  return axios({
    method, //you can set what request you want to be
    url: MS_HOST,
    data,
    headers: authToken && {
      Authorization: `Bearer ${authToken}`,
    },
  })
}

export default msProvider
