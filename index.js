const form = document.querySelector('#user-form')
const inputs = document.querySelectorAll('.form-group')
const button = document.querySelector('#submit-button')
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const inputArray = [ firstName, lastName, email, password ]
let isAllPass = []

form.addEventListener('submit', (event)  => {
  event.preventDefault()
  event.stopPropagation()
})


button.addEventListener('click', () => {
  if (isAllPass.length !== 0) {
    alert('All inputs are good!!!')
  } else {
    alert('Please check all required inputs are match format!!!')
  }
})

// 將所有input加上eventListener，觸發事件為'任何input值變化'
inputs.forEach(input => {
  input.addEventListener('input', () => {
    validated()
  })
})

function validated () {
  let isValid = false
  let resultsArray = []
  inputArray.forEach(input => {
    if ((input.type === 'text') || (input.type === 'password')) {
      nonEmail(input, resultsArray)
    } else if (input.type === 'email') {
      isEmail(input, resultsArray)
    }
    if (resultsArray.length !== inputArray.length) {
      isValid = false
      isAllPass.pop()
    } else {
      isValid = true
      isAllPass.push('All inputs are good!');
    }
  })
}

function emailForm (input) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
}

function nonEmail (input, resultsArray) {
  if (input.value.length !== 0) {
    pass(input, resultsArray)
  } else {
    fail(input, resultsArray)
  }
}

function isEmail (input, resultsArray) {
  if (emailForm(input.value)) {
    pass(input, resultsArray)
  } else {
    fail(input, resultsArray)
  }
}

function pass (input, resultsArray) {
  input.classList.remove('fail')
  input.nextElementSibling.style.visibility = 'hidden' // .style: could get all style item of a DOM
  resultsArray.push('pass')
}

function fail (input, resultsArray) {
  input.classList.add('fail')
  input.nextElementSibling.style.visibility = 'visible'
  resultsArray.pop()
}