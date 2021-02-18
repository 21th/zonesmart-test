<template lang="pug">
    base-table(:headers="headers" :items="items" transparent-header)
        template(v-slot:columns.price="{ row, column }") {{ formatCurrency(row.currency, column) }}
        template(v-slot:columns.total_price="{ row, column }")
            | {{ formatCurrency(row.currency, column) }}
        template(v-slot:columns.title="{ row, column }")
            .order-info
                .order-info__image
                    .image-example
                .order-info__content
                    .order-info__title {{ row.title }}
                    .order-info__sku {{ row.sku }}
</template>

<script>
import BaseTable from '@/components/BaseTable.vue'
import { formatCurrency } from '@/utils/currency-helpers'

export default {
    name: 'OrderSubtable',
    components: { BaseTable },
    props: {
        items: {
            type: Array,
            default: () => ([]),
        },
    },
    data() {
        return {
            headers: [
                { title: 'Название/SKU', value: 'title' },
                { title: 'Заказанное количество', value: 'quantity' },
                { title: 'Отправленное количество', value: 'quantity' },
                { title: 'Цена', value: 'price' },
                { title: 'Стоимость', value: 'total_price' },
            ],
        }
    },
    methods: {
        formatCurrency,
    },
}
</script>

<style lang="scss" scoped>
::v-deep .base-table__header-row {
    background: none;
}

::v-deep .base-table {
    background: none;
}

::v-deep .base-table__table {
    margin-left: 60px;
    margin-right: 20px;
}

.order-info {
    display: flex;

    &__image {
        margin-right: 20px;
    }

    &__content {
        will-change: transform, opacity;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    &__title {
        font-size: 1rem;
        font-weight: 500;
    }

    &__sku {
        color: rgba($primary-dark-blue, .5)
    }
}

.image-example {
    width: 40px;
    height: 40px;
    background-color: #8A939C;
}

</style>
