<template lang="pug">
    .login-form
        h1.login-form__headline Вход
        form(@submit.prevent="onSubmit")
            base-input(
                label="E-mail или телефон"
                v-model="form_data.email"
            )
            base-input(
                label="Пароль"
                v-model="form_data.password"
                type="password"
            )
            transition(name="slide")
                p.login-form__error-message(v-if="error_message") {{ error_message }}
            base-button(:loading="loading") Войти
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'LoginForm',
    data() {
        return {
            form_data: {
                email: 'test@zonesmart.ru',
                password: '4815162342test',
            },
            error_message: '',
            loading: false,
        }
    },
    methods: {
        ...mapActions({ authenticate: 'auth/authenticate' }),
        async onSubmit() {
            this.loading = true
            try {
                await this.authenticate(this.form_data)
                this.loading = false
                await this.$router.push({ name: 'OrderTable' })
            } catch (e) {
                this.error_message = e.response?.data?.detail
                this.loading = false
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0 14px 64px rgba(48, 56, 64, 0.16);
    border-radius: 6px;
    padding: 40px 50px;

    &__headline {
        font-size: 36px;
        font-weight: 500;
        margin-bottom: 25px;
        color: $primary-dark-blue;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    &__error-message {
        color: $error-red;
    }
}

</style>
