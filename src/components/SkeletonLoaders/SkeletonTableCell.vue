<template lang="pug">
.skeleton-table-cell
</template>

<script>
export default {
    name: 'SkeletonTableCell',
}
</script>

<style lang="scss" scoped>
.skeleton-table-cell {
    width: 100%;
    height: 100%;
    min-width: 50px;
    min-height: 30px;
    border-radius: 4px;
    background-size: 400% 400%;
    background: linear-gradient(-45deg, #c7c7c7, #bbbbbb, #dbdbdb, #cdcdcd);
    background-size: 400% 400%;
    animation: gradient 5s ease infinite;
    @keyframes gradient {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
}

</style>
