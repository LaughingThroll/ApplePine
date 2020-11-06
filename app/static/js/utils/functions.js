
import * as $ from 'jquery'
import { vars } from './vars'
import {constant} from './const'

function addHeroAnimation(currentSlide) {
  
  if (!currentSlide.hasClass(constant.className.HERO_ANIMATION)) {
    $('.' + constant.className.HERO_ANIMATION).removeClass(constant.className.HERO_ANIMATION)

    window.requestAnimationFrame(() => {
      currentSlide.addClass(constant.className.HERO_ANIMATION)
    })
  }
}

function aboutInLocalStorage() {
  window.localStorage.setItem(constant.className.ABOUT_TEXT_MOBILE, vars.$aboutText.text()) 
}


function maskedPhone(jQnode, mask = '+7(999) 999-99-99') {
  jQnode.mask(mask)
  jQnode.on('change', function () {
    const $phoneStars = $(this).next();
    /\d/.test($(this).val()) ?
      $phoneStars.css('display', 'none') :
      $phoneStars.css('display', 'block')
  })
}

function accordion(itemTarget, activeClass, e) {
  let item = $(e.target.closest('.' + itemTarget))
  $('.' + activeClass).removeClass(activeClass)
  Array.from(this.children()).forEach(el => {
    $(el).children().last().css('display', 'none')
  })

  item.children().last().slideToggle('slow')
  item.addClass(activeClass)
}


function showTeamSocials() {
  if ($(this).hasClass(constant.className.TEAM_ITEM_UNHOVER)) {
    $(this).removeClass(constant.className.TEAM_ITEM_UNHOVER)
  }
  $(this).addClass(constant.className.TEAM_ITEM_HOVER)
}

function hideShowSocials() {
  $(this).removeClass(constant.className.TEAM_ITEM_HOVER)
}

function cutText(node, length, separator = '') {
  node.text(function (_, text) {
    if (text.length > length) {
      $(this).text(text.substring(0, length) + separator)
    }
  })
}

export {addHeroAnimation, aboutInLocalStorage, maskedPhone, accordion, showTeamSocials, hideShowSocials, cutText}

