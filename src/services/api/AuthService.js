import axios from 'axios'

const URL = process.env.VUE_APP_API_URL

export default {
    /**
     * Аутентификация пользователя
     * @param data
     * @returns {Promise<AxiosResponse<any>>}
     */
    authenticate(data) {
        return axios.post(`${URL}/auth/jwt/create/`, data)
    },
}
