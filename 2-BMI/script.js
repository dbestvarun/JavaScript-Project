const calculate = document.querySelector('form');

calculate.addEventListener('submit',(e)=>{
  e.preventDefault();

  const height = +(document.querySelector('#height').value);
  const weight = +(document.querySelector('#weight').value);
  const results = document.querySelector('#results');
  console.log(height)
  if( height<=0 || isNaN(height)){
    results.innerHTML = 'Please enter a valid Height!';
  }else if( weight<=0 || isNaN(weight)){
    results.innerHTML = 'Please enter a valid weight!';
  }else{
    const bmi = (weight/((height*height)/10000)).toFixed(2);
    results.innerHTML = `<span>${bmi}</span>`;
  }
})