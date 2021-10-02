const regex = /(^A07[\s\S]*?^)A08/gm
const chunks = 2
const str = `A0701PLN      216.00KZT       70669KZT       21420KZTT1:      59NDT2:    5950XWT3:   43240XT
IT:    9358CZ   33882YQ
A0702PLN       21.00KZT       70669KZT       21420KZTT1:      59NDT2:    5950XWT3:   43240XT
IT:    9358CZ   33882YQ`;

let length = str.length
console.log(str, "\n", length);

// let res = regex.exec(str)
// console.log(res[1]);

