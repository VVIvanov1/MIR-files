// const fields = [
//     {A10EXI: '01'},
//     {A10DOI: '221221'},
//     {A10FOP: '14'}

// ];
const arr = {
  fares: [
    {
      fare: {
        fareData: {
          A07FSI: "01",
          A07CRB: "PLN",
          A07TBF: 404,
          A07CRT: "KZT",
          A07TTA: 40063,
          A07CRE: "KZT",
          A07EQV: 40063,
          itTaxes: [],
          mainTaxes: [],
        },
      },
    },
  ],
};
console.log(arr.fares[0].fare.fareData.A07FSI);

// console.log(arr);
// arr.fares.map(item => {
//     console.log(item.fare.fareData.A07FSI);
// })

// let found = fields.find(item => item.A10EXI)
// console.log(found);
