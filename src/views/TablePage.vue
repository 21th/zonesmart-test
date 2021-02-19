<template lang="pug">
    div
        order-table(
            :order-list="order_list"
            :limit="limit"
            :offset="offset"
            :count="count"
            :search="search"
            :loading="loading"
            @prevpage="onPrevPage"
            @nextpage="onNextPage"
            @search="onSearch"
        )
</template>
<script>
import OrderService from '@/services/api/OrderService'
import OrderTable from '@/components/Orders/OrderTable.vue'
import _debounce from 'lodash.debounce'

export default {
    name: 'TablePage',
    components: { OrderTable },
    data() {
        return {
            order_list: [],
            limit: 10,
            offset: 0,
            count: 0,
            search: '',
            loading: false,
        }
    },
    methods: {
        async getOrderList() {
            this.loading = true
            try {
                const response = await OrderService.getOrderList({
                    limit: this.limit,
                    offset: this.offset,
                    search: this.search,
                })
                this.order_list = response.data.results
                this.count = response.data.count
                if (this.offset >= this.count) {
                    this.offset = 0
                    await this.getOrderList()
                }
                this.loading = false
            } catch (e) {
                console.error(e.response)
                this.loading = false
            }
        },
        onPrevPage() {
            this.offset -= this.limit
            if (this.offset < 0) this.offset = 0
            this.getOrderList()
        },
        onNextPage() {
            this.offset += this.limit
            this.getOrderList()
        },
        // eslint-disable-next-line prefer-arrow-callback,func-names
        onSearch: _debounce(function (val) {
            this.search = val
            this.offset = 0
            this.getOrderList()
        }, 300),
    },
    mounted() {
        this.getOrderList()
    },
}

</script>
