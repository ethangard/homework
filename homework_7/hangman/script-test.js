const h1 = document.querySelector('h1');


document.addEventListener('DOMContentLoaded', () => {
  h1.addEventListener('click', (e) => {
    console.log(`${e.target.innerHTML} clicked - add EL`);
    console.log(`${e.target.innerHTML} clicked - removed EL`);
  }, {once: true});
});

// const logData = (e) => {
//   console.log(`${e.target.innerHTML} clicked - add EL`);

//   this.removeEventListener('click', logData)

//   console.log(`${e.target.innerHTML} clicked - removed EL`);
// }