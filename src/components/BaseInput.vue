<template lang="pug">
    .input(
        @click="$refs.input.focus()"
        :class="{ 'input--active': active, 'input--dirty': dirty }"
    )
        label(:for="`input-${componentId}`") {{ label }}
        input(
            v-bind="$attrs"
            ref="input"
            :id="`input-${componentId}`"
            :value="value"
            :type="type"
            @input="$emit('input', $event.target.value)"
            @focus="active = true"
            @blur="active = false"
        )
        span(
            v-if="$attrs.type === 'password'"
            @click.stop="type === 'password' ? type = 'text' : type = 'password'"
        )
            base-icon(:name="type === 'password' ? 'eye' : 'eye-off'" clickable)
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
    name: 'BaseInput',
    components: { BaseIcon },
    inheritAttrs: false,
    data() {
        return {
            active: false,
            type: '',
        }
    },
    props: {
        label: {
            type: String,
            default: '',
        },
        value: {
            type: [String, Number],
            default: '',
        },
    },
    computed: {
        componentId() {
            // Использовать внутренний айди компонента не совсем правильно,
            // но для тестового задания, считаю, подойдет
            // eslint-disable-next-line no-underscore-dangle
            return this._uid
        },
        dirty() {
            return !!this.value.length
        },
    },
    mounted() {
        this.type = this.$attrs.type
    },
}
</script>

<style lang="scss" scoped>
.input {
    border: 1px solid #C5C7CD;
    padding: 10px;
    width: 100%;
    border-radius: 6px;
    margin: 15px 0;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-family: 'Roboto', sans-serif;

    min-height: 52px;

    &:hover {
        cursor: text;
    }

    label {
        position: absolute;
        color: #8A939C;
        transform-origin: top left;
        transition: transform .25s;
        pointer-events: none;
    }

    &--active label, &--dirty label {
        transform: translateY(-1.6rem) scale(.8);
        background-color: #fff;
    }

    input {
        border: none;
        outline: none;
        font-size: 1rem;
        flex: 1;
    }
}
</style>
