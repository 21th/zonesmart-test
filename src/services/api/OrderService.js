import APIService from '@/services/APIService'

export default {
    getOrderList(params) {
        return APIService.get('/zonesmart/order/', { params })
    },
}
