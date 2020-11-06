import * as $ from 'jquery'
import { maskedPhone } from './functions';


function loadModal(modalId) {
  let thisModal = $(modalId + ' .modal__inner')
  switch (modalId) {
    case '#audit':
      thisModal.load('audit.html .audit', function () {
        maskedPhone($('.audit [type="phone"]'))
      })
      break
    case '#full-form':
      thisModal.load('full-form.html .full-form', function () {
        maskedPhone($('.full-form [type="phone"]'))

        $('.custom-select').styler()
      })
      break
    case '#set-form':
      thisModal.load('set-form.html .set-form', function () {
        maskedPhone($('.full-form [type="phone"]'))
      })
      break
  }
}


export {loadModal}