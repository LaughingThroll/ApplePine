import * as $ from 'jquery'


const checkEmail = email => /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1-6}\.)?[a-z]{2,6}$/i.test(email)
const checkURL = url => /^(ftp|http|https):\/\/[^ "]+$/.test(url)
const checkLength = value => value !== ''

const succsesSubmit = () => {
  $(this).fadeOut()
  $('#validate').fadeIn().load('validate.html #succses-submit')
}

const errorSubmit = () => {
  $('#validate').fadeIn().load('validate.html #error-submit')
}


function makeRequest(options, done = succsesSubmit, fail = errorSubmit) {
  $.ajax(options)
    .done(done)
    .fail(fail)
}




export {makeRequest, checkEmail, checkURL, checkLength}