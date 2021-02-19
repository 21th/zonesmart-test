<template lang="pug">
button.base-button(
    :disabled="loading || $attrs.disabled"
    :class=`{
      'base-button--text': text,
      'base-button--icon': icon,
      'base-button--dark': dark,
      'base-button--dense': dense,
    }`
    @click="$emit('click')"
)
    transition(name="fade" mode="out-in")
        div(v-if="!loading")
            slot(name="default")
        span(v-else)
            base-icon(name="loader")
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        text: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: Boolean,
            default: false,
        },
        dark: {
            type: Boolean,
            default: false,
        },
        dense: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
.base-button {
    border: none;
    background-color: $accent-green-color;
    border-radius: 4px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.17rem;
    letter-spacing: .07rem;
    margin: 15px 0;
    color: #fff;
    transition: background .2s;
    padding: 0 15px;

    min-height: 52px;

    &:hover {
        cursor: pointer;
        background-color: rgba($primary-dark-blue, 0.5);
    }

    &:disabled {
        cursor: unset;
        background-color: $icon-gray-color;
    }

    &--text {
        background: none;
        color: $accent-green-color;
        text-transform: unset;

        &:hover:not(:disabled) {
            background-color: rgba($accent-green-color, 0.1);
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba($primary-dark-blue, 0.5);
        }
    }

    &--icon {
        min-height: 30px;
        min-width: 30px;
        border-radius: 100px;
        padding: 0;

        &:disabled {
            opacity: 0.5;
        }
    }

    &--dark {
        background-color: rgba($primary-dark-blue, 1);
    }

    &--dense {
        min-height: 32px;
        font-size: 1rem;
    }
}

</style>
