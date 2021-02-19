<template lang="pug">
div(class="base-table")
    table(class="base-table__table" :class="{'base-table__table--header-gap': headerGap}")
        thead
            tr(
                class="base-table__header-row"
                :class="{'base-table__header-row--transparent': transparentHeader}"
            )
                td(v-if="selectable" key="select")
                    base-checkbox(
                        @change="toggleMainCheckbox"
                        :model_value="private_items.length === selected_items.length"
                    )
                    transition(name="slide")
                        div(
                            v-show="selected_items.length"
                            class="base-table__actions"
                        )
                            slot(name="actions")
                td(
                    v-for="(header, i) in headers"
                    :key="i"
                    :style="{ 'text-align': header.align }"
                ) {{ header.title }}
        tbody
            template(v-for="item in private_items")
                tr(class="base-table__row" :key="item.id")
                    td(v-if="selectable" key="select")
                        base-checkbox(:value="item.id" v-model="selected_items")
                    td(
                        v-for="(column, i) in headers"
                        :key="i"
                        :style="{ 'text-align': column.align }"
                    )
                        slot(
                            :name="`columns.${column.value}`"
                            :column="item[column.value]"
                            :row="item"
                            :toggle="toggleRow"
                        ) {{ item[column.value] || defaultValue }}
                transition(name="slide")
                    tr(class="base-table__expand-row" v-if="item.row_opened" key="expand")
                        td(:colspan="selectable ? headers.length + 1 : headers.length")
                            slot(name="expand_data" :row="item")
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
        transparentHeader: {
            type: Boolean,
            default: false,
        },
        headerGap: {
            type: Boolean,
            default: false,
        },
        defaultValue: {
            type: [String, Number],
            default: '',
        },
    },
    data() {
        return {
            selected_items: [],
            private_items: [],
        }
    },
    watch: {
        selected_items(val) {
            this.$emit('input', val)
        },
        items(val) {
            this.private_items = val
            this.private_items.forEach((i) => { this.$set(i, 'row_opened', false) })
        },
    },
    methods: {
        toggleRow(row) {
            row.row_opened = !row.row_opened
        },
        toggleMainCheckbox() {
            if (this.selected_items.length !== this.private_items.length) {
                this.selected_items = [...this.private_items.map((i) => i.id)]
            } else {
                this.selected_items = []
            }
        },
    },
    mounted() {
        this.private_items = this.items
        this.private_items.forEach((i) => { this.$set(i, 'row_opened', false) })
    },
}
</script>

<style lang="scss" scoped>
.base-table {
    padding: 0 0 20px;
    margin: 0 20px 20px;
    background-color: $main-bg;
    display: flex;
    border-radius: 6px;
    overflow: hidden;

    td {
        padding: 20px;
        color: var(--primary-dark-blue);
        position: relative;
        background-color: #fff;
    }

    &__actions {
        position: absolute;
        display: flex;
        top: 0;
        left: 100%;
        height: 100%;
        width: 10000%;
        align-items: center;
        background: #fff;
        z-index: 10;
        padding: 0 20px;
        will-change: transform;
    }

    &__table {
        flex: 1;
        border-collapse: collapse;
        font-size: 0.86rem;

        &--header-gap {
            &:before {
                content:"@";
                display:block;
                line-height:10px;
                text-indent:-99999px;
            }
        }
    }

    &__header-row {
        background-color: $main-bg;

        &--transparent, &--transparent > td {
            background-color: transparent;
        }

        td {
            color: rgba($primary-dark-blue, 0.5);
            width: 0;

            &:first-child {
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
            }

            &:last-child {
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
            }
        }
    }

    &__row {
        background-color: $main-bg;
        &:not(:first-child) td {
            border-top: 1px solid rgba($icon-gray-color, 0.4);

            &:first-child:before, &:last-child:before {
                content: "";
                position: absolute;
                top: -1px;
                width: 20px;
                height: 1px;
                background-color: #fff;
            }
            &:first-child:before {
                left: 0;
            }
            &:last-child:before {
                right: 0;
            }
        }

        &:first-child td:first-child {
            border-top-left-radius: 6px;
        }
        &:first-child td:last-child {
            border-top-right-radius: 6px;
        }
        &:last-child td:first-child {
            border-bottom-left-radius: 6px;
        }
        &:last-child td:last-child {
            border-bottom-right-radius: 6px;
        }
    }

    &__expand-row {
        background-color: $main-bg;
        & > td {
            padding: 0;
            background-color: #fff;
        }
    }

}

</style>
