export function getNounForm(num, form1, form2, form3) {
    if (form1 && form2 && form3) {
        switch (num) {
        case 1: return form1
        case 2:
        case 3:
        case 4: return form2
        default: return form3
        }
    }
    throw new Error('Не хватает аргументов для получения формы слова')
}

export default { getNounForm }
