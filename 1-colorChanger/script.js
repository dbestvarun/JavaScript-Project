const buttons = document.querySelectorAll('.button');
const body = document.body;
// console.log(body)

//Event added to the "button" class which changes the background color of the body as the bgColor of that element.
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    newColor = e.target.id;
    
    body.style.backgroundColor = newColor;
  });
});

//function to generarte color hexcodes
const newColor  = function(){
  const hexaDecimals = "0123456789ABCDEF";
  let colorCode = '#';
  for(let i=0; i<6; i++){
    let index = parseInt(Math.random()*16) %16;
    colorCode += hexaDecimals[index];
  }
  return colorCode;
}

//variable to hold the reference of setInterval so that it can be used in clearInterval.
let intervalId;

//Event listeners added to the buttons.
document.querySelector('#start').addEventListener('click',function(){
  if(!intervalId){
    intervalId = setInterval(() => {
      let nextColor = newColor();
      console.log(nextColor);
      document.body.style.backgroundColor = nextColor;
    }, 1000);
  }
}, false);

document.querySelector('#stop').addEventListener('click',function(){
  if(intervalId){
    console.log("stopped.")
    clearInterval(intervalId);
    intervalId = null;
  }
},false);