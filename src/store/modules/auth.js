import AuthService from '@/services/api/AuthService'
import JWTService from '@/services/JWTService'

export default {
    namespaced: true,
    state: {
        authenticated: false,
    },
    getters: {
        is_authenticated(state) {
            return state.authenticated
        },
    },
    actions: {
        authenticate: (context, payload) => new Promise((resolve, reject) => {
            AuthService.authenticate(payload)
                .then((response) => {
                    context.commit('SET_TOKEN', response.data)
                    context.commit('SET_USER_STATE')
                    resolve(response.data)
                })
                .catch((err) => { reject(err) })
        }),
    },
    mutations: {
        SET_USER_STATE: (state) => {
            state.authenticated = true
        },
        SET_TOKEN: (state, payload) => {
            JWTService.setToken(payload.access)
            JWTService.setRefreshToken(payload.refresh)
        },
        RESET_ALL: (state) => {
            JWTService.clearTokens()
            state.authenticated = false
        },
    },
}
