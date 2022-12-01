// Project files here

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const keyboard = document.getElementById('keyboard');
const randomWords = [
  'boxes',
  'headphones',
  'stranger',
  'popcorn',
  'microwave',
  'mustard',
  'cabinets',
  'star',
  'rapscallion',
  'pirate',
  'carpool',
  'bovine',
  'cookie',
];
const mysteryWord =
  randomWords[Math.floor(Math.random() * randomWords.length)].toUpperCase();

console.log(`The mystery word is:`, mysteryWord);
const guessSelector = document.getElementById('guess-count');
const image = document.getElementById('image');
const testImg = document.getElementById('hang-image');

let guessCount = 0;
let correctGuess = 0;

// Event Listeners
document.addEventListener(
  'DOMContentLoaded',
  () => {
    /* Word Render */
    let wordArr = mysteryWord.split('');
    let letterOutput = '';

    wordArr.forEach((wordLetter) => {
      if (wordLetter !== ' ') {
        letterOutput += `<div class="word-letter-block">${wordLetter.toUpperCase()}</div>`;
      }
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

    const pressedKeys = [];

    document.addEventListener('keypress', (e) => {
      if (
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 97 && e.keyCode <= 122)
      ) {
        if (!pressedKeys.includes(e.keyCode)) {
          if (e.keyCode >= 65 && e.keyCode <= 90) {
            pressedKeys.push(e.keyCode);
            pressedKeys.push(e.keyCode + 32);
          }

          if (e.keyCode >= 97 && e.keyCode <= 122) {
            pressedKeys.push(e.keyCode);
            pressedKeys.push(e.keyCode - 32);
          }
          selectLetterBlocks.forEach((letter) => {
            if (letter.innerHTML === e.key.toUpperCase()) {
              letter.classList.add('active');
            }
          });

          if (wordArr.includes(e.key.toUpperCase())) {
            wordLetterBlockAll.forEach((letter) => {
              if (letter.innerHTML == e.key.toUpperCase()) {
                letter.classList.add('show');
                correctGuess++;
                console.log(`Correct Guess is:`, correctGuess);
              }
            });
          } else {
            guessCount++;
            // image.innerHTML = `<img src="./images/gallows${guessCount}.jpg" alt="" id="hang-image"></img>`;
            testImg.src = `./images/gallows${guessCount}.jpg`;
          }

          setTimeout(() => {
            if (guessCount >= 6) {
              const defeat = new Audio('./audio/marine.m4a');
              defeat.play();
              setTimeout(() => {
                alert(
                  `Game over, the correct word was ${mysteryWord}, try again!`
                );
                window.location.reload();
              }, 300);
            }

            if (correctGuess === mysteryWord.length) {
              const victory = new Audio('./audio/open_chest.m4a');
              victory.play();
              setTimeout(() => {
                alert(`You win! 🎉 The mystery word was ${mysteryWord}.`);

                window.location.reload();
              }, 300);
            }
          }, 100);

          guessSelector.innerHTML = guessCount;
        }
      }
    });

    selectLetterBlocks.forEach((letter) => {
      letter.addEventListener(
        'click',
        (e) => {
          e.target.classList.add('active');
          if (wordArr.includes(e.target.innerHTML)) {
            wordLetterBlockAll.forEach((letter) => {
              if (letter.innerHTML == e.target.innerHTML) {
                letter.classList.add('show');
                correctGuess++;
                console.log(`Correct Guess is:`, correctGuess);
              }
            });
          } else {
            guessCount++;
            testImg.src = `./images/gallows${guessCount}.jpg`;
          }

          setTimeout(() => {
            if (guessCount >= 6) {
              const defeat = new Audio('./audio/marine.m4a');
              defeat.play();
              setTimeout(() => {
                alert(
                  `Game over, the correct word was ${mysteryWord}, try again!`
                );
                window.location.reload();
              }, 300);
            }

            if (correctGuess === mysteryWord.length) {
              const victory = new Audio('./audio/open_chest.m4a');
              victory.play();
              setTimeout(() => {
                alert(`You win! 🎉 The mystery word was ${mysteryWord}.`);

                window.location.reload();
              }, 300);
            }
          }, 100);

          // Remove event listener
          letter.removeEventListener('click', (e) => {
            e.target;
          });

          guessSelector.innerHTML = guessCount;
        },
        { once: true }
      );
    });
  },
  { once: true }
);
