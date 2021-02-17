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
            // try {
            //     const response = AuthService.authenticate(payload)
            //     context.commit('SET_TOKEN', response.data)
            //     context.commit('SET_USER_STATE')
            //     resolve(response.data)
            // } catch (e) {
            //     reject(e)
            // }

            AuthService.authenticate(payload)
                .then((response) => {
                    context.commit('SET_TOKEN', response.data)
                    context.commit('SET_USER_STATE')
                    resolve(response.data)
                })
                .catch((err) => { reject(err) })
        }),
        // LOGOUT: (context) => new Promise((resolve) => {
        //     AuthService.logout()
        //         .then(() => {
        //             context.commit('RESET_ALL');
        //             resolve();
        //         })
        //         .catch(() => {
        //             context.commit('RESET_ALL');
        //             resolve();
        //         });
        // }),
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
