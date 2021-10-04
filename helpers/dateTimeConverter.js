
function convertDate(obj){
    let dat = new Date(obj) 
    return dat.toLocaleDateString("en-US")
}
function convertTime(obj){
    let tme = obj.substring(0,2) +":"+obj.substring(2)
    return tme.replace(/\s/g,"")
}


module.exports = [convertDate, convertTime]
// module.exports = convertTime