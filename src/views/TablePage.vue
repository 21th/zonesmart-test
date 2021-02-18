<template lang="pug">
    div
        h1 Таблица заказов
        order-table(:order-list="order_list")
</template>
<script>
import OrderService from '@/services/api/OrderService'
import OrderTable from '@/components/OrderTable.vue'

export default {
    name: 'TablePage',
    components: { OrderTable },
    data() {
        return {
            order_list: [],
        }
    },
    methods: {
        async getOrderList() {
            const response = await OrderService.getOrderList({ limit: 15 })
            this.order_list = response.data.results
        },
    },
    mounted() {
        this.getOrderList()
    },
}

</script>
