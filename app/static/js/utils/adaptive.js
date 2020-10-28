import * as $ from 'jquery'

import { constant } from './const'
import { vars } from './vars'

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





function adaptive() {
  adaptiveHeaderMenux930()
  adaptiveHeaderMenux600()
  adaptiveHeroNavigationx768()
  adaptiveAboutSliderx1000()
  adaptiveAboutTextx768()
}

export { adaptive }