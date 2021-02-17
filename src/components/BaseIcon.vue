<template lang="pug">
.icon(:class="{ 'icon--clickable': clickable }")
    img(:src="require(`@/assets/icons/${name}.svg`)")
</template>

<script>
export default {
    name: 'BaseIcon',
    props: {
        name: {
            type: String,
            default: '',
        },
        clickable: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
.icon {
    display: flex;
    align-items: center;
    justify-content: center;

    &--clickable:hover {
        cursor: pointer;
    }
}

</style>
