const buttons = document.querySelectorAll('.button');
const body = document.body;
// console.log(body)
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    newColor = e.target.id;
    
    body.style.backgroundColor = newColor;
  });
});
