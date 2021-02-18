export function formatCurrency(currency, number) {
    switch (currency) {
    case 'USD': return `$${number}`
    case 'RUB': return `${number}₽`
    default: return number
    }
}

export default { formatCurrency }
