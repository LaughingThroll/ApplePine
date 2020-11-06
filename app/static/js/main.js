/*global Promise */
import './utils/modernizr'
import * as $ from 'jquery'
window.$ = window.jQuery = $;
import 'slick-carousel/slick/slick'
import 'jquery.maskedinput/src/jquery.maskedinput'
import 'ion-rangeslider/js/ion.rangeSlider'
import 'jquery.formstyler-modern'
import {loadingPage} from './utils/preloader'
import {makeRequest, checkEmail, checkURL, checkLength} from './utils/validation'
import { loadModal } from './utils/modal'
import { constant } from './utils/const'
import { vars } from './utils/vars'
import { adaptive } from './utils/adaptive'
import { addHeroAnimation, aboutInLocalStorage, maskedPhone, accordion, showTeamSocials, hideShowSocials, cutText } from './utils/functions'

// PROCEDURE_PRELOADER
function succsesLoad(node) {

  if (!node.hasClass('preloader--loading') || !node.hasClass('preloader--loading-mobile')) {

    if (window.innerWidth <= constant.adaptive.WIDTHx930) {

      node.addClass('preloader--loading-mobile')
      let $loader = node.children().first()
      $loader.on('transitionend', (e) => transEndPreloader(node, e))
    } else {
      node.addClass('preloader--loading')
      node.on('transitionend', (e) => transEndPreloader(node, e))
    }


    vars.$header.addClass(constant.className.HEADER_ANIMATION)
    vars.$heroSlider.slick('getSlick').$slides.first().addClass(constant.className.HERO_ANIMATION)
    $("body").css("overflow", "visible")
    vars.$wrapper.off('touchmove', vars.fn.prevent)


  }
}

function transEndPreloader(node, e) {

  if (e.target.id === 'preloader' || e.target.id === 'loader') {

    adaptiveAnimationAfterLoad(node)
    node.addClass('preloader--end')
  }
}

function adaptiveAnimationAfterLoad() {

  if (window.innerWidth <= constant.adaptive.WIDTHx600) {
    vars.$headerLogo.insertAfter(vars.$burgerBtn)

  } else if (window.innerWidth > constant.adaptive.WIDTHx600) {
    vars.$headerLogo.insertBefore(vars.$headerContacts)
  }

  if (window.innerWidth <= constant.adaptive.WIDTHx930) {
    vars.$headerLogo.addClass(constant.className.HEADER_LOGO_ACTIVE)
  }

}

//  PRELOADER
$(window).on('load', function () {

  let time = Math.ceil(window.performance.now())

  $('body').css('overflow', 'hidden')
  vars.$wrapper.on('touchmove', vars.fn.prevent)

  function cloneImages() {
    return new Promise(resolve => {
      loadingPage(vars.$loadLine, time)
      vars.$loadLine.on('transitionend', () => resolve(true))
    })
  }

  cloneImages().then(succsesLoad.bind(this, vars.$preloader))
})


// MAIN

$(document).on('DOMContentLoaded', function () {

  adaptive()
  window.addEventListener('resize', adaptive)


  aboutInLocalStorage()

  cutText(vars.$servicesItem, 205, '')
  cutText(vars.$reviewsContentItemText, 500, '...')
  cutText(vars.$newsSliderArticleText, 65, '...')

  // HEADER
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault()
    let scrollToBlock = $(this).attr("href")
    let blockPosition = $(scrollToBlock).offset().top
    $('html').animate({ scrollTop: blockPosition }, 1000)
  })



  vars.$burgerBtn.on('click', function () {
    $(this).toggleClass('burger-btn--active')
    vars.$navigation.toggleClass('navigation--active')
  })

  vars.$heroSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    draggable: false,
    fade: true,
    infinite: false,
    rows: 0
  })

  vars.$heroSlider.on('afterChange', (_, __, nextSlide) => {
    const currentSlide = $([...vars.$heroSlider.slick('getSlick').$slides][nextSlide])
    addHeroAnimation(currentSlide)
  })

  
  // TEAM
  vars.$teamSlider.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    variableWidth: true,
    rows: 0
  });

  vars.$teamSlider.on('mouseenter', '.team-item', showTeamSocials).on('mouseleave', '.team-item', hideShowSocials)


  // SERVICES
  $('#services-slider').slick({
    prevArrow: '<button type="button" class="main-slider-btn main-slider-btn--small main-slider-btn--prev slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="main-slider-btn main-slider-btn--small main-slider-btn--next slick-btn slick-next"></button>',
    dots: false,
    arrows: true,
    rows: 0
  })

  $('.slider-works').slick({
    fade: true,
    dots: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    rows: 0
  })

  //REVIEWS
  $('#slider-images').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    asNavFor: '#reviews-slider-content',
    infinite: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  $('#reviews-slider-content').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '#slider-images',
    fade: true,
    prevArrow: '.reviews-main-btns .main-slider-btn--prev',
    nextArrow: '.reviews-main-btns .main-slider-btn--next',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  })

  maskedPhone(vars.$inputPhone)


  vars.$rangeSlider.ionRangeSlider({
    postfix: "P",
    min: 0,
    max: 90000,
    from: 0,
    grid: true,
    step: 10000,
    grid_num: 9
  })
  

 
  // QUESTION
  $('#question-accordion').on('click', accordion.bind($('#question-accordion'), 'question-accordion__item', 'question-accordion__item--active'))

  // FOOTER
  $('#news-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
    infinite: false,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  })

  // MODAL
  $('.modal').on('click', function (e) {
    if (e.target.classList.contains('modal') || e.target.closest('[data-close]')) {
      $(this).fadeOut()
      $('body').css('overflow', 'visible')
      $('body').off('touchmove', vars.fn.prevent)
      return
    }
    e.stopPropagation()

  }).on('mouseenter', '.btn-close', function () {
    $(this).toggleClass('btn-close--active')
  })

  $('[data-modal]').on('click', function (e) {
    e.preventDefault()
    let modalId = $(this).data('modal')
    $(modalId).fadeIn()
    loadModal(modalId)
    $('body').css('overflow', 'hidden')
    $('body').on('touchmove', vars.fn.prevent)
  })

  // VALIDATE
  const allForm = [{ form: $('#audit') }, { form: $('#full-form') }, { form: $('#set-form') }, { form: $('#reviews-form') }, { form: $('#subscribe-form') }]
  const { 0: audit, 1: fullForm, 2: setForm, 3: reviewsForm, 4: subsribeForm } = allForm

  audit.form.on('submit', (e) => {
    e.preventDefault()
    audit.name = $('[name="audit-name"]').val()
    audit.phone = $('[name="audit-phone"]').val()

    if (!checkLength(audit.name) && !checkLength(audit.phone)) {
      $('#validate').fadeIn().load('validate.html #error-fill')
      return
    }
    makeRequest({
      url: 'send.php',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ name: audit.name, phone: audit.phone })
    })
    vars.fn.prevent()
  })


  fullForm.form.on('submit', (e) => {
    e.preventDefault()
    fullForm.name = $('[name="full-form-name"]').val()
    fullForm.phone = $('[name="full-form-phone"]').val()
    fullForm.url = $('[name="full-form-url"]').val()
    fullForm.checkbox = Array.from($('[name^="full-form-check"]')).map(checkbox => ({
      name: checkbox.name,
      checked: checkbox.checked
    }))

    if (!checkLength(fullForm.name) && !checkLength(fullForm.phone)) {
      $('#validate').fadeIn().load('validate.html #error-fill')
      return
    }

    if (!checkURL(fullForm.url)) {
      $('#validate').fadeIn().load('validate.html #error-url')
      return
    }

    makeRequest({
      url: 'send.php',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ name: fullForm.name, phone: fullForm.phone, url: fullForm.url, checkbox: fullForm.checkbox })
    })
  })

  setForm.form.on('submit', () => {
    setForm.name = $('[name="full-form-name"]').val()
    setForm.phone = $('[name="full-form-phone"]').val()
    setForm.checkbox = Array.from($('[name^="set-form-check"]')).map(checkbox => ({
      name: checkbox.name,
      checked: checkbox.checked
    }))

    if (!checkLength(fullForm.name) && !checkLength(fullForm.phone)) {
      $('#validate').fadeIn().load('validate.html #error-fill')
      return
    }

    makeRequest({
      url: 'send.php',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ name: setForm.name, phone: setForm.phone, checkbox: setForm.checkbox })
    })

  })



  reviewsForm.form.on('submit', (e) => {
    e.preventDefault()
    reviewsForm.name = $('[name="reviews-form-name"]').val()
    reviewsForm.phone = $('[name="reviews-form-phone"]').val()
    reviewsForm.range = +$('#reviews-form .irs-single').text().match(/[\d\s+]+/g)[0].replace(/\s+/g, '')
    reviewsForm.checkPolitical = $('[name="reviews-form-check-political"]')[0].checked

    if (!checkLength(reviewsForm.name) && !checkLength(reviewsForm.phone)) {
      $('#validate').fadeIn().load('validate.html #error-fill')
      return
    }


    if (!reviewsForm.checkPolitical) {
      $('#validate').fadeIn().load('validate.html #error-confidentiality')
      return
    }


    makeRequest({
      url: 'send.php',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ name: reviewsForm.name, phone: reviewsForm.phone, checkboxPolitical: reviewsForm.checkPolitical, range: reviewsForm.range })
    })
  })

  subsribeForm.form.on('submit', (e) => {
    e.preventDefault()
    subsribeForm.email = $('[name="subscribe-email"]').val()

    if (!checkEmail(subsribeForm.email)) {
      $('#validate').fadeIn().load('validate.html #error-email')
      return
    }

    makeRequest({
      url: 'send.php',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({ email: subsribeForm.email })
    }, () => {
      $(this).fadeOut()
      $('#validate').fadeIn().load('validate.html #succses-subscribe')
    })
  })
})









