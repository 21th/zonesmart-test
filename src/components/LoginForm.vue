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
            base-button(:loading="loading") Войти
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { mapActions } from 'vuex'

export default {
    name: 'LoginForm',
    components: { BaseButton, BaseInput },
    data() {
        return {
            form_data: {
                email: 'test@zonesmart.ru',
                password: '4815162342test',
            },
            loading: false,
        }
    },
    methods: {
        ...mapActions({ authenticate: 'auth/authenticate' }),
        async onSubmit() {
            this.loading = true
            try {
                const response = await this.authenticate(this.form_data)
                console.log('login', response)
                this.loading = false
                await this.$router.push({ name: 'OrderTable' })
            } catch (e) {
                console.error('error', e)
                this.loading = false
            }
            // AuthService.authenticate(this.form_data)
            //     .then((r) => { console.log('login', r) })
            //     .catch((e) => { console.error('login', e) })
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
