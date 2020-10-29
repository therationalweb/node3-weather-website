const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#messageOne')
const message2 = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit',(event) =>{
  event.preventDefault()
  const location = searchElement.value
  
  const url = '/weather?address=' + location + ''

  message1.textContent = 'Loading ...'
  message2.textContent = ''

  fetch(url).then((response) => {
  response.json().then((data) => {
    if(data.error){
      message2.textContent = data.error}
    else{
      message1.textContent = data.location
      message2.textContent = data.forecast
      
    }
  }) //end of fetch -->
})
  
  



})