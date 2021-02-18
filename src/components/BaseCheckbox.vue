<template lang="pug">
.base-checkbox()
    label
        input(
            type="checkbox"
            :value="value"
            :checked="is_checked"
            @change="updateInput"
        )
        span(class="base-checkbox__box")
</template>

<script>
export default {
    name: 'BaseCheckbox',
    model: {
        prop: 'model_value',
        event: 'change',
    },
    props: {
        value: {
            type: [String, Number, Array],
            default: 0,
        },
        model_value: {
            type: [Array, Boolean],
            default: () => ([]),
        },
    },
    computed: {
        is_checked() {
            if (this.model_value instanceof Array) {
                return this.model_value.includes(this.value)
            }
            return this.model_value
        },
    },
    methods: {
        updateInput(event) {
            if (this.model_value instanceof Array) {
                const is_checked = event.target.checked
                const new_value = [...this.model_value]
                if (is_checked) {
                    new_value.push(this.value)
                } else {
                    new_value.splice(new_value.indexOf(this.value), 1)
                }
                this.$emit('change', new_value)
            }
            if (typeof this.model_value === 'boolean') {
                event.target.checked = this.model_value
                this.$emit('change', this.model_value)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.base-checkbox {
    position: relative;
    & input {
        appearance: none;
        position: absolute;
    }

    & input:checked + &__box:after {
        opacity: 1;
        transform: translateY(0);
    }

    & input:focus + &__box {
        border: 2px solid rgba($primary-dark-blue, .5);
    }

    & input:active + &__box {
        border: 2px solid rgba($primary-dark-blue, .5);
    }

    &__box {
        box-sizing: border-box;
        display: inline-block;
        width: 24px;
        height: 24px;
        border: 1px solid $icon-gray-color;
        border-radius: 3px;
        position: relative;

        &:after {
            content: "";
            display: block;
            transition: opacity .1s, transform .1s;
            transform: translateY(-2px);
            width: 100%;
            height: 100%;
            background: url('~@/assets/icons/check.svg') no-repeat center center;
            opacity: 0;
            will-change: transform;
        }
    }
}

</style>
