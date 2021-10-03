function getTicketInfo(obj){

    let res = []
    for(let ticket of obj.passengers){
        let name = ticket.passenger.A02NME
        let tkt = obj.T50ISA +'-'+ ticket.passenger.A02TKT
        let flFilter = ['A04OCC', 'A04OCN', 'A04DCC', 'A04DCN']  
        let flsArr = obj.flights
        let newFlArr = []
      
        res.push(name,tkt)
    }
    console.log(res);

}


module.exports = getTicketInfo