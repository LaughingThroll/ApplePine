
import * as $ from 'jquery'
import { vars } from './vars'
import {constant} from './const'

export function addHeroAnimation(currentSlide) {
  
  if (!currentSlide.hasClass(constant.className.HERO_ANIMATION)) {
    $('.' + constant.className.HERO_ANIMATION).removeClass(constant.className.HERO_ANIMATION)

    window.requestAnimationFrame(() => {
      currentSlide.addClass(constant.className.HERO_ANIMATION)
    })
  }
}

export function aboutInLocalStorage() {
  window.localStorage.setItem(constant.className.ABOUT_TEXT_MOBILE, vars.$aboutText.text()) 
}


