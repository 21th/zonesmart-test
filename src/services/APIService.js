import axios from 'axios'
import JWTService from '@/services/JWTService'

const BASE_URL = process.env.VUE_APP_API_URL || 'https://zonesmart.su/api/v1'
const REFRESH_TOKEN_URL = 'https://zonesmart.su/api/v1/auth/jwt/refresh/'

const REDIRECT_URL = '/'

const APIService = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

APIService.interceptors.request.use(
    (config) => {
        const token = JWTService.getToken()
        if (token) config.headers.Authorization = `JWT ${token}`
        return config
    },
)

let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(accessToken) {
    subscribers = subscribers.filter((callback) => callback(accessToken))
}

function addSubscriber(callback) {
    subscribers.push(callback)
}

APIService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { config, response: { status, data } } = error
        if (status === 401 && data.code === 'token_not_valid') {
            const originalRequest = config
            const refreshToken = JWTService.getRefreshToken()

            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true

                axios.post(REFRESH_TOKEN_URL,
                    {
                        refresh: refreshToken,
                    },
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `JWT ${refreshToken}`,
                        },
                    })
                    .then((r) => {
                        JWTService.setToken(r.data.access)
                        JWTService.setRefreshToken(r.data.refresh)
                        isAlreadyFetchingAccessToken = false
                        onAccessTokenFetched(r.data.access)
                    })
                    .catch(() => {
                        localStorage.removeItem('zonesmart-vuex')
                        JWTService.clearTokens()
                        // Refresh has failed - reject the original request
                        window.location.href = REDIRECT_URL
                        throw error
                    })
            }

            return new Promise((resolve) => {
                addSubscriber((accessToken) => {
                    originalRequest.headers.Authorization = `JWT ${accessToken}`
                    resolve(axios(originalRequest))
                })
            })

            // return Promise.reject(error)
        }
        throw error
    },
)

export default APIService
