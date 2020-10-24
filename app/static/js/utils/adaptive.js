import * as $ from 'jquery'

import { constant } from './const'
import { vars } from './vars'



// ========================================= max-width 930px =========================================================
function adaptiveHeaderMenux930() {
  if (window.innerWidth <= constant.adaptive.HEADER_ADAPTIVE_WIDTHx930) {
    vars.$header.append(vars.$navigation)
  } else if (window.innerWidth > constant.adaptive.HEADER_ADAPTIVE_WIDTHx930) {
    vars.$navigation.insertAfter(vars.$burgerBtn)
    vars.$headerLogo.addClass(constant.className.HEADER_LOGO_ACTIVE)
  }
}

function adaptiveHeroNavigationx768() {
  if (window.innerWidth <= constant.adaptive.HERO_ADAPTIVE_WIDTHx768 
    && vars.$heroNavigation.hasClass('slick-initialized')) {
    
      vars.$heroNavigation.slick('unslick')
    
  } else if (window.innerWidth > constant.adaptive.HERO_ADAPTIVE_WIDTHx768 
    && !vars.$heroNavigation.hasClass('slick-initialized')) {
      vars.$heroNavigation.slick(vars.optionSlick.heroNavigationSlick)
  }
  
}






// ========================================= max-width 600px =========================================================
function adaptiveHeaderMenux600() {
  if (window.innerWidth <= constant.adaptive.HEADER_ADAPTIVE_WIDTHx600) {
    vars.$headerContacts.insertAfter(vars.$navigationList)
  } else if (window.innerWidth > constant.adaptive.HEADER_ADAPTIVE_WIDTHx600) {
    vars.$headerContainer.append(vars.$headerContacts)
  }
}





function adaptive() {
  adaptiveHeaderMenux930()
  adaptiveHeaderMenux600()
  adaptiveHeroNavigationx768()
}

export { adaptive }