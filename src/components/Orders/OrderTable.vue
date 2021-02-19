<template lang="pug">
.order-table
    .order-table__heading
        h1.ml-5 Таблица заказов
        div
            base-button.mr-4(dark dense) Отправления
            base-button.mr-4(dense) Экспортировать
    .order-table__filter.pl-5
        base-button.mr-4(dark) Фильтр
        base-input.mr-4.ml-5(@input="$emit('search', $event)" :value="search" label="Поиск")

    transition(name="fade")
        skeleton-table(
            v-if="loading"
            :rows="12"
            :columns="10"
        )
        base-table(
            v-if="!loading"
            :items="orderList"
            :headers="headers"
            v-model="selected_orders"
            default-value="Не определен"
            selectable
            header-gap
        )
            template(v-slot:actions)
                base-button.mr-3(@click="onUpdate" text) Обновить
                base-button(@click="onDelete" text) Удалить

            template(v-slot:columns.order_id="{ column }")
                span(class="text--accent-green") {{ column }}

            template(v-slot:columns.items="{ row, column, toggle }")
                div(
                    class="items-column"
                    :class="{'items-column__active': row.row_opened}"
                    @click="toggle(row)"
                )
                    base-icon(name="close")
                    span(class="items-column__header")
                        | {{ column.length }} {{ getItemsForm(column) }}

            template(v-slot:columns.create_date="{ column }")
                | {{ new Date(Date.parse(column)).toLocaleDateString() }}

            template(v-slot:columns.is_paid="{ column }")
                base-icon(v-show="column" name="check-filled")

            template(v-slot:columns.is_shipped="{ column }")
                base-icon(v-show="column" name="check-filled")

            template(v-slot:columns.total_price="{ row }")
                | {{ formatCurrency(row.currency_code, row.total_price) }}

            template(v-slot:expand_data="{ row }")
                order-subtable(:items="row.items")

    .order-table__pagination
        base-button.mr-2(
            :disabled="offset === 0"
            @click="$emit('prevpage')"
            text icon
        )
            base-icon(name="left-arrow")
        span {{ range }} из {{ count }}
        base-button.ml-2(
            @click="$emit('nextpage')"
            :disabled="offset + limit >= count"
            text icon
        )
            base-icon(name="right-arrow")
</template>

<script>
import OrderSubtable from '@/components/Orders/OrderSubtable.vue'
import SkeletonTable from '@/components/SkeletonLoaders/SkeletonTable.vue'
import { getNounForm } from '@/utils/string-helpers'
import { formatCurrency } from '@/utils/currency-helpers'

export default {
    name: 'OrderTable',
    components: {
        OrderSubtable,
        SkeletonTable,
    },
    props: {
        orderList: {
            type: Array,
            default: () => ([]),
        },
        limit: {
            type: Number,
            default: 0,
        },
        offset: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 0,
        },
        search: {
            type: String,
            default: '',
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        getNounForm,
        formatCurrency,
        getItemsForm(item) {
            return getNounForm(item.length, 'товар', 'товара', 'товаров')
        },
        onUpdate() {
            console.log(`Обновляю [${this.selected_orders}]`)
        },
        onDelete() {
            console.log(`Удаляю [${this.selected_orders}]`)
        },
    },
    data() {
        return {
            selected_orders: [],
            headers: [
                { title: 'ID', value: 'order_id' },
                { title: 'Товары', value: 'items' },
                { title: 'Дата заказа', value: 'create_date' },
                { title: 'Статус', value: 'status' },
                { title: 'Оплачено', value: 'is_paid', align: 'center' },
                { title: 'Доставлено', value: 'is_shipped', align: 'center' },
                { title: 'Покупатель', value: 'buyer' },
                { title: 'Метод отправки', value: 'shipping_method' },
                { title: 'Стоимость', value: 'total_price', align: 'right' },
            ],
        }
    },
    computed: {
        range() {
            const from = this.offset
            let to = this.offset + this.limit
            if (to > this.count) to = this.count
            return `${from} - ${to}`
        },
    },
}
</script>

<style lang="scss" scoped>
.items-column {
    display: flex;
    align-items: center;
    color: $accent-green-color;
    user-select: none;

    &:hover {
        cursor: pointer;
    }

    &__header {
        margin-left: 0.5rem;
    }

    .icon {
        transform: rotate(45deg);
        transition: transform .2s;
    }

    &__active .icon {
        transform: rotate(0);
    }
}

.text--accent-green {
    color: $accent-green-color;
}
.order-table {

    &__heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__filter {
        display: flex;
    }

    &__pagination {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        opacity: 0.5
    }
}

</style>
