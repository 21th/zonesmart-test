<template lang="pug">
div
    base-table(:items="orderList" :headers="headers")
        template(v-slot:columns.items="{ item }") {{ item.length }}
        template(v-slot:columns.create_date="{ item }")
            | {{ new Date(Date.parse(item)).toLocaleDateString() }}
</template>

<script>
import BaseTable from '@/components/BaseTable.vue'

export default {
    name: 'OrderTable',
    components: { BaseTable },
    props: {
        orderList: {
            type: Array,
            default: () => ([]),
        },
    },
    data() {
        return {
            headers: [
                { title: 'ID', value: 'id' },
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

</style>
