<template lang="pug">
button(:disabled="loading || $attrs.disabled")
    transition(name="fade" mode="out-in")
        div(v-if="!loading")
            slot(name="default")
        span(v-else) Loading...
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
button {
    border: none;
    background-color: $accent-green-color;
    width: 100%;
    border-radius: 4px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.17rem;
    letter-spacing: .07rem;
    margin: 15px 0;
    color: #fff;

    min-height: 52px;

    &:hover {
        cursor: pointer;
    }

    &:disabled {
        cursor: not-allowed;
        background-color: $icon-gray-color;
    }
}

</style>
