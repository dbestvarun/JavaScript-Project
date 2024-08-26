const buttons = document.querySelectorAll('.button');
const body = document.body;
// console.log(body)

//Event added to the "button" class which changes the background color of the body as the bgColor of that element.
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let buttonColor = e.target.id;

    body.style.backgroundColor = buttonColor;
    displayColorCode();
  });
});

//function to generarte color hexcodes
const newColor = function () {
  const hexaDecimals = "0123456789ABCDEF";
  let colorCode = '#';
  for (let i = 0; i < 6; i++) {
    let index = parseInt(Math.random() * 16) % 16;
    colorCode += hexaDecimals[index];
  }
  return colorCode;
}

//creating an Element to display the color.
const whatColor = document.createElement('span');
whatColor.classList.add("displayColor");
document.querySelector('.canvas').appendChild(whatColor);

const displayColorCode = function () {
  const body = document.body;
  const style = window.getComputedStyle(body);
  const backgroundColor = style.backgroundColor;

  // Extract the RGB values using a regular expression
  const rgbValues = backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);


  // Convert each RGB value to a two-digit hexadecimal number
  const hexCode = `#${Number(rgbValues[1]).toString(16).padStart(2, '0')}${Number(rgbValues[2]).toString(16).padStart(2, '0')}${Number(rgbValues[3]).toString(16).padStart(2, '0')}`;

  whatColor.innerHTML = `<br> The Code of current background is <b>${hexCode}</b>`;
};

//variable to hold the reference of setInterval so that it can be used in clearInterval.
let intervalId;
//Event listeners added to the button.
document.querySelector('#colorSwitcher').addEventListener('click', function () {
  if (!intervalId) {
    intervalId = setInterval(() => {
      let nextColor = newColor();
      console.log(nextColor);
      document.body.style.backgroundColor = nextColor;
      displayColorCode();
    }, 1000);
    document.querySelector('#colorSwitcher').innerHTML = 'STOP';
  } else {
    clearInterval(intervalId);
    intervalId = null;
    document.querySelector('#colorSwitcher').innerHTML = 'START';
  }
}, false);

// previously two button code 

// document.querySelector('#start').addEventListener('click', function () {
//   if (!intervalId) {
//     intervalId = setInterval(() => {
//       let nextColor = newColor();
//       console.log(nextColor);
//       document.body.style.backgroundColor = nextColor;
//       displayColorCode();
//     }, 1000);
//   }
// }, false);

// document.querySelector('#stop').addEventListener('click', function () {
//   if (intervalId) {
//     console.log("stopped.")
//     clearInterval(intervalId);
//     intervalId = null;
//   }
// }, false);

