<template lang="pug">
div
    base-table(
        :items="orderList"
        :headers="headers"
        v-model="selectedOrders"
        selectable
    )
        template(v-slot:columns.order_id="{ item }")
            span(class="text--accent-green") {{ item }}
        template(v-slot:columns.items="{ item }") {{ item.length }} {{ getItemsForm(item) }}
        template(v-slot:columns.create_date="{ item }")
            | {{ new Date(Date.parse(item)).toLocaleDateString() }}
</template>

<script>
import BaseTable from '@/components/BaseTable.vue'
import { getNounForm } from '@/utils/string-helpers'

export default {
    name: 'OrderTable',
    components: { BaseTable },
    props: {
        orderList: {
            type: Array,
            default: () => ([]),
        },
    },
    methods: {
        getNounForm,
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
                { title: 'Оплачено', value: 'is_paid' },
                { title: 'Доставлено', value: 'is_shipped' },
                { title: 'Покупатель', value: 'buyer' },
                { title: 'Метод отправки', value: 'shipping_method' },
                { title: 'Стоимость', value: 'total_price' },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
.text--accent-green {
    color: $accent-green-color;
}

</style>
