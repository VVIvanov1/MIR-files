function getExchangeData(input) {
    const fields = {
        A10EXI: { s: 3, l: 2 }, // pax number
        A10DOI: { s: 5, l: 7 }, // date of original issue
        A10FOP: { s: 42, l: 19 }, // form of payment
        A10TYP: { s: 79, l: 1 }, // type of exch ticket
        //         A = ADD COLLECT
        // R = REFUND
        // E = EVEN EXCHANGE

    }
    let regex = /A10[\s\S]*KZT.*/gm
    let mat = regex.exec(input)
    let arr = mat[0].split("\r\n").map(item => {
        return item.startsWith('A10') ? item :
            item.startsWith('TI:') ? item :
                item.startsWith('KZT') ? item : null
    }).filter(item => item !== null)
    let count = (arr.length / 3)
    let chunks = []
    let start = 0
    for (let i = 0; i < count; i++) {
        let str = ''
        str += arr[start] + "\r\n"
        str += arr[start + 1] + "\r\n"
        str += arr[start + 2] + "\r\n"
        chunks.push(str)
        start = start + 3
    }
    chunks.map(ch => {
        let obj = Object.entries(fields).map(([key, value]) => {
            return { [key]: ch.substr(value.s, value.l) }
        })
        let rgs = /TI:.{4,14}/g
        obj.ticket = rgs.exec(ch)[0].replace("TI:", "")
        console.log(obj);
    })



}

module.exports = getExchangeData