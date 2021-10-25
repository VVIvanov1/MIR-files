let dte = '20MAR';

let year = new Date().getFullYear()

let month = new Date(dte).getMonth().toString()

let day = new Date(dte).getDate()

// console.log(year + " " + month + " " + day);

let fullDate = new Date(year, month, day+1).toLocaleDateString()

console.log(fullDate);