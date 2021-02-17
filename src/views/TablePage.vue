<template lang="pug">
    div
        h1 Таблица заказов
        order-table
</template>
<script>
import OrderService from '@/services/api/OrderService'
import OrderTable from '@/components/OrderTable.vue'

export default {
    name: 'TablePage',
    components: { OrderTable },
    data() {
        return {
        }
    },
    methods: {
        async getOrderList() {
            const response = await OrderService.getOrderList({ limit: 5 })
            console.log(response)
        },
    },
    mounted() {
        // this.getOrderList()
    },
}

</script>
