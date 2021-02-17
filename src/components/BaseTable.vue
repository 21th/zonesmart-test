<template lang="pug">
    div
        table
            thead
                tr
                    td(v-for="(header, i) in headers" :key="i") {{ header.title }}
            tbody
                tr(v-for="item in items" :key="item.id")
                    td(v-for="(column, i) in headers" :key="i")
                        slot(
                            :name="`columns.${column.value}`"
                            :item="item[column.value]"
                        ) {{ item[column.value] }}
</template>

<script>
export default {
    name: 'BaseTable',
    props: {
        items: {
            type: Array,
            default: () => ([]),
        },
        headers: {
            type: Array,
            default: () => ([]),
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
