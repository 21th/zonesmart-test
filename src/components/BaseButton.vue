<template lang="pug">
button
    slot(name="default")
</template>

<script>
export default {
    name: 'BaseButton',
}
</script>

<style lang="scss" scoped>
button {
    border: none;
    background-color: var(--accent-color);
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
}

</style>
