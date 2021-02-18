<template lang="pug">
    div
        table
            thead
                tr
                    td(v-if="selectable" key="select")
                        input(type="checkbox")
                    td(v-for="(header, i) in headers" :key="i") {{ header.title }}
            tbody
                tr(v-for="item in items" :key="item.id")
                    td(v-if="selectable" key="select")
                        input(type="checkbox" :value="item.id" v-model="selectedItems")
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
        selectable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectedItems: [],
        }
    },
    watch: {
        selectedItems(val) {
            this.$emit('input', val)
        },
    },
}
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.86rem;
    tr {
        background-color: #fff;
    }

    thead tr td {
        color: rgba($primary-dark-blue, 0.5);
    }

    tbody {
        &:before {
            content:"@";
            display:block;
            line-height:10px;
            text-indent:-99999px;
        }
        tr:not(:last-child) {
            border-bottom: 1px solid rgba($icon-gray-color, 0.4);
        }
    }

    td {
        padding: 20px 10px;
        color: var(--primary-dark-blue);
    }
}

</style>
