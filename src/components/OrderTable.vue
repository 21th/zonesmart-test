<template lang="pug">
div
    base-table(
        v-if="orderList.length"
        :items="orderList"
        :headers="headers"
        v-model="selectedOrders"
        selectable
        header-gap
    )
        template(v-slot:actions)
            button Обновить
            button Удалить
        template(v-slot:columns.order_id="{ column }")
            span(class="text--accent-green") {{ column }}
        template(v-slot:columns.items="{ row, column, toggle }")
            div(
                class="items-column"
                :class="{'items-column__active': row.row_opened}"
                @click="toggle(row)"
            )
                base-icon(name="close")
                span(class="items-column__header") {{ column.length }} {{ getItemsForm(column) }}
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
</template>

<script>
import BaseTable from '@/components/BaseTable.vue'
import { getNounForm } from '@/utils/string-helpers'
import BaseIcon from '@/components/BaseIcon.vue'
import OrderSubtable from '@/components/OrderSubtable.vue'
import { formatCurrency } from '@/utils/currency-helpers'

export default {
    name: 'OrderTable',
    components: { OrderSubtable, BaseIcon, BaseTable },
    props: {
        orderList: {
            type: Array,
            default: () => ([]),
        },
    },
    methods: {
        getNounForm,
        formatCurrency,
        getItemsForm(item) {
            return getNounForm(item.length, 'товар', 'товара', 'товаров')
        },
    },
    data() {
        return {
            selectedOrders: [],
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

</style>
