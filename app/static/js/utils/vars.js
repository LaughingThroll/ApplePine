import * as $ from 'jquery'

const vars = {
  images: Array.from(document.images),
  $header: $('#header'),
  $headerContainer: $('.header__container'),
  $headerLogo: $('.header__logo'),
  $headerContacts: $('.header__contacts'),
  $navigation: $('#navigation'),
  $navigationList: $('.navigation__list'),
  $heroSlider: $('#hero-slider'),
  $burgerBtn: $('#burger-btn'),
  $heroNavigation: $('#hero-navigation'),
  $servicesItem: $('.services-item__text'),
  $reviewsContentItemText: $('.reviews-content-item__text'),
  $newsSliderArticleText: $('.news-slider-article__text'),
  $teamSlider: $('#team-slider'),
  $rangeSlider: $('.range-slider'),
  $inputPhone: $('input[type="phone"]'),
  optionSlick: {
    heroNavigationSlick: {
      infinity: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '#hero-slider',
      arrows: false,
      dots: false,
      focusOnSelect: true,
      variableWidth: true,
      rows: 0
    }
  }
}


export { vars }