const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const keyboard = document.getElementById('keyboard');
const mysteryWord = 'popcorn'.toUpperCase();
const guessSelector = document.getElementById('guess-count')

const image = document.getElementById('image');

let guessCount = 0;

let correctGuess = 0;


// Event Listeners 
document.addEventListener('DOMContentLoaded', () => {
  /* Word Render */
  let wordArr = mysteryWord.split('');

  let letterOutput = '';

  wordArr.forEach((wordLetter) => {
    letterOutput += `<div class="word-letter-block">${wordLetter.toUpperCase()}</div>`;
  });

  document.getElementById('word').innerHTML = letterOutput;

  /* Word Renders  */

  let output = '';

  const arrAlpha = alphabet.split('');

  arrAlpha.forEach((letter) => {
    output += `<div class="letter-block">${letter.toUpperCase()}</div>`;
  });

  keyboard.innerHTML = output;

  // Click event

  const selectLetterBlocks = document.querySelectorAll('.letter-block');

  // console.log(selectLetterBlocks);

  const wordLetterBlockAll = document.querySelectorAll('.word-letter-block');


/* Testing Keyboard physical keyboard inputs */

  // Lowercase between inclusive 97 - 122
  // Uppercase between inclusive 65 - 90

  document.addEventListener('keypress', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 97 && e.keyCode <= 122) {

      console.log(`Your input key was: ${e.key}. The keycode was: ${e.keyCode}`)   
      
      

      




      
    }
  });



  /* Test End */

  selectLetterBlocks.forEach((letter) => {
    letter.addEventListener('click', (e) => {
      // console.log(`Event Target: ${e.target}`);
      e.target.classList.add('active');

      /* If Block with Logic  */

      if (wordArr.includes(e.target.innerHTML)) {
        wordLetterBlockAll.forEach((letter) => {
          if (letter.innerHTML == e.target.innerHTML) {
            letter.classList.add('show');
            correctGuess++;
          }
        });
      } else {
        guessCount++;
        image.innerHTML = `<img src="./images/gallows${guessCount}.jpg" alt="" id="hang-image"></img>`;
      }

      console.log('Current correct guesses', correctGuess);

      setTimeout(() => {
        if (guessCount >= 6) {
          alert('Game over, try again!');
          window.location.reload();
        }

        if (correctGuess === mysteryWord.length) {
          alert(`You win! 🎉 The mystery word was ${mysteryWord}.`);
          new Audio(``);
          window.location.reload();
        }
      }, 100);

      // wordLetterBlockAll.forEach((letter)=> {
      // Testing
      // console.log(wordArr);
      // console.log(e.target.innerHTML);
      // console.log(letter.innerHTML);

      //   if (letter.innerHTML == e.target.innerHTML) {

      //     // const selectedLettersArr = [];
      //     // for (let i = 0; i < wordArr.length; i++) {
      //     //   if (wordArr[i] === e.target.innerHTML) selectedLettersArr.push(i)
      //     // }

      //     //console.log(letter)
      //     letter.classList.add('show')
      //     // console.log(letter)

      //    } else {
      //       guessCount++;
      //       image.innerHTML = `<img src="./images/gallows${guessCount}.jpg" alt="" id="hang-image"></img>`
      //    }
      // })

      // console.log(`My Current Event ... removing listner for: `, e.target)
      // Remove event listener
      letter.removeEventListener('click', (e) => {
        e.target;
      });

      guessSelector.innerHTML = guessCount;
    });
  });

  // Show selected letters

  // show selected letters

  // const wordLetterBlockAll = document.querySelectorAll('word-letter-block');

  // wordLetterBlockAll.forEach((letter)=> {

  // })
}, {once: true });

