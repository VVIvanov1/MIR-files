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
    // /A10.*\n.*\n.*/gm
    let regex = /A10.*\r\n.*\r\n.*/gm
    let mat = regex.exec(input)
    // get pax reference DOI FOP and type
    let exchTicketArr = mat.map(block => {
        let obj = Object.entries(fields).map(([key, val]) => {
            return { [key]: block.substr(val.s, val.l).replace(/\s/g, "") }
        })
        let ticketRegex = /TI:.*/g
        let tkt = block.match(ticketRegex)[0].substr(3, 14)
        obj.tktNumber = tkt.substr(0, 3) + '-' + tkt.substr(3)
        // let amountRegex = /KZT:.*/g
        obj.t1 = block.match(/T1:.{10}/g)[0].replace(/T\d:\s*/g, "")
        obj.t2 = block.match(/T2:.{10}/g)[0].replace(/T\d:\s*/g, "")
        obj.t3 = block.match(/T3:.{10}/g)[0].replace(/T\d:\s*/g, "")
        let exchTicketTotal = /(?<=T5:.{10}).{12}/g
        obj.tktTotal = Number(block.match(exchTicketTotal)[0])
        obj.record = `Ticket ${obj.tktNumber} issued ${obj[1].A10DOI} total ${obj.tktTotal} KZT`
        return obj
    })
    return exchTicketArr
    // console.log(exchTicketArr);
}

module.exports = getExchangeData
