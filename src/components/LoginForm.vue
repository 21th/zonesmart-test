<template lang="pug">
    .login-form
        h1.login-form__headline Вход
        form(@submit.prevent="authenticate")
            base-input(
                label="E-mail или телефон"
                v-model="login"
            )
            base-input(
                label="Пароль"
                v-model="password"
                type="password"
            )
            base-button Войти
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
    name: 'LoginForm',
    components: { BaseButton, BaseInput },
    data() {
        return {
            login: '',
            password: '',
        }
    },
    methods: {
        authenticate(e) {
            console.log('login', e)
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
    }

    form {
        width: 100%;
    }
}

</style>
