<template lang="pug">
    .form-container
        .form-container__wrapper
            login-form
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/Auth/LoginForm.vue'

export default {
    name: 'Home',
    components: {
        LoginForm,
    },
}
</script>
<style lang="scss" scoped>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    &__wrapper {
        width: 400px;
    }
}
</style>
