import * as $ from 'jquery'
import PullElement from './PullElement'
import { constant } from './const'
import { vars } from './vars'




// ========================================= max-width 1149px ========================================================

function adaptiveReviewsFormx1149() {

  if (window.innerWidth <= constant.adaptive.WIDTHx1149 && !document.querySelector('.' + constant.className.REVIEWS_FORM_BTN)) {
    const btn = `
      <button class="${constant.className.REVIEWS_FORM_BTN}">
        <svg class="${constant.className.REVIEWS_FORM_BTN}__icon">
          <use xlink:href="images/icons/sprite.svg#offer">
        </svg>
      </button>
    `
    $('.wrapper').append(btn)

    const $reviewsBtn = document.querySelector('.' + constant.className.REVIEWS_FORM_BTN)

    $reviewsBtn.addEventListener('click', function () {
      this.classList.toggle(constant.className.REVIEWS_FORM_BTN + '--active')
      vars.$reviewsForm.toggleClass('reviews-form--active')

      adaptiveReviewsFormx480()
    })

  } else if (window.innerWidth > constant.adaptive.WIDTHx1149 && document.querySelector('.' + constant.className.REVIEWS_FORM_BTN)) {
    document.querySelector('.' + constant.className.REVIEWS_FORM_BTN).remove()

  }
}


// ========================================= max-width 1000px =========================================================

function adaptiveAboutSliderx1000() {

  if (window.innerWidth <= constant.adaptive.WIDTHx1000 && !vars.$aboutItems.hasClass('slick-initialized')) {
    vars.$aboutBtn.insertAfter(vars.$aboutItems)
    vars.$aboutItems.slick(vars.optionSlick.aboutItemsSlick)
  } else if (window.innerWidth > constant.adaptive.WIDTHx1000 && vars.$aboutItems.hasClass('slick-initialized')) {
    vars.$aboutItems.slick("unslick")
    vars.$aboutBtn.appendTo(vars.$aboutItems)
  }
}




// ========================================= max-width 930px =========================================================
function adaptiveHeaderMenux930() {
  if (window.innerWidth <= constant.adaptive.WIDTHx930) {
    vars.$header.append(vars.$navigation)
  } else if (window.innerWidth > constant.adaptive.WIDTHx930) {
    vars.$navigation.insertAfter(vars.$burgerBtn)
    vars.$headerLogo.addClass(constant.className.HEADER_LOGO_ACTIVE)
  }
}
// =============================================== max-width 875px ==============================================================================
  

function adaptiveFooterSubscribex875() {
  const $footerSubscribeBtn = document.querySelector('.footer-subscribe-btn')
  let pullElement
  if (window.innerWidth <= constant.adaptive.WIDTHx875 && !$footerSubscribeBtn) {
    const footerBtn = `
      <button class="footer-subscribe-btn" type="button">
        <span class="footer-subscribe-btn__text">Подписывайтесь</span>
      </button>   
    `
    vars.$footerSubscribe.append(footerBtn)

    const $footerSubscrBtn = $('.footer-subscribe-btn')

    pullElement = new PullElement(vars.$footerSubscribe[0], 'right')


  } else if (window.innerWidth > constant.adaptive.WIDTHx875 && $footerSubscribeBtn) {
    if (pullElement) {
      pullElement.destroy()
    }
    $footerSubscribeBtn.remove()
  }
}


// =============================================== max-width 768px ==============================================================================

function adaptiveHeroNavigationx768() {
  if (window.innerWidth <= constant.adaptive.WIDTHx768
    && vars.$heroNavigation.hasClass('slick-initialized')) {

    vars.$heroNavigation.slick('unslick')

  } else if (window.innerWidth > constant.adaptive.WIDTHx768
    && !vars.$heroNavigation.hasClass('slick-initialized')) {
    vars.$heroNavigation.slick(vars.optionSlick.heroNavigationSlick)
  }

}





function adaptiveAboutTextx768() {

  if (window.innerWidth <= constant.adaptive.WIDTHx768 && !vars.$aboutText.hasClass(constant.className.ABOUT_TEXT_MOBILE)) {
    vars.$aboutText.addClass(constant.className.ABOUT_TEXT_MOBILE)
    vars.$aboutText.html(vars.html.aboutTextMobile)
  } else if (window.innerWidth > constant.adaptive.WIDTHx768 && vars.$aboutText.hasClass(constant.className.ABOUT_TEXT_MOBILE)) {
    vars.$aboutText.removeClass(constant.className.ABOUT_TEXT_MOBILE)
    vars.$aboutText.html(window.localStorage.getItem(constant.className.ABOUT_TEXT_MOBILE))
  }
}







// ========================================= max-width 600px =========================================================
function adaptiveHeaderMenux600() {
  if (window.innerWidth <= constant.adaptive.WIDTHx600) {
    vars.$headerContacts.insertAfter(vars.$navigationList)
  } else if (window.innerWidth > constant.adaptive.WIDTHx600) {
    vars.$headerContainer.append(vars.$headerContacts)
  }
}

// ========================================= max-width 480px =========================================================

function adaptiveReviewsFormx480() {
  if (window.innerWidth <= constant.adaptive.WIDTHx480 && vars.$reviewsForm.hasClass('reviews-form--active')) {
    $('body').css('overflow', 'hidden')
    vars.$wrapper.on('touchmove', vars.fn.prevent)

  } else if (window.innerWidth <= constant.adaptive.WIDTHx480 && !vars.$reviewsForm.hasClass('reviews-form--active')) {
    $('body').css('overflow', 'visible')
    vars.$wrapper.off('touchmove', vars.fn.prevent)

  }
}




function adaptive() {
  adaptiveHeaderMenux930()
  adaptiveHeaderMenux600()
  adaptiveHeroNavigationx768()

  adaptiveAboutSliderx1000()
  adaptiveAboutTextx768()

  adaptiveReviewsFormx1149()
  adaptiveReviewsFormx480()

  adaptiveFooterSubscribex875()

}

export { adaptive }