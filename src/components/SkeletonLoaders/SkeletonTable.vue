<template lang="pug">
    table
        tr(v-for="row in rows")
          td(v-for="column in columns")
            skeleton-table-cell

</template>

<script>
import SkeletonTableCell from '@/components/SkeletonLoaders/SkeletonTableCell.vue'

export default {
    name: 'SkeletonTable',
    components: { SkeletonTableCell },
    props: {
        columns: {
            type: Number,
            default: 5,
        },
        rows: {
            type: Number,
            default: 5,
        },
    },
}
</script>

<style lang="scss" scoped>
table {
    flex: 1;
    width: 100%;
    border-spacing: 10px;

    td {
        padding: 10px;
    }
}

</style>
